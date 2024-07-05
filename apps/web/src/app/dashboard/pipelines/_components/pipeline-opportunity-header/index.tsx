// TODO: Set proper typings
/* eslint-disable -- disregard errors, will improve later */

import React from "react";

export default function OpportunityHeader({ opportunity }: any) {
  return (
    <div className="mb-auto mt-2 min-h-[70px] w-full content-center rounded-2xl border-4 border-t-blue-600 bg-white px-5  py-2 shadow-xl drop-shadow-lg ">
      <h1 className="font-roboto text-[14px] font-medium">
        {opportunity.header}
      </h1>
      <div className="my-1 border-b-2" />
      <h1 className=" font-roboto text-[14px] font-medium">
        {" "}
        <span className="text-[14px] text-gray-400">
          {opportunity.leads.length} Leads{" "}
        </span>{" "}
        $28,994
      </h1>
    </div>
  );
}
