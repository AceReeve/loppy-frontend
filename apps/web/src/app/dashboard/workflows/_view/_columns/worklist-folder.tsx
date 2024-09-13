"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui";
import moment from "moment";
import { EllipsisVertical, Folder } from "lucide-react";
import type { GetFolderResponse } from "@repo/redux-utils/src/endpoints/types/workflow.d.ts";
import DeleteActionCell from "@/src/app/dashboard/workflows/_view/_columns/action-cells/delete-action.tsx";

type OnEditFunction = (id: string) => void;
export const workFolders = (
  onEdit: OnEditFunction,
): ColumnDef<GetFolderResponse[][number]>[] => [
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
          <div className="text-gray-700">{row.original.folder_name}</div>
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
      return (
        <div className="text-gray-700">
          {moment(row.original.updated_at).format("ll")}
        </div>
      );
    },
  },

  {
    accessorKey: "createdOn",
    header: "Created On",
    cell: ({ row }) => {
      //  const name = `${row.original.first_name} ${row.original.last_name}`;
      // const email = row.original.email;
      return (
        <div className="text-gray-700">
          {moment(row.original.updated_at).format("ll")}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const handleOnEdit = () => {
        onEdit(row.original._id);
      };
      return (
        <DropdownMenu>
          <div className="inline flex w-full justify-end">
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer" onClick={handleOnEdit}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <DeleteActionCell id={row.original._id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
