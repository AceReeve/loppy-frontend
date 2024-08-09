"use client";
import {
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui";
import React from "react";
import AllInboxes from "@/src/app/dashboard/settings/inboxes/_tabs/all-inboxes.tsx";

const tabs = [
  {
    label: "All Inboxes",
    id: "all-inboxes",
    component: AllInboxes,
  },
  {
    label: "Group Inboxes",
    id: "group-inboxes",
    component: AllInboxes,
  },
];

export default function Page() {
  return (
    <div className="w-full">
      <h1 className="text-[36px]">Inboxes</h1>
      <Separator className="my-2" />
      <Tabs className="mt-8 w-full" defaultValue={tabs[0].id}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-2 w-full">
          {tabs.map((tab) => {
            const TabComponent = tab.component;
            return (
              <TabsContent key={tab.id} value={tab.id}>
                <TabComponent />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}
