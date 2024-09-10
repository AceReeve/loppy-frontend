import type { ReactNode } from "react";
import React from "react";
import { Button } from "@repo/ui/components/ui";
import { Handle, Position } from "@xyflow/react";

export interface BaseNodeProps {
  id: string;
  data: {
    title: string;
    onButtonClick?: (isTrigger: boolean) => void;
  };
  children?: ReactNode;
}

export default function BaseNode({
  data: { onButtonClick },
  children,
}: BaseNodeProps) {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick(true);
    }
  };

  return (
    <Button
      variant="outline"
      className=" h-[60px] w-[200px] justify-start  rounded px-4 dark:bg-slate-100"
      onClick={handleClick}
    >
      {children}
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </Button>
  );
}
