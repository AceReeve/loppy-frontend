import React from "react";
import { Add } from "iconsax-react";
import type { BaseNodeProps } from "@/src/app/dashboard/workflows/_components/_custom-nodes/base-node.tsx";
import BaseNode from "@/src/app/dashboard/workflows/_components/_custom-nodes/base-node.tsx";

/*function TriggerNode(props: BaseNodeProps) {
  return (
    <BaseNode {...props}>
      <Add className="rounded bg-slate-200 p-1 dark:text-gray-400" />
    </BaseNode>
  );
}*/

/*const endNode = (
  <div className="flex items-center justify-center gap-2">
    <Add className="h-8 w-8 rounded bg-orange-100/80 p-2 text-orange-500 " />
    <p className="font-poppins text-[12px] text-slate-600">
      {props.data.title}
    </p>
  </div>
);*/
function ActionNode(props: BaseNodeProps) {
  return (
    <BaseNode {...props}>
      <div className="flex items-center justify-center gap-2">
        <Add className="h-8 w-8 rounded bg-orange-100/80 p-2 text-orange-500 " />
        <p className="font-poppins text-[12px] text-slate-600">
          {props.data.title}
        </p>
      </div>
    </BaseNode>
  );
}

export { ActionNode };
