import { NextResponse } from "next/server";
import { type SyncStatus } from "@repo/redux-utils/src/endpoints/types/service-titan";
import { ObjectId } from "mongodb";
import { db } from "@/src/lib/db.ts";
import { serviceTitanAuth } from "@/src/lib/service-titan-auth.ts";
import { auth } from "@/auth.ts";

export async function GET() {
  try {
    const tenantId = (await serviceTitanAuth()).getTenant();
    const session = await auth();

    if (!session) return;

    const syncStatus = await db.find<SyncStatus & Document>("sync-status", {
      tenant_id: tenantId,
      user_id: new ObjectId(session.user.id),
    });

    const statusByEntity = syncStatus.reduce<
      Record<string, Partial<SyncStatus>>
    >((acc, status) => {
      acc[status.entityType] = {
        lastSyncedAt: status.lastSyncedAt,
        success: status.success,
        record_count: status.record_count,
        user_id: status.user_id,
      };
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      data: statusByEntity,
      lastSync: syncStatus[syncStatus.length - 1]?.lastSyncedAt,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error && error.message },
      { status: 500 },
    );
  }
}
