"use client";

import { Checkbox } from "@repo/ui/components/ui";
import type { ColumnDef } from "@tanstack/react-table";

interface TeamMembers {
  _id: string;
  email: string;
  role_name: string;
  status: string;
}

export const memberColumns: ColumnDef<TeamMembers>[] = [
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
    accessorKey: "email",
    header: "Email",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Role
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary" />
          <div className="flex flex-col">
            <div className="font-medium">{row.original.email.toString()}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role_name",
    header: "Role",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="font-medium">
              {row.original.role_name.toString()}
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="my-auto box-content h-[20px] w-[20px]"
          >
            <path
              d="M12 9.6C13.273 9.6 14.4939 9.09429 15.3941 8.19411C16.2943 7.29394 16.8 6.07304 16.8 4.8C16.8 3.52696 16.2943 2.30606 15.3941 1.40589C14.4939 0.505713 13.273 0 12 0C10.727 0 9.50606 0.505713 8.60589 1.40589C7.70571 2.30606 7.2 3.52696 7.2 4.8C7.2 6.07304 7.70571 7.29394 8.60589 8.19411C9.50606 9.09429 10.727 9.6 12 9.6ZM4.2 13.2C4.99565 13.2 5.75871 12.8839 6.32132 12.3213C6.88393 11.7587 7.2 10.9957 7.2 10.2C7.2 9.40435 6.88393 8.64129 6.32132 8.07868C5.75871 7.51607 4.99565 7.2 4.2 7.2C3.40435 7.2 2.64129 7.51607 2.07868 8.07868C1.51607 8.64129 1.2 9.40435 1.2 10.2C1.2 10.9957 1.51607 11.7587 2.07868 12.3213C2.64129 12.8839 3.40435 13.2 4.2 13.2ZM22.8 10.2C22.8 10.9957 22.4839 11.7587 21.9213 12.3213C21.3587 12.8839 20.5956 13.2 19.8 13.2C19.0044 13.2 18.2413 12.8839 17.6787 12.3213C17.1161 11.7587 16.8 10.9957 16.8 10.2C16.8 9.40435 17.1161 8.64129 17.6787 8.07868C18.2413 7.51607 19.0044 7.2 19.8 7.2C20.5956 7.2 21.3587 7.51607 21.9213 8.07868C22.4839 8.64129 22.8 9.40435 22.8 10.2ZM12 10.8C13.5913 10.8 15.1174 11.4321 16.2426 12.5574C17.3679 13.6826 18 15.2087 18 16.8V24H6V16.8C6 15.2087 6.63214 13.6826 7.75736 12.5574C8.88258 11.4321 10.4087 10.8 12 10.8ZM3.6 16.8C3.6 15.9684 3.72 15.1656 3.9456 14.4072L3.7416 14.424C2.71305 14.5369 1.7624 15.0256 1.07192 15.7962C0.381434 16.5669 -0.000268511 17.5653 1.41717e-07 18.6V24H3.6V16.8ZM24 24V18.6C24.0001 17.53 23.5919 16.5004 22.8586 15.7212C22.1254 14.942 21.1224 14.472 20.0544 14.4072C20.2788 15.1656 20.4 15.9684 20.4 16.8V24H24Z"
              fill="#808080"
            />
          </svg>
        </div>
      );
    },
  },
];
