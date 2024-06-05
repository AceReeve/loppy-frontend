"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/src/components/ui/checkbox";
import moment from "moment";
import { GetContactsResponse } from "@/src/endpoints/types/contacts";
import { Button } from "@/src/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
/*export interface Contacts {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: string;
}*/

export const columns: ColumnDef<GetContactsResponse["data"][0]>[] = [
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
    header: ({ column }) => {
      function SortHandler() {
        const isSorted = column.getIsSorted();
        const nextSort = isSorted === false ? true : undefined; // Set nextSort to true for ascending order
        column.toggleSorting(nextSort);
      }

      return (
        <Button variant="ghost" onClick={() => SortHandler()}>
          Name
        </Button>
      );
    },
    cell: ({ row, getValue }) => {
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
    accessorKey: "phone_number",
    header: "Phone number",
  },
  {
    accessorKey: "source",
    header: ({ column }) => {
      function SortHandler() {
        const isSorted = column.getIsSorted();
        const nextSort = isSorted === false ? true : undefined;
        column.toggleSorting(nextSort);
      }

      return (
        <Button variant="ghost" onClick={() => SortHandler()}>
          Source
        </Button>
      );
    },
  },
  {
    accessorKey: "lifetime_value",
    header: ({ column }) => {
      function SortHandler() {
        const isSorted = column.getIsSorted();
        const nextSort = isSorted === false ? true : undefined;
        column.toggleSorting(nextSort);
      }

      return (
        <Button variant="ghost" onClick={() => SortHandler()}>
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
  },
  {
    accessorKey: "last_campaign_ran",
    header: ({ column }) => {
      function SortHandler() {
        const isSorted = column.getIsSorted();
        const nextSort = isSorted === false ? true : undefined;
        column.toggleSorting(nextSort);
      }

      return (
        <Button variant="ghost" onClick={() => SortHandler()}>
          Last Campaign Ran
        </Button>
      );
    },
  },
  {
    accessorKey: "last_interaction",
    header: ({ column }) => {
      function SortHandler() {
        const isSorted = column.getIsSorted();
        const nextSort = isSorted === false ? true : undefined;
        column.toggleSorting(nextSort);
      }

      return (
        <Button variant="ghost" onClick={() => SortHandler()}>
          Last Interaction
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.last_interaction;
      return moment(date).format("ll");
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      if (row.original.tags && row.original.tags.length > 0) {
        return row.original.tags.map((tag) => tag.tag_name).join(", "); // Join tag_name values into a single-line string
      } else {
        return "NONE"; // Return "NONE" if the array is empty or undefined
      }
    },
  },
];
