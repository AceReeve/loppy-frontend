import { NextResponse } from "next/server";
import { handleSync, handleQuery, SYNC_CONFIGS } from "@/src/lib/sync-utils";
import { serviceTitanAuth } from "@/src/lib/service-titan-auth.ts";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ entity: string }> },
) {
  const { entity } = await params;
  const { searchParams } = new URL(request.url);

  try {
    const entityConfig = SYNC_CONFIGS[entity];
    if (!entityConfig) {
      return NextResponse.json(
        { success: false, error: "Invalid entity type" },
        { status: 400 },
      );
    }

    const { tenantId, startDate, endDate, page, limit, ...filters } =
      Object.fromEntries(searchParams);

    const result = await handleQuery(
      entityConfig.collection,
      {
        tenantId: tenantId || (await serviceTitanAuth()).getTenant(),
        createdOn: {
          ...(startDate && { $gte: new Date(startDate) }),
          ...(endDate && { $lte: new Date(endDate) }),
        },
        ...filters,
      },
      {
        page: Number(page),
        limit: Number(limit),
      },
    );

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error && error.message },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ entity: string }> },
) {
  const { entity } = await params;
  try {
    const { searchParams } = new URL(request.url);
    const tenantId = (await serviceTitanAuth()).getTenant();
    const includeRecentChanges =
      searchParams.get("includeRecentChanges") === "true";

    const entityConfig = SYNC_CONFIGS[entity];
    if (!entityConfig) {
      return NextResponse.json(
        { success: false, error: "Invalid entity type" },
        { status: 400 },
      );
    }

    const result = await handleSync(entityConfig, {
      tenantId,
      includeRecentChanges,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error && error.message },
      { status: 500 },
    );
  }
}
