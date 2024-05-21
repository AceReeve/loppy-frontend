import React from "react";

export default function OpportunityHeader({ opportunity }: any) {
  return (
    <div className="border-t-blue-600 border-4 content-center min-h-[70px] w-full bg-white rounded-2xl px-5 py-2 mb-auto  mt-2 drop-shadow-lg shadow-xl ">
      <h1 className="font-medium font-roboto text-[14px]">
        {opportunity.header}
      </h1>
      <div className="border-b-2 my-1"></div>
      <h1 className=" font-medium font-roboto text-[14px]">
        {" "}
        <span className="text-[14px] text-gray-400">
          {opportunity.leads.length} Leads{" "}
        </span>{" "}
        $28,994
      </h1>
    </div>
  );
}
