"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { type GetAllInboxesResponse } from "@repo/redux-utils/src/endpoints/types/inboxes";

export const inboxesColumns: ColumnDef<GetAllInboxesResponse>[] = [
  {
    accessorKey: "inbox_name",
    header: "Name",
  },
  {
    accessorKey: "created_by",
    header: "Owner",
  },
  {
    accessorKey: "members",
    header: "Members",
    cell: ({ getValue }) =>
      (getValue() as GetAllInboxesResponse["members"]).length,
  },
  {
    accessorKey: "purchased_number",
    header: "Phone Number",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
];
