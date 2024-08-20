import {
  Badge,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/ui";
import { ChevronDown } from "lucide-react";
import * as React from "react";

export default function TagsDropdown() {
  return (
    <Collapsible className="group w-full">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="min-h-[70px] rounded-none text-base w-full font-inter font-medium leading-normal text-neutral-500 justify-between px-0 border-b border-gray-300"
        >
          <div className="flex flex-col items-start">Tags</div>
          <ChevronDown className="h-4 w-4 mx-2 group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex w-full border-gray-300 border-b py-3 gap-2">
          <Badge variant="secondary">Test</Badge>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
