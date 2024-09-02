import React from "react";
import type { EdgeProps } from "@xyflow/react";
import { getSmoothStepPath } from "@xyflow/react";
import { Button } from "@repo/ui/components/ui";

interface ActionEdgeProps extends EdgeProps {
  data: {
    onButtonClick?: (isTriggers: boolean) => void;
  };
}

export default function ActionEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  data,
}: ActionEdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const buttonContent = "+";
  //const buttonWidth = buttonContent.length * 8;
  const buttonWidth = 30;
  const buttonHeight = 30;

  const handleClick = () => {
    if (data.onButtonClick) {
      data.onButtonClick(false);
    }
  };

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={buttonWidth}
        height={buttonHeight}
        x={labelX - buttonWidth / 2}
        y={labelY - buttonHeight / 2}
        className=""
      >
        <div className="flex h-full w-full items-center justify-center ">
          <Button
            variant="outline"
            onClick={handleClick}
            className={`text-md cursor-pointer rounded rounded-full border border-slate-500 bg-white p-1 text-slate-600 dark:bg-slate-100 w-[${buttonWidth.toString()}px] h-[${buttonHeight.toString()}px] flex items-center justify-center`}
          >
            {buttonContent}
          </Button>
        </div>
      </foreignObject>
    </>
  );
}
