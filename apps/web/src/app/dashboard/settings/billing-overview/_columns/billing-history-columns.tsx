"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui";
import { EllipsisVertical } from "lucide-react";
import type { GetBillingHistoryResponse } from "@repo/redux-utils/src/endpoints/types/billing-history";

export const billingHistoryColumns: ColumnDef<GetBillingHistoryResponse>[] = [
  /*  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(Boolean(value));
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(Boolean(value));
        }}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },*/
  {
    accessorKey: "invoice",
    header: "Invoice",
    cell: ({ row }) => {
      //  const name = `${row.original.first_name} ${row.original.last_name}`;
      // const email = row.original.email;
      return (
        <div className="flex items-center gap-3">
          {/* <div className="h-10 w-10 rounded-full bg-primary" />*/}
          <div className="flex flex-col">
            {/*<div className="font-medium">{name}</div>*/}
            <div className="text-gray-700">#{row.original.invoice}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "datePaid",
    header: "Date Paid",

    cell: ({ row }) => {
      return <div className="font-normal">{row.original.datePaid}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",

    cell: ({ row }) => {
      return <div className="font-normal">${row.original.amount}</div>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => {
      return (
        <div
          className={`w-[150px] rounded px-4 py-1 font-medium ${row.original.status === "Completed" ? "bg-green-500" : "bg-red-500"} text-center text-white`}
        >
          {row.original.status}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <div className="inline flex w-full justify-end">
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            <DropdownMenuItem>Download PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
