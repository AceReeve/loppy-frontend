import React from "react";
import { AccordionContent } from "@repo/ui/components/ui";

export default function FirstNameFilter() {
  return (
    <AccordionContent className="h-auto min-h-[50px] ">
      <div className="w-70 relative drop-shadow-lg">
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
            />
          </svg>
        </div>
        <input
          autoComplete="off"
          type="text"
          name="email"
          id="topbar-search"
          className="block h-10 w-full rounded-lg border-none bg-white p-2.5 px-3.5 py-3 pl-10 text-gray-900 shadow-none placeholder:text-gray-600/50 sm:text-sm"
          placeholder="ex: Juan, Jose, Marie"
        />
      </div>
    </AccordionContent>
  );
}
