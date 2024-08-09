"use client";

import { Input } from "@repo/ui/components/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import { type InboxesResponse } from "@repo/redux-utils/src/endpoints/types/inboxes";
import { RoleDataTable } from "@/src/app/dashboard/settings/teams/_components/role-data.tsx";
import { inboxesColumns } from "@/src/app/dashboard/settings/inboxes/_components/columns.tsx";
import BuyNumberModal from "../_components/modals/buy-number-modal.tsx";

export default function AllInboxes() {
  const inboxesList: InboxesResponse["data"][] = [
    {
      name: "Garrett Elmore",
      phone_number: "(803) 123-456",
      owner: "Garrett Elmore",
      members: "1",
      created_at: "1 Jul 2024 - 4:10 AM",
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
      <div className="flex flex-row items-center justify-between">
        <div className="relative flex w-[225px] flex-row justify-between gap-4">
          <MagnifyingGlassIcon className="absolute left-2 top-1.5 h-5 w-5 text-gray-500 " />
          <Input
            className="h-[35px] max-w-60 pl-10"
            placeholder="Search Roles"
            type="search"
          />
        </div>
        <BuyNumberModal />
      </div>
      <RoleDataTable
        columns={inboxesColumns}
        data={inboxesList}
        noResultsComponent={NoResultsComponent}
      />
    </div>
  );
}
