"use client";

import React, { useEffect, useState } from "react";
// import type { Contacts } from "@/src/app/dashboard/contacts/columns";
import { columns } from "@/src/app/dashboard/contacts/columns";
import { DataTable } from "@/src/components/data-table";
import { useGetContactsQuery } from "@/src/endpoints/contacts.ts";
import { AlertCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import LoadingSpinner from "@/src/loading/loading-spinner.tsx";
import { Button } from "@headlessui/react";
import { GetContactsPayload } from "@/src/endpoints/types/contacts";

// const GET_USERS = gql`
//   query GetUsers {
//     users @rest(type: "[User]", path: "/users", endpoint: "sample-data") {
//       id
//       name
//       email
//       phone
//       website
//       company
//     }
//   }
// `;

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
    />
  </div>
);

function AllContacts() {
  //const { data: contacts, error, isLoading } = useGetContactsQuery(undefined);
  const [filters, setFilters] = useState({
    search_key: "",
    status: "",
    skip: 0,
    limit: 100,
    sort_dir: "desc",
    tag: [] as string[],
  });

  const GetFilter = (value: any) => {
    setFilters(value);
    console.log(value);
    // You can access 'filters' here directly if it's in the scope of this function
  };

  /*  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      tag: selectedFilters.map((filter: any) => filter.label),
    }));
  }, [selectedFilters]);*/

  const { data: contacts, error, isLoading } = useGetContactsQuery(filters);

  if (isLoading) {
    return <LoadingSpinner />;
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
      columns={columns}
      data={contacts.data} // Just use 'contacts' directly
      noResultsComponent={NoResultsComponent}
      setFilters={GetFilter}
    />
  );
}

export default AllContacts;
