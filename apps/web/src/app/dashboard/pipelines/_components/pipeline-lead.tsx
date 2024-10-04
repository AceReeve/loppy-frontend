import { type UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";
import { EllipsisVertical, GripVerticalIcon } from "lucide-react";
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
          "h-[90px] min-h-[70px] w-full min-w-[280px] cursor-default rounded-2xl px-3 py-2 shadow-xl drop-shadow-md",
          backgroundColorClass,
        )}
      >
        <div className="flex h-auto justify-between">
          <div className="flex content-center items-center font-roboto font-medium">
            <span className="cursor-move" {...listeners}>
              <GripVerticalIcon size={16} />
            </span>
            {/* {item?.created_by} */}
            {lead?.master}
          </div>
          <div className="flex">
            <div className="rounded-md bg-blue-500 px-2 py-1 font-roboto text-[10px] font-medium text-white">
              {/* {lead.category} */}
              {lead?.category}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="p-0 px-2" variant="ghost" size="sm">
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
        </div>
        <h1 className="content-center font-roboto text-[12px] font-medium text-gray-500 ">
          {/* {lead.description} */}
          {lead?.description}
        </h1>
        <div className="my-1 border-b-2" />

        <div className="flex h-auto justify-between py-1">
          <div className="flex gap-1">
            <div className="h-5 w-5 rounded-full bg-gray-950" />
            <div className="content-center font-roboto text-[14px] font-medium">
              {/* ${lead.amount} */}${lead?.amount}
            </div>
          </div>
          <div className="font-robotorounded-md text-[12px] font-medium text-orange-600">
            {/* Submitted {lead.timeframe} Days Ago */}
            Submitted {moment(lead?.created_at).fromNow()}
          </div>
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
