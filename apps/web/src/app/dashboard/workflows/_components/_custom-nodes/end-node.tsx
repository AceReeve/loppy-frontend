import React from "react";
import { Handle, Position } from "@xyflow/react";

export default function EndNode() {
  return (
    <>
      <div className="rounded-full bg-slate-300 px-4">END</div>
      <Handle type="target" position={Position.Top} />
    </>
  );
}
