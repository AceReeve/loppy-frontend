import { type UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@repo/ui/utils";
import { type Lead } from "../page";

interface PipelineStatusType {
  id: UniqueIdentifier;
  lead?: Lead | null;
  status: string;
  //onDrop: (leadId: UniqueIdentifier, newStatus: string) => void; // Function to handle drop
}

export default function PipelineStatus({
  id,
  //lead,
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

  const backgroundColorClass = cn({
    "border-2": true, // Add a common class for the border width
    "border-blue-500 bg-blue-200": status === "Abandoned",
    "border-green-500 bg-green-200": status === "Won",
    "border-red-500 bg-red-200": status === "Lost",
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
      className={`relative flex h-full w-full content-center items-center justify-center rounded-md border-2 border-dashed ${backgroundColorClass}  font-semibold ${isDragging ? "opacity-50" : ""}`}
    >
      {status}
      {isOver ? (
        <div className="absolute inset-0 border-2 border-dotted border-black" />
      ) : null}
    </div>
  );
}
