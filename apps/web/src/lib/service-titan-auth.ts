import { ObjectId } from "mongodb";
import { db } from "@/src/lib/db.ts";
import { auth } from "@/auth.ts";
import { type ServiceTitanFormValues } from "@/src/app/dashboard/settings/integrations/schemas/integrations-schemas.ts";

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface AuthConfig {
  clientId: string;
  clientSecret: string;
  tenant: string;
  appKey: string;
}

interface ServiceTitanDocument extends ServiceTitanFormValues, Document {}

class ServiceTitanAuth {
  private static instance: ServiceTitanAuth | null;
  private token: string | null = null;
  private tokenExpiry: Date | null = null;
  private readonly config: AuthConfig;

  private constructor(config: AuthConfig) {
    const { clientId, clientSecret, tenant, appKey } = config;
    if (!clientId || !clientSecret || !tenant || !appKey) {
      throw new Error("Missing required ServiceTitan configuration");
    }

    this.config = config;
  }

  public static async getInstance(): Promise<ServiceTitanAuth> {
    if (!ServiceTitanAuth.instance) {
      const session = await auth();

      const serviceTitanData = await db.findOne<ServiceTitanDocument>(
        "servicetitan-credentials",
        {
          user_id: new ObjectId(session?.user.id),
        },
      );

      if (!serviceTitanData) {
        throw new Error("ServiceTitan credentials not set up.");
      }

      ServiceTitanAuth.instance = new ServiceTitanAuth({
        clientId: serviceTitanData.clientId,
        clientSecret: serviceTitanData.clientSecret,
        tenant: serviceTitanData.tenantId,
        appKey: serviceTitanData.appKey,
      });
    }
    return ServiceTitanAuth.instance;
  }

  private async refreshToken(): Promise<void> {
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      // scope: "accounting.full crm.full",
    });

    const response = await fetch("https://auth.servicetitan.io/connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.statusText}`);
    }

    const data = (await response.json()) as TokenResponse;

    this.token = data.access_token;
    this.tokenExpiry = new Date(Date.now() + (data.expires_in - 300) * 1000);
  }

  public async getAuthHeaders(): Promise<Headers> {
    if (!this.token || !this.tokenExpiry || new Date() >= this.tokenExpiry) {
      await this.refreshToken();
    }

    return new Headers({
      Authorization: `Bearer ${this.token ?? ""}`,
      "ST-App-Key": this.config.appKey,
    });
  }

  public getTenant(): string {
    return this.config.tenant;
  }
}

export const serviceTitanAuth = async () =>
  await ServiceTitanAuth.getInstance();
