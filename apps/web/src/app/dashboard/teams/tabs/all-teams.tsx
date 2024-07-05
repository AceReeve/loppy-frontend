import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@repo/ui/components/ui";
import React from "react";
import AccountComponent from "@/src/app/dashboard/settings/connected-account/component-account";

export default function AllTeams() {
  return (
    <>
      <div className="relative flex w-full flex-row justify-start justify-between gap-4">
        <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500" />
        <Input
          className="max-w-60 pl-10"
          placeholder="Search name, phone, etc..."
          type="search"
        />

        <Button className="gap-2 rounded-xl" variant="outline">
          <img
            alt=""
            className="w-[18px]"
            src="/assets/icons/icon-filter.svg"
          />
          Add Filter
        </Button>
      </div>

      <div className="m-auto mt-5 grid w-full grid-cols-1 gap-5 px-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" />
      <AccountComponent />
      <AccountComponent />
      <AccountComponent />
      <AccountComponent />
    </>
  );
}
