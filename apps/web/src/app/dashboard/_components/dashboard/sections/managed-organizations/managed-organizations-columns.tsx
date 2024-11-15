"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Circle, Plus } from "lucide-react";
import { type organizationsMockData } from "@/src/app/dashboard/_components/dashboard/sections/managed-organizations/managed-organizations-mock-data.ts";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const managedOrganizationsColumns: ColumnDef<
  (typeof organizationsMockData)[0]
>[] = [
  {
    accessorKey: "name",
    header: "Organization",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img
          src={row.original.logo}
          alt={`${row.original.name} logo`}
          width={40}
          height={40}
          className="rounded-md"
        />
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-muted-foreground text-sm">
            Client Since {row.original.clientSince}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "leads",
    header: "Leads",
  },
  {
    accessorKey: "cpl",
    header: "CPL",
    cell: ({ row }) => formatCurrency(row.original.cpl),
  },
  {
    accessorKey: "api",
    header: "API",
    cell: ({ row }) => (
      <Circle
        className={`h-4 w-4 ${row.original.api ? "fill-green-500 text-green-500" : "fill-red-500 text-red-500"}`}
      />
    ),
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => formatCurrency(row.original.revenue),
  },
  {
    accessorKey: "adspend",
    header: "Adspend",
    cell: ({ row }) => formatCurrency(row.original.adspend),
  },
  {
    accessorKey: "agencyPoints",
    header: "Agency Points",
  },
  {
    accessorKey: "trophies",
    header: "Trophies",
    cell: ({ row }) => (
      <div className="flex gap-1">
        {Array.from({ length: row.original.trophies }).map((_, i) => (
          <img
            // eslint-disable-next-line react/no-array-index-key -- temporary
            key={i}
            src="/assets/icons/dashboard-stats-icons/icon-trophy.png"
            width={20}
            height={20}
            alt=""
          />
        ))}
      </div>
    ),
  },
  {
    accessorKey: "health",
    header: "Health",
    cell: ({ row }) => (
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border">
        <Plus
          className={`h-4 w-4 ${row.original.health ? "text-green-500" : "text-red-500"}`}
        />
      </div>
    ),
  },
  {
    accessorKey: "goal",
    header: "Goal",
    cell: ({ row }) => (
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs font-medium">{row.original.goal}%</div>
        </div>
        <svg className="h-10 w-10 -rotate-90">
          <circle
            cx="20"
            cy="20"
            r="16"
            strokeWidth="4"
            stroke="currentColor"
            fill="none"
            className="text-muted stroke-current opacity-20"
          />
          <circle
            cx="20"
            cy="20"
            r="16"
            strokeWidth="4"
            stroke="currentColor"
            fill="none"
            className="stroke-current text-blue-500"
            strokeDasharray={100}
            strokeDashoffset={100 - row.original.goal}
          />
        </svg>
      </div>
    ),
  },
];
