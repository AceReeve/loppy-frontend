import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui";
import React from "react";
import BillingInformationTab from "@/src/app/dashboard/settings/billing-overview/_tabs/billing-information-tab.tsx";
import PlanAndBillingTab from "@/src/app/dashboard/settings/billing-overview/_tabs/plan-and-billing-tab.tsx";

export default function Page() {
  const tabs = [
    {
      label: "Billing Information",
      id: "billing-information",
      component: <BillingInformationTab />,
    },
    {
      label: "Plan And Billing",
      id: "plan-and-billing",
      component: <PlanAndBillingTab />,
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-slate-500">Users</h1>
      <div className=" w-full ">
        <Tabs className="mt-8 w-full" defaultValue={tabs[0].id}>
          <TabsList className="flex ">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
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
