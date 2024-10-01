"use client";
import {
  Input,
  Separator,
  VerticalMenu,
  VerticalMenuLink,
} from "@repo/ui/components/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const Overall = dynamic(() => import("./_components/overall"), { ssr: false });
const Conversations = dynamic(() => import("./_components/conversations"), {
  ssr: false,
});
const Messages = dynamic(() => import("./_components/messages"), {
  ssr: false,
});
const Calling = dynamic(() => import("./_components/calling"), { ssr: false });
const Performance = dynamic(() => import("./_components/performance"), {
  ssr: false,
});
const Contacts = dynamic(() => import("./_components/contacts"), {
  ssr: false,
});
const Conversions = dynamic(() => import("./_components/conversions"), {
  ssr: false,
});

const creditUsageTabs = [
  {
    name: "Overall",
    id: 0,
    component: <Overall />,
  },
  {
    name: "Conversations",
    id: 1,
    component: <Conversations />,
  },
  {
    name: "Messages",
    id: 2,
    component: <Messages />,
  },
  {
    name: "Calling",
    id: 3,
    component: <Calling />,
  },
  {
    name: "Performance",
    id: 4,
    component: <Performance />,
  },
  {
    name: "Contacts",
    id: 5,
    component: <Contacts />,
  },
  {
    name: "Conversions",
    id: 6,
    component: <Conversions />,
  },
];

export default function CreditUsage() {
  const [currentCreditUsageTab, setCurrentCreditUsageTab] = useState(
    creditUsageTabs[0],
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  }, []);

  const handleChangeCreditUsageTab = useCallback((creditUsageTabId: number) => {
    setCurrentCreditUsageTab(creditUsageTabs[creditUsageTabId]);
  }, []);

  const filteredCreditUsageTabs = useMemo(() => {
    return creditUsageTabs.filter((creditUsageTab) =>
      creditUsageTab.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const CreditUsageComponent = (
    <div className="flex gap-5 space-x-4">
      <div className="min-w-[200px] max-w-[300px]">
        <VerticalMenu className=" !shadow-none">
          <div className="relative flex w-[225px] w-full flex-row justify-between gap-2">
            <MagnifyingGlassIcon className="absolute left-2 top-1.5 h-5 w-5 text-gray-500 " />
            <Input
              className="h-[35px] w-[225px] rounded-none pl-10"
              placeholder="Search Credit Usage"
              type="search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Separator className="mt-2" />
          {filteredCreditUsageTabs.map((creditUsageTab) => (
            <VerticalMenuLink
              active={creditUsageTab.id === currentCreditUsageTab.id}
              key={creditUsageTab.id}
              className="cursor-pointer"
              onClick={() => {
                handleChangeCreditUsageTab(creditUsageTab.id);
              }}
            >
              {creditUsageTab.name}
            </VerticalMenuLink>
          ))}
        </VerticalMenu>
      </div>
      <div className=" h-full min-h-[1000px] border-l border-gray-300" />

      <div className=" w-full ">{currentCreditUsageTab.component}</div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-500">Credit Usage</h1>
      </div>

      <Separator className="my-2" />
      {CreditUsageComponent}
    </div>
  );
}
