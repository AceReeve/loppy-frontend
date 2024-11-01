import { type UniqueIdentifier, useDroppable } from "@dnd-kit/core";
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
interface PipelineStatusType {
  id: UniqueIdentifier;
  lead?: Lead | null;
  status: string;
  //onDrop: (leadId: UniqueIdentifier, newStatus: string) => void; // Function to handle drop
}

export default function PipelineStatus({
  id,
  lead,
  status,
  //onDrop,
}: PipelineStatusType) {
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
      type: "status-area",
    },
  });

  const { isOver, setNodeRef: setDroppableNodeRef } = useDroppable({
    id,
  });

  const backgroundColorClass = clsx({
    blue: status === "In Progress",
    green: status === "Good",
    red: status === "Stalled",
  });

  const handleDrop = (event: React.DragEvent) => {
    const leadId = event.dataTransfer.getData("text/plain");
    if (leadId) {
      // onDrop(leadId, status); // Call the onDrop function with the lead ID and new status
    }
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        setDroppableNodeRef(node);
      }}
      {...attributes}
      {...listeners}
      onDrop={handleDrop}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={`relative flex h-full w-full content-center items-center justify-center rounded-md border-2 border-dashed border-${backgroundColorClass}-500 bg-${backgroundColorClass}-200 font-semibold ${isDragging ? "opacity-50" : ""}`}
    >
      {status}
      {isOver && (
        <div className="absolute inset-0 border-2 border-dotted border-black" />
      )}{" "}
    </div>
  );
}
