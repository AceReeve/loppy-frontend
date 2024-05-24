import React from "react";
import {
  Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
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
          <Dialog>
            <DialogTrigger>
              <Button className="rounded-xl">Create Contact</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Create New Contact
                </DialogTitle>
                <form>
                  <div className="mb-4">
                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">User ID</label>
                    <input type="text" id="user_id" name="user_id"
                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" id="first_name" name="first_name"
                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" id="last_name" name="last_name"
                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email"
                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone
                      Number</label>
                    <input type="tel" id="phone_number" name="phone_number"
                           className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                  <div className="mt-4">
                    <button type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">Submit
                    </button>
                  </div>
                </form>

              </DialogHeader>

            </DialogContent>
          </Dialog>
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
                  <TabComponent/>
                </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}

export default Page;
