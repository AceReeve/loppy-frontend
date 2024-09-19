"use client";

import { Input } from "@repo/ui/components/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useGetPurchasedNumbersQuery } from "@repo/redux-utils/src/endpoints/phone-numbers.ts";
import { LoadingTable } from "@repo/ui/loading-table.tsx";
import { numbersColumns } from "@/src/app/dashboard/settings/numbers/columns.tsx";
import BuyNumberModal from "@/src/app/dashboard/settings/numbers/_components/modals/buy-number-modal.tsx";
import { DataTable } from "@/src/components/data-table";
import { useDashboardState } from "@/src/providers/dashboard-provider.tsx";

export default function AssignedNumbers() {
  const { currentOrg } = useDashboardState();

  const { data: numbersList, isLoading } = useGetPurchasedNumbersQuery({
    organization_id: currentOrg._id,
  });

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

  return numbersList ? (
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
      <DataTable
        columns={numbersColumns}
        data={numbersList}
        noResultsComponent={NoResultsComponent}
        className="mt-4"
      />
    </div>
  ) : (
    <LoadingTable loading={isLoading} />
  );
}
