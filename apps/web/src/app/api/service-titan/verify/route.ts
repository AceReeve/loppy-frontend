import { NextResponse } from "next/server";
import {
  type ServiceTitanFormValues,
  serviceTitanSchema,
} from "@/src/app/dashboard/settings/integrations/schemas/integrations-schemas.ts";
import { type TokenResponse } from "@/src/lib/service-titan-auth.ts";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ServiceTitanFormValues;
    const validatedData = serviceTitanSchema.parse(body);

    const token = await getToken(validatedData);

    const params = new URLSearchParams({
      from: new Date().toISOString(), // just date today since this route is for verification only if creds work
    }).toString();
    const res = await fetch(
      `https://api.servicetitan.io/crm/v2/tenant/${validatedData.tenantId}/export/bookings?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "ST-App-Key": validatedData.appKey,
        },
      },
    );

    if (res.ok) {
      return NextResponse.json(
        { message: "Credentials verified successfully" },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error && error.message },
      { status: 500 },
    );
  }
}

async function getToken(props: ServiceTitanFormValues) {
  const response = await fetch("https://auth.servicetitan.io/connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: props.clientId,
      client_secret: props.clientSecret,
    }).toString(),
  });

  if (!response.ok) {
    throw new Error(`Invalid credentials`);
  }

  return (await response.json()) as TokenResponse;
}
