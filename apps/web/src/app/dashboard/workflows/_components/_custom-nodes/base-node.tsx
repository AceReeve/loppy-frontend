import React, { ReactNode } from "react";
import { Button } from "@repo/ui/components/ui";
import { Handle, Position } from "@xyflow/react";
import { Add } from "iconsax-react";

export interface BaseNodeProps {
  data: {
    title: string;
    onButtonClick?: (isTrigger: boolean) => void;
  };
  children?: ReactNode;
}

export default function BaseNode({
  data: { title, onButtonClick },
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
