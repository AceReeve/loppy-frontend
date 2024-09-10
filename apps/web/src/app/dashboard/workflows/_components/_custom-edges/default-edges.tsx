import React from "react";
import type { EdgeProps } from "@xyflow/react";
import { getSmoothStepPath } from "@xyflow/react";

export default function DefaultEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <path
      id={id}
      d={edgePath}
      markerEnd={markerEnd}
      className="react-flow__edge-path pointer-events-none"
    />
  );
}
