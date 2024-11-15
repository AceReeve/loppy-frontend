"use client";

import React, { useState } from "react";
import { useGetContactsQuery } from "@repo/redux-utils/src/endpoints/contacts.ts";
import { AlertCircle } from "lucide-react";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui";
import { LoadingTable } from "@repo/ui/loading-table.tsx";
import { useDebounce } from "use-debounce";
import { DataTable } from "@/src/components/data-table";
import { columns } from "@/src/app/dashboard/contacts/columns";
import ContactFilters from "@/src/app/dashboard/contacts/filters";
import { type Filter } from "@/src/types/types";

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

function ServiceTitanContacts() {
  //const { data: contacts, error, isLoading } = useGetContactsQuery(undefined);
  const [filters, setFilters] = useState<Filter>({
    search_key: "",
    status: "",
    sort_dir: "desc",
    filter: { source: "ServiceTitan" },
  });
  const [page, setPage] = useState(1);
  const [searchTerm] = useDebounce(filters.search_key, 500);

  const {
    data: contacts,
    error,
    isLoading,
    isFetching,
  } = useGetContactsQuery({
    ...filters,
    page,
    limit: 10,
    search_key: searchTerm,
    filter: JSON.stringify(filters.filter),
  });

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
    <DataTable
      columns={columns}
      data={contacts.data}
      paginationProps={{
        meta: contacts.meta,
        page,
        setPage,
      }}
      noResultsComponent={NoResultsComponent}
      isFetching={isFetching}
      filterProps={{ component: ContactFilters, filters, setFilters }}
    />
  ) : (
    <LoadingTable loading={isLoading} />
  );
}

export default ServiceTitanContacts;
