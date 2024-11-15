import React from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui";
import { Add } from "iconsax-react";
import { Handle, Position } from "@xyflow/react";
import { Ellipsis } from "lucide-react";

export interface ActionNodeProps {
  id: string;
  data: {
    title: string;
    onButtonClick?: (isTrigger: boolean) => void;
    icon?: React.ReactNode;
  };
}

export default function ActionNode({
  id,
  data: { title, onButtonClick, icon },
}: ActionNodeProps) {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick(true);
    }
  };

  const actionNode = (
    <div>
      <Button
        variant="outline"
        className=" h-[60px] w-[200px] justify-start  rounded px-2.5 dark:bg-slate-100"
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
          <p className=" max-w-32 overflow-hidden overflow-ellipsis whitespace-nowrap font-poppins text-[clamp(5px,5vw,11px)] text-slate-600">
            {title}
          </p>
        </div>
        <Handle type="source" position={Position.Bottom} />
        <Handle type="target" position={Position.Top} />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis
            size={15}
            className="absolute right-2 top-1 cursor-pointer text-gray-600 hover:text-gray-500"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Move to Top</DropdownMenuItem>
            <DropdownMenuItem>Move to Bottom</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  const endNode = (
    <>
      <div className="flex size-4 h-[60px] w-[200px] items-center justify-center rounded-full bg-slate-300 text-center">
        <h1 className="font-semibold text-gray-600">END</h1>
      </div>
      <Handle type="target" position={Position.Top} />
    </>
  );

  return id !== "a0" ? actionNode : endNode;
}
