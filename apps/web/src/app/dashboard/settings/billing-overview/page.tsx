import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui";
import React from "react";
import BillingInformationTab from "@/src/app/dashboard/settings/billing-overview/_tabs/billing-information-tab.tsx";
import BillingHistory from "@/src/app/dashboard/settings/billing-overview/_tabs/billing-history-tab.tsx";

export default function Page() {
  const billingHistory = [
    {
      invoice: "10012",
      datePaid: "02/31/2024",
      amount: 2924.28,
      status: "Completed",
    },
    {
      invoice: "10013",
      datePaid: "04/31/2024",
      amount: 2924.28,
      status: "Failed",
    },
    {
      invoice: "10014",
      datePaid: "02/31/2024",
      amount: 2924.28,
      status: "Completed",
    },
  ];
  const tabs = [
    {
      label: "Billing Information",
      id: "billing-information",
      component: <BillingInformationTab />,
    },
    /*    {
      label: "Plan And Billing",
      id: "plan-and-billing",
      component: <PlanAndBillingTab />,
    },*/
    {
      label: "Billing History",
      id: "billing-history",
      component: <BillingHistory billingHistory={billingHistory} />,
    },
  ];
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-slate-500">
        Billing Overview
      </h1>
      <div className="w-full ">
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
