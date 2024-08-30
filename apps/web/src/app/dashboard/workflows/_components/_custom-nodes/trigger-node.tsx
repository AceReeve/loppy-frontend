import React from "react";
import { Button } from "@repo/ui/components/ui";
import { Add } from "iconsax-react";
import { Handle, Position } from "@xyflow/react";

interface TriggerNodeProps {
  data: {
    title: string;
    onButtonClick?: (isTrigger: boolean) => void; // onButtonClick is optional
  };
}

export default function TriggerNode({
  data: { title, onButtonClick },
}: TriggerNodeProps) {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick(true); // Call the function with the boolean parameter
    }
  };
  return (
    <Button
      variant="outline"
      className=" w-[200px] justify-start  rounded px-4 dark:bg-slate-100"
      onClick={handleClick}
    >
      <div className="flex items-center justify-center gap-2">
        <Add className="h-8 w-8 rounded bg-slate-200 p-2 dark:text-gray-400" />
        <div className="flex flex-col text-left">
          <p className=" font-poppins text-[12px] text-orange-500">Trigger</p>
          <p className=" font-poppins text-[12px] text-slate-600">{title}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </Button>
  );
}
