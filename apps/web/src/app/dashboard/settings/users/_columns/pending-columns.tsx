"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button, Checkbox } from "@repo/ui/components/ui";
import { GetInviteUserResponse } from "@repo/redux-utils/src/endpoints/types/settings-user";

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
    cell: () => {
      /*      const [cancelInvite] = useCancelInviteMutation();

      const handleOnSubmit = async () => {
        try {
          const response = await cancelInvite({
            email: "cocoaic",
          });
        } catch (error) {}
      };*/

      return (
        <div className="inline flex h-8 cursor-pointer flex-col items-end">
          <Button variant={"destructive"}>Cancel Invite</Button>
        </div>
      );
    },

    /*      <Checkbox
                aria-label="Select row"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => {
                  row.toggleSelected(Boolean(value));
                }}
              />*/

    /*    enableSorting: false,
    enableHiding: false,*/
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
