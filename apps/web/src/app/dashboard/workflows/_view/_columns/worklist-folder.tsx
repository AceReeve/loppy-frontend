"use client";
import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui";
import moment from "moment";
import { EllipsisVertical, Folder, SaveIcon, Workflow } from "lucide-react";
import type { GetFolderResponse } from "@repo/redux-utils/src/endpoints/types/workflow.d.ts";
import { CheckIcon } from "@heroicons/react/16/solid";
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
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "name",
    header: "Name ",
    cell: ({ row }) => {
      //  const name = `${row.original.first_name} ${row.original.last_name}`;
      // const email = row.original.email;
      return (
        <div className="flex items-center gap-3">
          {row.original.type === "Workflow" ? <Workflow /> : <Folder />}
          <div className="text-gray-700">{row.original.name}</div>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      //  const name = `${row.original.first_name} ${row.original.last_name}`;
      // const email = row.original.email;
      function StatusIcon() {
        switch (row.original.status) {
          case "Published":
            return {
              icon: <CheckIcon className="h-5 w-5" />,
              color: "bg-green-300",
            };
          case "Saved":
            return {
              icon: <SaveIcon className="h-5 w-5" />,
              color: "bg-gray-200",
            }; // Example color
          default:
            return {
              icon: <SaveIcon />,
              color: "bg-gray-100",
            }; // Example color
        }
      }
      const { icon, color } = StatusIcon();
      return (
        <div className={`${color} flex w-[130px] items-center  rounded-full`}>
          {row.original.type === "Workflow" ? (
            <div className="flex justify-start gap-2 px-3 py-1 text-[12px] font-medium text-gray-700">
              {icon} {row.original.status}
            </div>
          ) : null}
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
          {moment(row.original.created_at).format("ll")}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const handleOnEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
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
            <DeleteActionCell id={row.original._id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
