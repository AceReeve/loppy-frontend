"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui";
import type { GetInviteUserResponse } from "@repo/redux-utils/src/endpoints/types/settings-user";
import { EllipsisVertical } from "lucide-react";

export const memberColumns: ColumnDef<
  GetInviteUserResponse["users"][number]
>[] = [
  /* {
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
    accessorKey: "name",
    header: "Name ",
    cell: ({ row }) => {
      //  const name = `${row.original.first_name} ${row.original.last_name}`;
      // const email = row.original.email;
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary" />
          <div className="flex flex-col">
            {/*<div className="font-medium">{name}</div>*/}
            <div className="text-gray-700">{row.original.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",

    cell: ({ row }) => {
      return <div className="font-medium">{row.original.role.role_name}</div>;
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <div className="inline flex w-full justify-end">
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>
        </div>

        <DropdownMenuContent>
          <DropdownMenuItem>
            <p className="cursor-pointer">Remove Member </p>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <p className="cursor-pointer">Manage Roles and Permissions</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      /*      <Checkbox
                aria-label="Select row"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => {
                  row.toggleSelected(Boolean(value));
                }}
              />*/
    ),
    enableSorting: false,
    enableHiding: false,
  },
  /*  {
      accessorKey: "phone_number",
      header: "Phone number",
    },*/ /*
  {
    accessorKey: "lifetime_value",
    header: ({ column }) => {
      function SortHandler() {
        const isSorted = column.getIsSorted();
        const nextSort = isSorted === false ? true : undefined;
        column.toggleSorting(nextSort);
      }

      return (
        <Button
          variant="ghost"
          onClick={() => {
            SortHandler();
          }}
        >
          Lifetime Value
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.original.lifetime_value;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },*/
];
