"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { type PhoneNumbersResponse } from "@repo/redux-utils/src/endpoints/types/phone-numbers";

export const numbersColumns: ColumnDef<PhoneNumbersResponse["data"]>[] = [
  {
    accessorKey: "number",
    header: "Phone number",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary" />
          <div className="flex flex-col">
            <div className="font-medium">{row.original.number}</div>
            <div className="font-light">{row.original.location}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "inbox_name",
    header: "Inbox Name",
    cell: ({ getValue }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary" />
          <div className="flex flex-col">
            <div className="font-medium">{getValue() as string}</div>
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
            <div className="font-medium">{row.original.type.toString()}</div>
          </div>
        </div>
      );
    },
  },
];
