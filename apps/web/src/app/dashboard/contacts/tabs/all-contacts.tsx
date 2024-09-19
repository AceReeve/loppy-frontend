"use client";

import React, { useState } from "react";
import { useGetContactsQuery } from "@repo/redux-utils/src/endpoints/contacts.ts";
import { AlertCircle } from "lucide-react";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui";
import { LoadingTable } from "@repo/ui/loading-table.tsx";
import { DataTable } from "@/src/components/data-table";
import { columns } from "@/src/app/dashboard/contacts/columns";

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

function AllContacts() {
  //const { data: contacts, error, isLoading } = useGetContactsQuery(undefined);
  const [filters, setFilters] = useState({
    search_key: "",
    status: "",
    skip: 0,
    limit: 10,
    sort_dir: "desc",
  });

  const {
    data: contacts,
    error,
    isLoading,
    isFetching,
  } = useGetContactsQuery(filters);

  const onPageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      skip: page * 10,
    }));
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{getErrorMessage(error)}</AlertDescription>
      </Alert>
    );
  }

  return contacts ? (
    <>
      {/*<ContactFilters setFilters={setFilters} />*/}
      <DataTable
        columns={columns}
        data={contacts.data} // Just use 'contacts' directly
        apiPagination={contacts.meta}
        onPageChange={onPageChange}
        noResultsComponent={NoResultsComponent}
        isFetching={isFetching}
      />
    </>
  ) : (
    <LoadingTable loading={isLoading} />
  );
}

export default AllContacts;
