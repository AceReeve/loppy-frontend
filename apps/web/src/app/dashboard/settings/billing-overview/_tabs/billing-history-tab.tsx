import React from "react";
import type { GetBillingHistoryResponse } from "@repo/redux-utils/src/endpoints/types/billing-history";
import { BillingHistoryDataTable } from "@/src/app/dashboard/settings/billing-overview/_data-table/billing-history-data.tsx";
import { billingHistoryColumns } from "@/src/app/dashboard/settings/billing-overview/_columns/billing-history-columns.tsx";

interface BillingHistoryProps {
  billingHistory: GetBillingHistoryResponse[];
}
export default function BillingHistory(props: BillingHistoryProps) {
  const NoResultsComponent = (
    <div className="flex w-full flex-col items-center justify-center px-4 py-28">
      <div className="text-center font-montserrat text-4xl font-medium leading-[48px] text-gray-800">
        Page Under Construction
      </div>
      <div className="text-md mt-4 max-w-[1000px] text-center font-nunito font-normal leading-normal text-gray-700">
        We are currently working on this page to provide you with an enhanced
        experience. Please check back later for updates.
      </div>
      <div className="text-md mt-4 max-w-[1000px] text-center font-nunito font-normal leading-normal text-gray-700">
        Our team is dedicated to bringing you the best content and features.
        During this period, we are making significant improvements to ensure a
        better user experience. We apologize for any inconvenience this may
        cause and appreciate your understanding.
      </div>
      <img
        className="h-[149px] w-[126px]"
        src="/assets/icons/icon-no-data-contacts.svg"
        alt=""
      />
    </div>
  );
  return (
    <div>
      <div>
        <BillingHistoryDataTable
          columns={billingHistoryColumns}
          data={props.billingHistory}
          noResultsComponent={NoResultsComponent}
        />
      </div>
    </div>
  );
}
