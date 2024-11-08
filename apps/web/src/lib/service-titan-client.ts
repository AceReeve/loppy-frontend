import { serviceTitanAuth } from "@/src/lib/service-titan-auth.ts";

interface RequestOptions extends RequestInit {
  queryParams?: Record<string, string | number | boolean>;
}

export class ServiceTitanClient {
  private static instance: ServiceTitanClient | null;
  private baseUrl = "https://api.servicetitan.io";

  public static getInstance(): ServiceTitanClient {
    if (!ServiceTitanClient.instance) {
      ServiceTitanClient.instance = new ServiceTitanClient();
    }
    return ServiceTitanClient.instance;
  }

  private buildUrl(endpoint: string, options?: RequestOptions): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (options?.queryParams) {
      Object.entries(options.queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }

    return url.toString();
  }

  public async fetch<T>(endpoint: string, options: RequestOptions = {}) {
    // Retrieve authentication headers asynchronously
    const headers = await (await serviceTitanAuth()).getAuthHeaders();

    // Merge provided headers with auth headers
    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        // Append headers safely
        if (typeof value === "string") {
          headers.append(key, value);
        }
      });
    }

    // Create the request URL once to avoid redundant calls
    const url = this.buildUrl(endpoint, options);

    // Fetch data from the API
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Check if the response is ok
    if (!response.ok) {
      const errorData: unknown = await response.json().catch(() => null);
      throw new Error(
        `ServiceTitan API error: ${response.status.toString()} ${response.statusText}${
          errorData ? `\nDetails: ${JSON.stringify(errorData)}` : ""
        }`,
      );
    }

    // Return parsed JSON response
    return response.json() as Promise<T>;
  }
}

export const serviceTitanClient = ServiceTitanClient.getInstance();
