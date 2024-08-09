"use client";
import {
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui";
import React from "react";
import AssignedNumbers from "@/src/app/dashboard/settings/numbers/_tabs/assigned-numbers.tsx";

const tabs = [
  {
    label: "Assigned",
    id: "assigned-numbers",
    component: AssignedNumbers,
  },
  {
    label: "Unassigned",
    id: "unassigned-numbers",
    component: AssignedNumbers,
  },
];

export default function Page() {
  return (
    <div className="w-full">
      <h1 className="text-[36px]">Numbers</h1>
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
