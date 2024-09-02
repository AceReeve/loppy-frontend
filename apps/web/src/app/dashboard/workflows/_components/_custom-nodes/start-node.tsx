import React from "react";
import { Button } from "@repo/ui/components/ui";
import { Add } from "iconsax-react";
import { Handle, Position } from "@xyflow/react";

interface StartNodeProps {
  data: {
    title: string;
    onButtonClick?: (isTrigger: boolean) => void; // onButtonClick is optional
  };
}

export default function StartNode({
  data: { title, onButtonClick },
}: StartNodeProps) {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick(true); // Call the function with the boolean parameter
    }
  };
  return (
    <Button
      variant="outline"
      className=" h-[58px] w-[200px] justify-start  rounded border-dashed px-4 dark:bg-slate-100"
      onClick={handleClick}
    >
      <div>
        <div className="flex items-center justify-center gap-2">
          <Add className="h-8 w-8 rounded bg-slate-200 p-2 dark:text-gray-400" />
          <p className=" font-poppins text-[12px] text-slate-600">{title}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </Button>
  );
}
