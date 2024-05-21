import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "@repo/ui/components/ui";

export default function PipelineHeader() {
  return (
    <div className="w-full h-[70px] drop-shadow-lg shadow-lg rounded-md flex align-middle justify-end px-5 mb-6">
      <div className=" flex justify-between gap-2 w-[500px] my-auto ">
        <div className="relative w-70 ">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
            <svg
              className="h-5 w-5 text-gray-500 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            name="email"
            id="topbar-search"
            className="block h-10 w-full rounded-lg border-none bg-white p-2.5 px-3.5 py-3 pl-10 text-gray-900 shadow-none placeholder:text-gray-600/50 sm:text-sm"
            placeholder="Search Leads"
          />
        </div>
        <button className="xs:flex-1 flex h-[40px] flex-initial items-center justify-center gap-2.5 whitespace-nowrap rounded-[9px] border border-gray-700/25 px-3.5 py-4">
          <div className="font-nunito text-base/[1] font-bold text-gray-600">
            Sort by
          </div>
          <ChevronDownIcon className="relative h-[15px] w-[15px] text-gray-400" />
        </button>

        <Button variant={"default"} className="text-white">
          + Opportunity
        </Button>
      </div>
    </div>
  );
}
