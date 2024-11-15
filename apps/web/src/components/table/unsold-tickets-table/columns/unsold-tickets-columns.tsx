"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { type GetContactsResponse } from "@repo/redux-utils/src/endpoints/types/contacts";
import {
  ChatBubbleLeftIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export const unsoldTicketsColumns: ColumnDef<GetContactsResponse["data"][0]>[] =
  [
    {
      accessorKey: "name",
      header: "Name of Customer",
      cell: ({ row }) => {
        const name = row.original.name;
        const email = row.original.email;
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary" />
            <div className="flex flex-col">
              <div className="font-medium">{name}</div>
              <div className="text-gray-700">{email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "source",
      header: "Technician",
      cell: "Benjamin F.",
    },
    {
      accessorKey: "lifetime_value",
      header: "Quoted",
      cell: ({ row }) => {
        // @ts-expect-error -- ignore for now since this are just placeholder values
        const amount = row.original.lifetime_value as number;
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      id: "action",
      header: "Action",
      cell: () => {
        return (
          <div className="flex gap-4">
            <PhoneIcon className="size-4" />
            <ChatBubbleLeftIcon className="size-4" />
            <UserIcon className="size-4" />
          </div>
        );
      },
    },
  ];
