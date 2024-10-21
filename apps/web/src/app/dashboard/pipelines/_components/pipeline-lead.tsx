import { type UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";
import {
  ClockIcon,
  Contact,
  EllipsisVertical,
  GripVerticalIcon,
} from "lucide-react";
import moment from "moment";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui";
import Link from "next/link";
import { type Lead } from "../page";
import DeleteLead from "./delete-lead";
import UpdateLead from "./update-lead";

interface PipelineLeadType {
  id: UniqueIdentifier;
  lead: Lead | null;
  onDeleteLead: (leadId: UniqueIdentifier) => void;
  onUpdateLead: (leadId: UniqueIdentifier, data: Lead) => void;
}

export default function PipelineLead({
  id,
  lead,
  onDeleteLead,
  onUpdateLead,
}: PipelineLeadType) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "item",
    },
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  // Define the background color based on the lead's status
  const backgroundColorClass = clsx({
    "bg-blue-200": lead?.status === "In Progress",
    "bg-green-200": lead?.status === "Good",
    "bg-red-200": lead?.status === "Stalled",
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={isDragging ? "opacity-50" : ""}
    >
      <div
        className={clsx(
          "min-h-[80px] w-full cursor-default overflow-hidden rounded-2xl px-3 py-2 shadow-xl drop-shadow-md",
          backgroundColorClass,
        )}
      >
        <div className="mb-2 flex h-auto flex-wrap items-center justify-between gap-2">
          <div className="flex content-center items-center font-roboto font-medium">
            <span className="cursor-move" {...listeners}>
              <GripVerticalIcon size={16} />
            </span>
            {/* {item?.created_by} */}
            {lead?.owner_id?.email}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="p-0 px-1" variant="ghost" size="sm">
                <EllipsisVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    setIsEditDialogOpen(true);
                  }}
                >
                  Update
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex justify-between">
          <h1 className="content-center font-roboto text-[12px] font-medium text-gray-500 ">
            {/* {lead.description} */}
            {lead?.opportunity_name}
          </h1>
          <div className="rounded-md bg-blue-500 px-2 py-1 font-roboto text-[10px] font-medium text-white">
            {/* {lead.category} */}
            {lead?.opportunity_source}
          </div>
        </div>
        <div className="my-1 border-b-2" />

        <div className="flex h-auto justify-between py-1">
          <div className="flex gap-1">
            <div className="h-5 w-5 rounded-full bg-gray-950" />
            <div className="content-center font-roboto text-[14px] font-medium">
              {/* ${lead.amount} */}${lead?.opportunity_value}
            </div>
          </div>
          <div className="font-robotorounded-md flex items-center gap-1 text-[12px] font-medium text-orange-600">
            {/* Submitted {lead.timeframe} Days Ago */}
            <ClockIcon size={16} /> {moment(lead?.created_at).fromNow()}
          </div>
        </div>

        <div className="flex justify-start">
          <Link href="/dashboard/contacts" title="View Contact">
            <Contact size={16} />
          </Link>
        </div>

        <UpdateLead
          lead={lead}
          onUpdateLead={onUpdateLead}
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
          }}
        />
        <DeleteLead
          lead={lead}
          onDeleteLead={onDeleteLead}
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
          }}
        />
      </div>
    </div>
  );
}
