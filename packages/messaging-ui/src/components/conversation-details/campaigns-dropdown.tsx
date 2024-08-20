import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/ui";
import { ChevronDown } from "lucide-react";
import * as React from "react";

export default function CampaignsDropdown() {
  return (
    <Collapsible className="group w-full" defaultOpen>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="min-h-[70px] rounded-none text-base w-full font-inter font-medium leading-normal text-neutral-500 justify-between px-0 border-b border-gray-300"
        >
          <div className="flex flex-col items-start">
            Campaigns
            <span className="text-gray-400 text-xs font-normal leading-none">
              5 campaigns
            </span>
          </div>
          <ChevronDown className="h-4 w-4 mx-2 group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col w-full border-gray-300 border-b py-3 gap-1">
          {Array.from({ length: 4 }, (_, i) => i + 1).map((item) => (
            <div
              className="flex justify-between items-center w-full"
              key={item}
            >
              <div className="flex text-gray-500 text-sm font-normal font-inter leading-normal">
                <img
                  alt=""
                  className="size-5"
                  src="/assets/icons/messaging/check-read-line-duotone.svg"
                />
                A/C tune-up reminder
              </div>
              <span className="text-xs font-normal font-inter leading-none">
                4/3/24
              </span>
            </div>
          ))}
          <button
            className="text-sm font-medium text-sky-400 text-left mt-2"
            type="button"
          >
            Show more
          </button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
