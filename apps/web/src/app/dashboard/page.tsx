"use client";

import Image from "next/image";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Call, Export, Global, Profile2User } from "iconsax-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  ToggleGroup,
  ToggleGroupItem,
} from "@repo/ui/components/ui";
import { ArrowUpIcon } from "@heroicons/react/16/solid";
import { Mail } from "lucide-react";
import Table from "@/src/components/table";
import RingProgress from "@/src/components/progress/ring-progress";
import ColumnChart from "@/src/components/charts/column-chart";
import dashboardSampleData from "@/src/data/sample/dashboard-sample-data";
import LineChart from "@/src/components/charts/line-chart";
import { useDashboardState } from "@/src/providers/dashboard-provider.tsx";
import { DefaultAvatar } from "@repo/ui/components/custom";

export default function Page() {
  const [value, setValue] = useState("1D");
  const { session } = useDashboardState();

  const customerLeads = [
    {
      icon: Global,
      lead: "Social Media",
      value: 50.342,
    },
    {
      icon: Mail,
      lead: "Email",
      value: 34.342,
    },
    {
      icon: Call,
      lead: "Call",
      value: 18.342,
    },
  ];
  const colors = ["#4CAF50", "#2196F3", "#9C27B0"];
  // if (loading) return <p>Loading users...</p>;
  // if (error) return <p>{error?.message}</p>;

  return (
    <div className="p-10">
      {/* Dashboard Header */}
      <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <div className="s-hrink-0 relative h-[54px] w-[54px]">
            <DefaultAvatar
              className="size-full"
              image={session?.user.image ?? ""}
              name={session?.user.name ?? ""}
            />
            <svg
              className="absolute left-0 top-0 -ml-[20%] -mt-[20%]"
              height="140%"
              style={{ transform: "rotate(-90deg)" }}
              viewBox="0 0 160 160"
              width="140%"
            >
              <circle
                cx="80"
                cy="80"
                fill="transparent"
                r="70"
                stroke="#60e6a8"
                strokeWidth="5px"
                strokeDasharray="140 999"
                // strokeDashoffset="109.9px"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-[13px]">
            <div className="font-nunito text-[2rem]/[1] font-bold text-black">
              Welcome back, {session?.profile?.given_name}!
            </div>
            <p className="font-open-sans text-sm font-normal tracking-wider text-gray-400">
              We’ve recently added updates to the Call Center - Check them out{" "}
              <a className="text-primary" href="#">
                here
              </a>
            </p>
          </div>
        </div>
        <div className="flex gap-4 self-end lg:gap-7">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="xs:flex-1 flex h-[46px] flex-initial items-center justify-center gap-2.5 whitespace-nowrap rounded-[9px] border border-gray-700/25 px-3.5 py-4"
                variant="outline"
              >
                <div className="font-nunito text-base/[1] font-bold text-gray-600">
                  This Month
                </div>
                <ChevronDownIcon className="relative h-[15px] w-[15px] text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>This Week</DropdownMenuItem>
              <DropdownMenuItem>Today</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="bg-primary flex h-[46px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[9px] px-6 py-4">
            <Export className="relative h-6 w-6 text-[#fff]" />
            <div className="font-nunito text-base/[1] font-bold text-[#fff]">
              Export
            </div>
          </Button>
        </div>
      </div>

      {/*  First Row Components */}
      <div className="mt-5 grid grid-cols-12 gap-[38px]">
        {[1, 2, 3].map((i) => (
          <div
            className="bg-card shadow-soft dark:border-secondary/40 relative col-span-12 flex flex-col gap-5 rounded-[14px] p-5 lg:col-span-6 xl:col-span-3 dark:border"
            key={i}
          >
            <div className="absolute right-[11px] top-[10px] flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#E6E6E6]">
              <Profile2User className="h-[34.80px] w-[34.80px] text-black" />
            </div>
            <div className="font-open-sans mt-2 pr-[60px] text-lg font-semibold text-gray-500">
              Total Customers
            </div>
            <h2 className="text-[38px] font-bold leading-10 text-gray-700">
              450
            </h2>
            <div className="flex items-start justify-start gap-2.5">
              <div className="relative w-[31px] self-stretch">
                <Image
                  alt=""
                  className="absolute left-0 top-0 h-[17px] w-[31px] object-contain"
                  fill
                  src="/assets/icons/icon-trending-up.svg"
                />
              </div>
              <div className="self-stretch">
                <span className="text-sm font-semibold text-green-400">
                  10%{" "}
                </span>
                <span className="text-sm font-normal text-slate-900" />
                <span className="text-sm font-normal text-gray-600">
                  vs. previous month
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-card shadow-soft dark:border-secondary/40 relative col-span-12 flex flex-col gap-5 rounded-[14px] p-5 lg:col-span-6 xl:col-span-3 dark:border">
          <div className="font-open-sans mt-2 text-lg font-semibold text-gray-500">
            Top Lead Source
          </div>
          <div className="flex items-center gap-2.5">
            <Image
              alt=""
              height={29}
              src="/assets/icons/icon-facebook.png"
              width={29}
            />
            <h2 className="text-2xl font-semibold text-gray-700">Facebook</h2>
          </div>
          <div className="text-sm font-normal text-gray-600">
            Last Months TikTok
          </div>
        </div>
      </div>

      {/* Second Row Components */}
      <div className="mt-5 grid grid-cols-12 gap-[38px]">
        <div className="bg-card shadow-soft dark:border-secondary/40 relative col-span-full flex flex-col gap-5 rounded-[32px] p-6 lg:col-span-7 dark:border">
          <div className="font-montserrat pr-[60px] text-lg font-semibold text-gray-900">
            Website Analytics
          </div>
          {/*Chart Filter by Date */}
          <div className="absolute right-4 top-5 inline-flex h-6 w-[104px] items-center justify-center gap-2.5 rounded-[3px] border border-zinc-300 px-3 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="xs:flex-1 flex h-[23px] flex-initial items-center justify-center gap-2.5 whitespace-nowrap rounded-[9px] border border-gray-700/25 px-3.5 py-4"
                  variant="outline"
                >
                  <div className="font-nunito text-base/[1] text-gray-600">
                    Monthly
                  </div>
                  <ChevronDownIcon className="relative h-[15px] w-[15px] text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>This Week</DropdownMenuItem>
                <DropdownMenuItem>Today</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex w-full flex-wrap gap-2">
            {dashboardSampleData.analytics.map((item, index) => (
              <div
                className="flex flex-1 flex-col items-center gap-[40px]"
                key={index}
              >
                <div className="mx-auto">
                  <RingProgress
                    colorProgress={item.progressColor}
                    value={item.value}
                  />
                </div>
                <div
                  className={`relative flex h-[58px] w-full flex-col items-center justify-between border-zinc-300 ${index !== dashboardSampleData.analytics.length - 1 ? "border-r" : ""}`}
                >
                  <div className="relative flex flex-col items-start">
                    <div className="font-roboto relative flex text-[26px] font-bold leading-[34px] text-gray-500">
                      <div>{item.title}</div>
                      <div className="flex items-center justify-start gap-1">
                        <ArrowUpIcon className="relative inline-flex h-[18.01px] w-[18.01px] flex-col items-start justify-start text-emerald-500" />
                        <div className="font-roboto text-right text-sm font-medium leading-snug text-emerald-500">
                          {item.increase}%
                        </div>
                      </div>
                    </div>
                    <div className="font-roboto text-sm font-normal leading-snug text-gray-500">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card shadow-soft dark:border-secondary/40 relative col-span-full flex flex-col gap-3 rounded-[32px] p-6 lg:col-span-5 dark:border">
          <div className="font-montserrat pr-[60px] text-lg font-semibold text-gray-900">
            Total Revenue
          </div>
          {/*  Filter */}
          <div className="absolute right-4 top-5 inline-flex h-6 w-[104px] items-center justify-center gap-2.5 rounded-[3px] border border-zinc-300 px-3 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="xs:flex-1 flex h-[23px] flex-initial items-center justify-center gap-2.5 whitespace-nowrap rounded-[9px] border border-gray-700/25 px-3.5 py-4"
                  variant="outline"
                >
                  <div className="font-nunito text-base/[1]  text-gray-600">
                    Monthly
                  </div>
                  <ChevronDownIcon className="relative h-[15px] w-[15px] text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>This Week</DropdownMenuItem>
                <DropdownMenuItem>Today</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="inline-flex h-10 w-full items-center justify-between">
            <div className="flex items-center justify-start gap-3">
              <img
                alt=""
                className="relative h-8 w-8"
                src="/assets/icons/icon-growth-indicator.svg"
              />
              <div className="font-roboto text-[26px] font-bold text-green-500">
                $313,233.35
              </div>
            </div>
            <div className="inline-flex w-[91px] flex-col items-end justify-start gap-2">
              <div className="font-open-sans text-right text-sm font-normal leading-none tracking-wide text-green-500">
                -1.9%
              </div>
              <div className="font-open-sans text-right text-sm font-normal leading-none tracking-wide text-stone-500">
                vs last week
              </div>
            </div>
          </div>

          <LineChart />
        </div>
      </div>

      {/*  Third Row Components */}
      <div className="bg-card shadow-soft dark:border-secondary/40 relative mt-8 rounded-[14px] p-1.5 dark:border">
        <Table />
      </div>
      {/*  Fourth Row Components */}
      <div className="mt-5 grid grid-cols-12 gap-[38px]">
        <div className="bg-card shadow-soft dark:border-secondary/40 relative col-span-full flex h-[364px] flex-col gap-5 rounded-[14px] p-5 lg:col-span-7 dark:border">
          <div className="font-montserrat pr-[60px] text-lg font-semibold text-gray-900">
            Lead Submissions
          </div>
          {/*Chart Filter by Date Range*/}

          <ToggleGroup
            className="absolute right-6 top-5 z-50 inline-flex w-auto flex-row items-center justify-start gap-[5px] rounded-[20px] border border-gray-100 bg-neutral-100 px-[5px] text-[#3A3F51]"
            defaultValue="1D"
            onValueChange={(value) => {
              if (value) setValue(value);
            }}
            type="single"
            value={value}
          >
            <ToggleGroupItem value="1D" variant="rounded">
              {" "}
              1D{" "}
            </ToggleGroupItem>
            <ToggleGroupItem value="1M" variant="rounded">
              {" "}
              1M{" "}
            </ToggleGroupItem>
            <ToggleGroupItem value="3M" variant="rounded">
              {" "}
              3M{" "}
            </ToggleGroupItem>
            <ToggleGroupItem value="1Y" variant="rounded">
              {" "}
              1Y{" "}
            </ToggleGroupItem>
          </ToggleGroup>
          <ColumnChart />
        </div>
        <div className="bg-card shadow-soft dark:border-secondary/40 relative col-span-full flex h-[364px] flex-col gap-5 rounded-[14px] p-5 lg:col-span-5 dark:border">
          <div className="font-montserrat pr-[60px] text-lg font-semibold text-gray-900">
            Customer Leads
          </div>
          {/*  Filter */}
          <div className="absolute right-4 top-5 ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="xs:flex-1 flex h-[18px] flex-initial items-center justify-center gap-2.5 whitespace-nowrap rounded-[9px] border border-gray-700/25 px-3.5 py-4">
                  <div className="font-nunito text-base/[1]  text-white">
                    Monthly
                  </div>
                  <ChevronDownIcon className="relative h-[15px] w-[15px] text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>This Week</DropdownMenuItem>
                <DropdownMenuItem>Today</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex h-full flex-col items-center justify-center gap-7">
            {customerLeads.map((lead, index) => {
              const Icon = lead.icon;
              return (
                <div
                  className="grid w-full grid-cols-12 items-center gap-2"
                  key={index}
                >
                  <div
                    className="col-span-1 flex h-[46px] w-[46px] items-center justify-center rounded-[9px] bg-opacity-10"
                    style={{ backgroundColor: `${colors[index]}1A` }}
                  >
                    <Icon className="text-[#2CD8CE]" size={24} />
                  </div>
                  <div className="col-span-3 text-center text-sm font-medium text-black">
                    {lead.lead}
                  </div>
                  <div className="col-span-7 inline-flex h-[7px] w-full flex-col items-start justify-start gap-2.5 bg-stone-300">
                    <div
                      className="h-full bg-teal-400"
                      style={{
                        width: `${lead.value}%`,
                        backgroundColor: colors[index],
                      }}
                    />
                  </div>
                  <div className="col-span-1 text-xs font-normal tracking-tight text-black">
                    {lead.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
