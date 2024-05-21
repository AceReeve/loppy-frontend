"use client";

import React from "react";
// import type { Contacts } from "@/src/app/dashboard/contacts/columns";
import { columns } from "@/src/app/dashboard/contacts/columns";
import { DataTable } from "@/src/components/data-table";

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
  const { data, error, loading } = {};
  console.log("data", data);
  if (!data?.users) return <></>;
  return (
    <DataTable
      columns={columns}
      data={data.users}
      noResultsComponent={NoResultsComponent}
    />
  );
}

export default AllContacts;
