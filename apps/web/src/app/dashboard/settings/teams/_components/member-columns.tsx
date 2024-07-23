"use client";
import type { GetTeamMembersResponse } from "@repo/redux-utils/src/endpoints/types/tean-roles.d.tsx";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@repo/ui/components/ui";

export const memberColumns: ColumnDef<GetTeamMembersResponse["data"]>[] = [
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
      const name = `${row.original.first_name} ${row.original.last_name}`;
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
    accessorKey: "role",
    header: "Role",

    cell: ({ row }) => {
      return <div className="font-medium">{row.original.role}</div>;
    },
  },
  {
    id: "actions",
    cell: () => (
      <div className="inline flex h-8 cursor-pointer flex-col items-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </div>
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
