import { type UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";
import { ClockIcon, EllipsisVertical, GripVerticalIcon } from "lucide-react";
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
import { leadIcons } from "@/src/app/dashboard/pipelines/_components/lead-icons.tsx";
import { type Lead } from "../page.tsx";
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
    //  isDragging,
  } = useSortable({
    id,
    data: {
      type: "item",
    },
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  let backgroundColorClass;

  switch (lead?.status) {
    case "Abandoned":
      backgroundColorClass = "border-blue-400";
      break;
    case "Won":
      backgroundColorClass = "border-green-400";
      break;
    case "Lost":
      backgroundColorClass = "border-red-400";
      break;
    case "Open":
      backgroundColorClass = "border-gray-400";
      break;
    default:
      backgroundColorClass = ""; // Default case if needed
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <div
        className={clsx(
          `min-h-[80px] w-full overflow-hidden rounded-md border bg-white px-3 py-2 shadow-md drop-shadow-md`,
        )}

        //          backgroundColorClass,
      >
        <div className="mb-2 flex h-auto flex-wrap items-center justify-between gap-2">
          <div className="flex content-center items-center font-roboto font-medium">
            <span className="cursor-move">
              <GripVerticalIcon size={16} {...listeners} />
            </span>
            {/* {item?.created_by} */}
            {/*  {lead?.owner_id?.email}*/}
            {lead?.owner_id?.name}
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
          <div className="max-w-[200px] content-center space-y-1 whitespace-nowrap text-sm font-light text-gray-500">
            <h1 className="overflow-hidden overflow-ellipsis font-roboto font-light">
              {/* {lead.description} */}
              <span className="text-gray-600 ">Contact: </span>
              {lead?.primary_contact_name}
            </h1>
            <h1 className="overflow-hidden overflow-ellipsis font-roboto font-medium">
              {/* {lead.description} */}
              <span className="text-gray-600 ">Company: </span>
              {lead?.business_name}
            </h1>
            <h1 className="overflow-hidden overflow-ellipsis font-roboto font-medium">
              {/* {lead.description} */}
              <span className="text-gray-600 ">Value: </span>$
              {lead?.opportunity_value}
            </h1>
          </div>

          <div className="h-6 rounded-md bg-blue-500 px-2 py-1 font-roboto text-[10px] font-medium text-white">
            {/* {lead.category} */}
            {lead?.opportunity_source}
          </div>
        </div>
        <div className={`${backgroundColorClass} my-1 border-b-2`} />
        <div className="flex h-auto justify-between py-1">
          <div className="flex gap-1">
            {/* <div className="h-5 w-5 rounded-full bg-gray-950" />*/}
            {lead?.tags?.map((tag) => <div key={tag}>{leadIcons[tag]}</div>)}
          </div>
          <div className="font-robotorounded-md flex items-center gap-1 text-[12px] font-medium text-orange-600">
            {/* Submitted {lead.timeframe} Days Ago */}
            <ClockIcon size={16} /> {moment(lead?.created_at).fromNow()}
          </div>
        </div>

        {/*        <div className="flex justify-start">
          <Link href="/dashboard/contacts" title="View Contact">
            <Contact size={16} />
          </Link>
        </div>*/}

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
