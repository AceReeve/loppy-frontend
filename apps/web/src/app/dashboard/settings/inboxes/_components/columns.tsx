"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { type InboxesResponse } from "@repo/redux-utils/src/endpoints/types/inboxes";

export const inboxesColumns: ColumnDef<InboxesResponse["data"]>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "members",
    header: "Members",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
];
