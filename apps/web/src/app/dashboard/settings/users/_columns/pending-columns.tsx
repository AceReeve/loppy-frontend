"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@repo/ui/components/ui";
import type { GetInviteUserResponse } from "@repo/redux-utils/src/endpoints/types/settings-user";
import ActionCell from "@/src/app/dashboard/settings/users/_components/delete-action-cell.tsx";

export const pendingColumns: ColumnDef<
  GetInviteUserResponse["users"][number]
>[] = [
  {
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
  },
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
    cell: ({ row }) => <ActionCell email={row.original.email.toString()} />,
  },
];
