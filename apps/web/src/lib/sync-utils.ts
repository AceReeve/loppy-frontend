import { startOfYear } from "date-fns";
import { type SyncStatus } from "@repo/redux-utils/src/endpoints/types/service-titan";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { db } from "@/src/lib/db.ts";
import { serviceTitanClient } from "@/src/lib/service-titan-client.ts";
import { auth } from "@/auth.ts";
import { syncMergeContacts } from "@/src/lib/sync-merged-contacts-utils.ts";

export interface SyncConfig {
  entityType:
    | "invoices"
    | "payments"
    | "leads"
    | "bookings"
    | "contacts"
    | "memberships"
    | "customers"
    | "jobs"
    | "job-types"
    | "campaigns"
    | "campaign-costs";
  endpoint: string;
  collection: string;
}

interface SyncOptions {
  tenantId: string;
  includeRecentChanges?: boolean;
}

export const SYNC_CONFIGS: Record<string, SyncConfig | null> = {
  invoices: {
    entityType: "invoices",
    endpoint: "/accounting/v2/tenant/{tenant}/export/invoices",
    collection: "synced-invoices",
  },
  payments: {
    entityType: "payments",
    endpoint: "/accounting/v2/tenant/{tenant}/export/payments",
    collection: "synced-payments",
  },
  leads: {
    entityType: "leads",
    endpoint: "/crm/v2/tenant/{tenant}/export/leads",
    collection: "synced-leads",
  },
  bookings: {
    entityType: "bookings",
    endpoint: "/crm/v2/tenant/{tenant}/export/bookings",
    collection: "synced-bookings",
  },
  contacts: {
    entityType: "contacts",
    endpoint: "/crm/v2/tenant/{tenant}/export/customers/contacts",
    collection: "synced-contacts",
  },
  customers: {
    entityType: "customers",
    endpoint: "/crm/v2/tenant/{tenant}/export/customers",
    collection: "synced-customers",
  },
  memberships: {
    entityType: "memberships",
    endpoint: "/memberships/v2/tenant/{tenant}/export/memberships",
    collection: "synced-memberships",
  },
  jobs: {
    entityType: "jobs",
    endpoint: "/jpm/v2/tenant/{tenant}/export/jobs",
    collection: "synced-jobs",
  },
  "job-types": {
    entityType: "job-types",
    endpoint: "/jpm/v2/tenant/{tenant}/job-types",
    collection: "synced-job-types",
  },
  campaigns: {
    entityType: "campaigns",
    endpoint: "/marketing/v2/tenant/{tenant}/campaigns",
    collection: "synced-campaigns",
  },
  "campaign-costs": {
    entityType: "campaign-costs",
    endpoint: "/marketing/v2/tenant/{tenant}/costs",
    collection: "synced-campaign-costs",
  },
};

export async function handleSync(
  entityConfig: SyncConfig,
  options: SyncOptions,
) {
  const { tenantId, includeRecentChanges = false } = options;

  const session = await auth();
  if (!session) return;

  // Get last sync status
  const lastSync = await db.findOne<SyncStatus & Document>("sync-status", {
    entityType: entityConfig.entityType,
    tenant_id: tenantId,
    user_id: new ObjectId(session.user.id),
  });

  const fromDate = lastSync?.lastSyncedAt;
  let continuationToken = lastSync?.lastContinuationToken;
  let totalRecords = 0;
  let res;

  try {
    do {
      // Build endpoint URL
      const params = new URLSearchParams({
        from:
          continuationToken ??
          (fromDate
            ? fromDate.toISOString()
            : startOfYear(new Date()).toISOString()),
        includeRecentChanges: includeRecentChanges ? "true" : "",
      }).toString();
      const endpoint = `${entityConfig.endpoint.replace("{tenant}", tenantId)}?${params}`;

      // Fetch data from ServiceTitan
      res = await serviceTitanClient.fetch<{
        hasMore: boolean;
        continueFrom: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- allow any
        data: any[];
      }>(endpoint);

      if (res.data.length > 0) {
        // Bulk upsert records
        await db.bulkWrite(
          entityConfig.collection,
          res.data.map((record) => ({
            updateOne: {
              filter: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- allow
                id: record.id,
                tenant_id: tenantId,
              },
              update: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- allow
                $set: {
                  ...record,
                  tenant_id: tenantId,
                  last_synced: new Date(),
                  user_id: new ObjectId(session.user.id),
                },
              },
              upsert: true,
            },
          })),
        );
      }

      totalRecords += res.data.length;
      continuationToken = res.continueFrom;

      // Update sync status with final continuation token
      await db.updateOne<SyncStatus & Document>(
        "sync-status",
        {
          entityType: entityConfig.entityType,
          tenant_id: tenantId,
          user_id: new ObjectId(session.user.id),
        },
        {
          $set: {
            lastSyncedAt: new Date(),
            lastContinuationToken: continuationToken,
            success: true,
            record_count: totalRecords,
            tenant_id: tenantId,
            user_id: new ObjectId(session.user.id),
          },
        },
        { upsert: true },
      );
    } while (res.hasMore);

    // refresh contacts materialized view
    if (entityConfig.entityType === "contacts") {
      await syncMergeContacts(session.user.id ?? "");
    }

    return {
      success: true,
      count: totalRecords,
      message: `Successfully synced ${totalRecords.toString()} ${entityConfig.entityType}`,
    };
  } catch (error) {
    // Update sync status to failed
    await db.updateOne<SyncStatus & Document>(
      "sync-status",
      {
        entityType: entityConfig.entityType,
        tenant_id: tenantId,
        user_id: new ObjectId(session.user.id),
      },
      {
        $set: {
          lastSyncedAt: new Date(),
          lastContinuationToken: continuationToken,
          success: false,
          record_count: 0,
          tenant_id: tenantId,
          user_id: new ObjectId(session.user.id),
        },
      },
      { upsert: true },
    );
    return NextResponse.json(
      { success: false, error: error instanceof Error && error.message },
      { status: 500 },
    );
  }
}

export async function handleQuery<T extends Document>(
  collection: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- allow any
  query: Record<string, any>,
  options: {
    page?: number;
    limit?: number;
    sortField?: string;
    sortOrder?: 1 | -1;
  } = {},
) {
  const {
    page = 1,
    limit = 50,
    sortField = "createdOn",
    sortOrder = -1,
  } = options;

  const total = await db.countDocuments(collection, query);

  const data = await db.find<T>(collection, query, {
    sort: { [sortField]: sortOrder },
    skip: (page - 1) * limit,
    limit,
  });

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}
