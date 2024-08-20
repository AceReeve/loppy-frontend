import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDown } from "lucide-react";
import * as React from "react";

function ContactTab() {
  return (
    <div className="w-full text-gray-600 text-sm flex flex-col gap-2">
      <div className="grid grid-cols-2">
        <span>Email</span>
        <span>abelincoln@g...</span>
      </div>
      <div className="grid grid-cols-2">
        <span>Membership</span>
        <span>Gold</span>
      </div>
      <div className="grid grid-cols-2">
        <span>Last Appointment</span>
        <span>Jan 11, 2021</span>
      </div>
      <div className="grid grid-cols-2">
        <span>Lifetime Value</span>
        <span>$1776</span>
      </div>
    </div>
  );
}

function Test() {
  return <>Under Construction</>;
}

export default function IntegrationsDropdown() {
  const tabs = [
    {
      label: "Contact",
      id: "contact",
      component: ContactTab,
    },
    {
      label: "Jobs",
      id: "jobs",
      component: Test,
    },
    {
      label: "Services",
      id: "services",
      component: Test,
    },
  ];
  return (
    <Collapsible className="group w-full" defaultOpen>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="min-h-[70px] rounded-none text-base w-full font-inter font-medium leading-normal text-neutral-500 justify-between px-0 border-b border-gray-300"
        >
          <div className="flex gap-2 text-black items-center">
            <img
              className="w-10 h-[35px]"
              src="https://via.placeholder.com/40x35"
              alt=""
            />
            Service Titan
            <CheckCircleIcon className="size-5 text-[#66c87b]" />
          </div>
          <ChevronDown className="h-4 w-4 mx-2 group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Tabs className="mt-2 w-full border-b py-3" defaultValue={tabs[0].id}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:border-b-0 data-[state=active]:bg-gray-100 px-3 text-gray-600 text-sm rounded-3xl mx-1 mb-1 font-normal"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-2">
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
      </CollapsibleContent>
    </Collapsible>
  );
}
