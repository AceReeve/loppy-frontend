"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui";
import React from "react";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { useGetInvitedUsersQuery } from "@repo/redux-utils/src/endpoints/settings-user.ts";
import ActiveMembers from "@/src/app/dashboard/settings/users/_tabs/active-members.tsx";
import PendingInvites from "@/src/app/dashboard/settings/users/_tabs/pending-invites.tsx";
import RolesPermission from "@/src/app/dashboard/settings/users/_tabs/roles-and-permissions.tsx";

export default function Page() {
  const {
    data: usersData,
    error: usersError,
    isLoading: usersIsLoading,
  } = useGetInvitedUsersQuery(undefined);

  if (usersError) {
    return <div>Error Loading Data</div>;
  }

  if (usersIsLoading) {
    return (
      <div className="m-auto flex h-full flex-col items-center justify-center space-y-6">
        <LoadingSpinner />
        <p>Loading, please wait...</p>
      </div>
    );
  }

  function getUsers(status: string) {
    return usersData?.users.filter((user) => user.status === status);
  }

  const tabs = [
    {
      label: "Active",
      id: "active-members",
      component: <ActiveMembers usersData={getUsers("Accepted")} />,
    },
    {
      label: "Pending",
      id: "pending-invites",
      component: <PendingInvites usersData={getUsers("Pending")} />,
    },
    {
      label: "Roles and Permissions",
      id: "roles-permission",
      component: <RolesPermission />,
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-slate-500">Users</h1>
      <div className=" w-full ">
        <Tabs className="mt-8 w-full" defaultValue={tabs[0].id}>
          <TabsList className="flex justify-between">
            <div className="relative h-full">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </div>
            <p>
              <b>4</b> of <b>4</b> seats.
            </p>
          </TabsList>
          <div className="mt-2 w-full ">
            {tabs.map((tab) => {
              // const TabComponent = tab.component;
              return (
                <TabsContent key={tab.id} value={tab.id}>
                  {tab.component}
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
