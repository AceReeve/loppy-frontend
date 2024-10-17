import React from "react";
import type { EdgeProps } from "@xyflow/react";
import { EdgeLabelRenderer, getSmoothStepPath } from "@xyflow/react";
import { Button } from "@repo/ui/components/ui";

interface ActionEdgeProps extends EdgeProps {
  data: {
    onButtonClick?: (isTriggers: boolean, edge?: string) => void;
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
  source,
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
      data.onButtonClick(false, id);
    }
  };

  const StartEdge = (
    <EdgeLabelRenderer>
      <div className="pointer-events-auto absolute flex size-8 -translate-x-1/2 -translate-y-1/2 translate-x-[85px] translate-y-[140px] ">
        <Button
          variant="outline"
          className={`text-md size-full cursor-pointer rounded rounded-full border border-slate-500 bg-white p-1 text-slate-600 dark:bg-slate-100 w-[${buttonWidth.toString()}px] h-[${buttonHeight.toString()}px] flex items-center justify-center`}
          onClick={handleClick}
        >
          +
        </Button>
        {/*  {id}*/}
      </div>
    </EdgeLabelRenderer>
  );

  const BaseActionEdge = (
    <foreignObject
      width={buttonWidth}
      //width={100}
      height={buttonHeight}
      x={labelX - buttonWidth / 2}
      y={labelY - buttonHeight / 2}
    >
      <div className="flex size-10 h-full w-full items-center justify-center ">
        <Button
          variant="outline"
          onClick={handleClick}
          className={`text-md size-full cursor-pointer rounded rounded-full border border-slate-500 bg-white p-1 text-slate-600 dark:bg-slate-100 w-[${buttonWidth.toString()}px] h-[${buttonHeight.toString()}px] flex items-center justify-center`}
        >
          {buttonContent}
        </Button>
        {/* {id}*/}
      </div>
    </foreignObject>
  );

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path pointer-events-none"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {source === "n0" ? StartEdge : BaseActionEdge}
    </>
  );
}
