import React from "react";
import { memberColumns } from "@/src/app/dashboard/settings/teams/_components/member-columns.tsx";
import { MemberDataTable } from "@/src/app/dashboard/settings/teams/_components/member-data.tsx";

export default function Members() {
  const memberList = [
    {
      first_name: "Antonio",
      last_name: "Bennet",
      email: "hu@oru.net",
      role: "Administrator",
      members: 1,
    },
    {
      first_name: "Antonio",
      last_name: "Bennet",
      email: "hu@oru.net",
      role: "Manager",
      members: 4,
    },
    {
      first_name: "Antonio",
      last_name: "Bennet",
      email: "hu@oru.net",
      role: "Member",
      members: 2,
    },
    {
      first_name: "Antonio",
      last_name: "Bennet",
      email: "hu@oru.net",
      role: "Observer",
      members: 1,
    },
  ];

  const NoResultsComponent = (
    <div className="flex w-full flex-col items-center justify-center px-4 py-28">
      <div className="text-center font-montserrat text-4xl font-medium leading-[48px] text-gray-800">
        Time to get organized
      </div>
      <div className="mt-4 max-w-[641px] text-center font-nunito text-sm font-normal leading-normal text-gray-700">
        Start by giving Cuboid data to work with, like contacts. After, you can
        sort search, and filter to find to find what you need and hide what you
        don’t.
      </div>
      <img
        className="h-[149px] w-[126px]"
        src="/assets/icons/icon-no-data-contacts.svg"
        alt=""
      />
    </div>
  );

  return (
    <div className="p-4">
      <MemberDataTable
        columns={memberColumns}
        data={memberList}
        noResultsComponent={NoResultsComponent}
      />
    </div>
  );
}
