"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { type GetPurchasedNumbersResponse } from "@repo/redux-utils/src/endpoints/types/phone-numbers";

export const numbersColumns: ColumnDef<GetPurchasedNumbersResponse>[] = [
  {
    accessorKey: "purchased_number",
    header: "Phone number",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary" />
          <div className="flex flex-col">
            <div className="font-medium">{row.original.purchased_number}</div>
            {/*<div className="font-light">{row.original.location}</div>*/}
            <div className="font-light">LOCATION</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "inbox_name",
    header: "Inbox Name",
    cell: () => {
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary" />
          <div className="flex flex-col">
            {/*<div className="font-medium">{getValue() as string}</div>*/}
            <div className="font-medium">Inbox Name</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="font-medium">{row.original.status}</div>
          </div>
        </div>
      );
    },
  },
];
