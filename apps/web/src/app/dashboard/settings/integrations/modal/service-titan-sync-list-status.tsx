"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui";
import { RefreshCcw, Check, X } from "lucide-react";
import { format } from "date-fns";
import {
  useGetServiceTitanSyncStatusQuery,
  useSyncServiceTitanMutation,
} from "@repo/redux-utils/src/endpoints/service-titan.ts";

const syncItems: string[] = [
  "invoices",
  "leads",
  "bookings",
  "payments",
  "contacts",
  "customers",
  "memberships",
  "jobs",
  "job-types",
  "campaigns",
  "campaign-costs",
];

type SyncProgressType = Record<
  string,
  {
    isSyncing: boolean;
    syncedItems: number;
    success: boolean;
  }
>;

export default function ServiceTitanSyncListStatus() {
  const initialSyncProgress: SyncProgressType = syncItems.reduce(
    (acc, current) => ({
      ...acc,
      [current]: {
        isSyncing: false,
        syncedItems: 0,
        success: false,
      },
    }),
    {},
  );

  const [syncProgress, setSyncProgress] = useState(initialSyncProgress);

  const { data: syncStatus } = useGetServiceTitanSyncStatusQuery(undefined);

  const [sync] = useSyncServiceTitanMutation();
  const [isSyncing, setIsSyncing] = useState(false);

  const startSync = async () => {
    setSyncProgress(initialSyncProgress);
    setIsSyncing(true);

    const promise = syncItems.map((item) => {
      setSyncProgress((prev) => ({
        ...prev,
        [item]: {
          isSyncing: true,
          syncedItems: 0,
          success: false,
        },
      }));
      const syncPromise = sync({
        entity: item,
      }).unwrap();

      void syncPromise
        .then((res) => {
          setSyncProgress((prev) => ({
            ...prev,
            [item]: {
              isSyncing: false,
              syncedItems: res.count,
              success: res.success,
            },
          }));
        })
        .catch(() => {
          setSyncProgress((prev) => ({
            ...prev,
            [item]: {
              isSyncing: false,
              syncedItems: 0,
              success: false,
            },
          }));
        });

      return syncPromise;
    });
    await Promise.all(promise).finally(() => {
      setIsSyncing(false);
    });
  };

  const getSyncStatus = (item: string) => {
    const itemData = syncStatus?.data[item];

    if (!itemData) {
      return <span>No data yet</span>;
    }

    if (itemData.success) {
      return (
        <>
          <Check className="mr-1 inline-block h-4 w-4 text-green-500" />
          Synced {itemData.record_count} items on{" "}
          {format(new Date(itemData.lastSyncedAt), "PPp")}
        </>
      );
    }

    return (
      <>
        <X className="mr-1 inline-block h-4 w-4 text-red-500" />
        Sync failed
      </>
    );
  };

  const getSyncProgress = (item: string) => {
    const itemData = syncProgress[item];

    if (itemData.success) {
      return <>{itemData.syncedItems || "No"} items added</>;
    }

    if (itemData.isSyncing) {
      return <>syncing...</>;
    }

    return <>(failed)</>;
  };
  return (
    <Card className="w-full bg-primary/20">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>Sync ServiceTitan</div>
          <Button onClick={startSync} disabled={isSyncing} variant="outline">
            {isSyncing ? (
              <>
                <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Sync
              </>
            )}
          </Button>
        </CardTitle>
        <CardDescription>
          Press <b>sync</b> button to import data from ServiceTitan
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSyncing ? (
          <ul className="space-y-2">
            {syncItems.map((item) => (
              <li key={item} className="flex items-center text-sm capitalize">
                {/* eslint-disable-next-line no-nested-ternary -- allow for this one */}
                {syncProgress[item].isSyncing ? (
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                ) : syncProgress[item].success ? (
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                ) : (
                  <X className="mr-2 h-4 w-4 text-red-500" />
                )}
                {item}
                <div className="ml-2 text-xs normal-case text-gray-500">
                  {getSyncProgress(item)}
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        {syncStatus?.data && !isSyncing ? (
          <ul className="space-y-2">
            {syncItems.map((item) => (
              <li
                key={item}
                className="flex flex-wrap items-center justify-between text-sm"
              >
                <span className="capitalize">{item}</span>
                <span className="text-xs text-gray-500">
                  {getSyncStatus(item)}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
}
