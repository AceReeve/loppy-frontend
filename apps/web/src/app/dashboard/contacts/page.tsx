import React from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui";
import AllContacts from "./tabs/all-contacts";
import MyContacts from "./tabs/my-contacts";
import UnassignedContacts from "./tabs/unassigned-contacts";

import { ArrowDown2 } from "iconsax-react";

function Page() {
  const tabs = [
    {
      label: "All Contacts",
      id: "all-contacts",
      component: AllContacts,
    },
    {
      label: "My contacts",
      id: "my-contacts",
      component: MyContacts,
    },
    {
      label: "Unassigned contacts",
      id: "unassigned-contacts",
      component: UnassignedContacts,
    },
  ];

  return (
    <div className="p-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-end gap-3">
          <div className="font-montserrat text-4xl font-medium leading-[48px] text-gray-800">
            Contacts
          </div>
          <div className="mb-2 font-montserrat text-sm font-normal text-gray-500">
            0 contacts
          </div>
        </div>
        <div className="flex items-end gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 rounded-xl">
                Action
                <ArrowDown2 size={12} variant="Bold" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="rounded-xl">
            Import
          </Button>
          <Button className="rounded-xl">Create Contact</Button>
        </div>
      </div>
      <Tabs defaultValue={tabs[0].id} className="mt-8 w-full">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-10">
          {tabs.map((tab) => {
            const TabComponent = tab.component;
            return (
              <TabsContent value={tab.id} key={tab.id}>
                <TabComponent />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}

export default Page;
