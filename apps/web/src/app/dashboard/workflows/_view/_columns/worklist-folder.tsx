"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui";
import { EllipsisVertical, Folder } from "lucide-react";
import type { GetWorkFolders } from "@repo/redux-utils/src/endpoints/types/workflow.d.tsx";

export const workFolders: ColumnDef<GetWorkFolders>[] = [
  /*    {
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
          <Folder />
          <div className="text-gray-700">{row.original.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
    cell: ({ row }) => {
      //  const name = `${row.original.first_name} ${row.original.last_name}`;
      // const email = row.original.email;
      return <div className="text-gray-700">{row.original.lastUpdated}</div>;
    },
  },

  {
    accessorKey: "createdOn",
    header: "Created On",
    cell: ({ row }) => {
      //  const name = `${row.original.first_name} ${row.original.last_name}`;
      // const email = row.original.email;
      return <div className="text-gray-700">{row.original.createdOn}</div>;
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
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
