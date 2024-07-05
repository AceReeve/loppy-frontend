import React from "react";
import { useGetContactsQuery } from "@repo/redux-utils/src/endpoints/contacts.ts";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui";
import { AlertCircle } from "lucide-react";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { DataTable } from "@/src/components/data-table";
import { unsoldTicketsColumns } from "@/src/components/table/unsold-tickets-table/columns/unsold-tickets-columns.tsx";

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

export default function UnsoldTicketsTable() {
  const {
    data: contacts,
    error,
    isLoading,
  } = useGetContactsQuery({
    search_key: "",
    status: "",
    skip: "0",
    limit: "3",
    sort_dir: "desc",
  });

  if (isLoading) {
    return (
      <div className="m-auto h-[500px] w-full content-center">
        <div className="m-auto h-[50px] w-[15px] content-center">
          <LoadingSpinner />
        </div>
        <p className="text-center font-nunito text-lg">
          Loading please wait...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{getErrorMessage(error)}</AlertDescription>
      </Alert>
    );
  }

  if (!contacts) return null;
  return (
    <DataTable
      columns={unsoldTicketsColumns}
      data={contacts.data} // Just use 'contacts' directly
      noResultsComponent={NoResultsComponent}
      enablePagination={false}
    />
  );
}
