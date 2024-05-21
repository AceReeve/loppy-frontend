"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/src/components/ui/checkbox";
import moment from "moment";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Contacts {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: string;
}

export const columns: ColumnDef<Contacts>[] = [
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
    header: "Name",
    cell: ({ row, getValue }) => {
      const name = getValue<string>();
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
    accessorKey: "phone",
    header: "Phone number",
  },
  {
    accessorKey: "website",
    header: "Source",
  },
  {
    accessorKey: "lifetime_value",
    header: "Lifetime Value",
    cell: ({ row }) => {
      const amount = 2323;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "company.name",
    header: "Last Campaign Ran",
  },
  {
    accessorKey: "last_interaction",
    header: "Last Interaction",
    cell: () => {
      const date = new Date();
      return moment(date).format("ll");
    },
  },
];
