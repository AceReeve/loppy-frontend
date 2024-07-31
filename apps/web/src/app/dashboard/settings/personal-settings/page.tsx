import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui";
import React from "react";
import ProfileTab from "@/src/app/dashboard/settings/personal-settings/_tabs/profile-tab.tsx";
import AccountTab from "@/src/app/dashboard/settings/personal-settings/_tabs/account-tab.tsx";
import SecurityTab from "@/src/app/dashboard/settings/personal-settings/_tabs/security-tab.tsx";

export default function Page() {
  const tabs = [
    {
      id: "profile",
      label: "Profile",
      component: ProfileTab,
    },
    {
      id: "account",
      label: "Account",
      component: AccountTab,
    },
    {
      id: "security",
      label: "Security",
      component: SecurityTab,
    },
  ];
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-slate-500">
        Personal Settings
      </h1>
      <div className=" w-full ">
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
    </div>
  );
}
