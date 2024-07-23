import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Separator,
  Textarea,
} from "@repo/ui/components/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import { RoleDataTable } from "@/src/app/dashboard/settings/teams/_components/role-data.tsx";
import { roleColumns } from "@/src/app/dashboard/settings/teams/_components/columns.tsx";

export default function Roles() {
  const roleList = [
    {
      role: "Administrator",
      members: 1,
    },
    {
      role: "Manager",
      members: 4,
    },
    {
      role: "Member",
      members: 2,
    },
    {
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
      <div className="flex flex-row items-center justify-between">
        <div className="relative flex w-[225px] w-full flex-row justify-between gap-4">
          <MagnifyingGlassIcon className="absolute left-2 top-1.5 h-5 w-5 text-gray-500 " />
          <Input
            className="h-[35px] max-w-60 pl-10"
            placeholder="Search Roles"
            type="search"
          />
        </div>
        <Dialog>
          <DialogTrigger>
            <Button className="px-5">Add Role</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] font-poppins">
            <div className="text-2xl">Create Role</div>
            <Separator />
            <div className="">
              <p className="text-sm font-light">Role Name</p>
              <input
                className="h-10 w-[250px] text-sm"
                placeholder="Enter a Role"
              />
            </div>
            <div className="p-1">
              <p className="text-sm font-light">Description</p>
              <Textarea
                placeholder="Role Description"
                className="resize-none font-light"
              />
            </div>
            <div className="flex justify-end">
              <Button className="text-md">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <RoleDataTable
        columns={roleColumns}
        data={roleList}
        noResultsComponent={NoResultsComponent}
      />
    </div>
  );
}
