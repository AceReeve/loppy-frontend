import { type UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";
import { GripVerticalIcon } from "lucide-react";
import { type Lead } from "../page";

interface PipelineLeadType {
  id: UniqueIdentifier;
  lead: Lead | null;
}

export default function PipelineLead({ id, lead }: PipelineLeadType) {
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
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "h-[90px] min-h-[70px] w-full min-w-[280px] cursor-default rounded-2xl bg-white px-3 py-2 shadow-xl drop-shadow-md",
        isDragging && "opacity-50",
      )}
    >
      <div className="flex h-auto justify-between">
        <div className="flex content-center items-center font-roboto font-medium">
          <span className="cursor-move" {...listeners}>
            <GripVerticalIcon size={16} />
          </span>
          {/* {item?.created_by} */}
          Master
        </div>
        <div className="rounded-md bg-blue-500 px-2 py-1 font-roboto text-[10px] font-medium text-white">
          {/* {lead.category} */}
          {lead?.category}
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
          Submitted 2 Days Ago
        </div>
      </div>
      <div />
    </div>
  );
}
