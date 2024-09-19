import React from "react";
import { Button } from "@repo/ui/components/ui";
import { Add } from "iconsax-react";
import { Handle, Position } from "@xyflow/react";

interface TriggerNodeProps {
  id: string;
  data: {
    title: string;
    onButtonClick?: (isTrigger: boolean) => void; // onButtonClick is optional
    icon?: React.ReactNode;
  };
}
export default function TriggerNode({
  id,
  data: { icon, title, onButtonClick },
}: TriggerNodeProps) {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick(true); // Call the function with the boolean parameter
    }
  };

  const triggerNode = (
    <Button
      variant="outline"
      className=" w-[200px] justify-start  rounded px-2.5 dark:bg-slate-100"
      onClick={handleClick}
    >
      <div className="flex items-center justify-center gap-2">
        {!icon ? (
          <Add className="h-8 w-8 rounded bg-slate-200 p-2 dark:text-gray-400" />
        ) : (
          <div className="rounded border border-orange-500 bg-orange-500/10 p-2 text-gray-600">
            {icon}
          </div>
        )}
        <div className="flex flex-col text-left">
          <p className="font-poppins text-[clamp(10px,2vw+5px,12px)] text-orange-500">
            Trigger
          </p>
          <p className="font-poppins text-[clamp(2px,1vw,11px)] text-slate-600">
            {title}
          </p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </Button>
  );

  const startNode = (
    <Button
      variant="outline"
      className=" w-[200px] justify-start rounded border border-dashed  border-orange-500 px-4 py-3 dark:bg-slate-100"
      onClick={handleClick}
    >
      <div className="flex items-center justify-center gap-2">
        <Add className="h-8 w-8 rounded bg-slate-200 p-2 dark:text-gray-400" />
        <div className="flex flex-col text-left">
          <p className=" font-poppins text-[12px] text-orange-500">
            Add a new Trigger
          </p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </Button>
  );

  return id !== "0" ? triggerNode : startNode;
}
