"use client";

import React, { useState } from "react";
import { ArrowCircleRight, Call, Global, Profile2User } from "iconsax-react";
import {
  ToggleGroup,
  ToggleGroupItem,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui/components/ui";
import { Mail } from "lucide-react";
import { StatCard } from "@repo/ui/components/custom";
import ColumnChart from "@/src/components/charts/column-chart";
import LineChart from "@/src/components/charts/line-chart";
import { useDashboardState } from "@/src/providers/dashboard-provider.tsx";
import FunnelChart from "@/src/components/charts/funnel-chart";
import UnsoldTicketsTable from "@/src/components/table/unsold-tickets-table";

export default function Page() {
  const [leadSubmissionsValue, setLeadSubmissionsValue] = useState("1D");
  const { session } = useDashboardState();

  const customerLeads = [
    {
      key: "social_media",
      icon: Global,
      lead: "Social Media",
      value: 50.342,
    },
    {
      key: "email",
      icon: Mail,
      lead: "Email",
      value: 34.342,
    },
    {
      key: "call",
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
          <div className="inline-flex h-[68px] w-[171px] flex-col items-start justify-center">
            <div className="font-poppins text-xl font-normal text-slate-500">
              Service Hero
            </div>
            <div className="w-[171px] font-poppins text-4xl font-semibold text-black">
              Overview
            </div>
          </div>
          <div className="h-[76px] w-[462px] font-['Poppins'] text-sm font-semibold leading-[30px]">
            <span className="font-poppins font-semibold text-slate-500">
              Hello{" "}
            </span>
            <span className="font-poppins font-semibold text-orange-500/70">
              {session?.user.name ?? ""}
            </span>
            <span className="font-poppins font-normal text-slate-500">
              , welcome to the Service Hero Dashboard, we hope you always see
              updated business statistics for yourself.{" "}
            </span>
          </div>
        </div>
        <div className="flex gap-4 self-end lg:gap-7">
          <Select defaultValue="month">
            <SelectTrigger className="w-[138px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all_sources">
            <SelectTrigger className="w-[138px]" variant="outline">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_sources">All Sources</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
              <SelectItem value="option4">Option 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/*  First Row Components */}
      <div className="mt-20 grid grid-cols-2 gap-[38px] md:grid-cols-3 xl:grid-cols-5">
        {Array.from(
          {
            length: 5,
          },
          (_, index) => index + 1,
        ).map((i) => (
          <StatCard
            key={i}
            value="288"
            name="Total Customers"
            preText="$"
            postText="k"
            icon={<Profile2User className="size-full" />}
          />
        ))}
        {Array.from(
          {
            length: 4,
          },
          (_, index) => index + 1,
        ).map((i) => (
          <StatCard key={i} value="450" name="Total Customers" />
        ))}
        <StatCard
          preText="$"
          postText="k"
          value="450"
          name="Revenue Goal"
          variant="gradient-primary"
        />
      </div>
      {/* Second Row Components */}
      <div className="mt-11 grid grid-cols-12 gap-[22px]">
        <Card className="relative col-span-full">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Priority Customers</CardTitle>

            <div className="flex gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[100px]" variant="outline">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">View All</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                  <SelectItem value="option4">Option 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="custom-scrollbar-neutral flex gap-6 overflow-auto scrollbar-thin">
            {Array.from({ length: 6 }, (_, i) => i + 1).map((item) => (
              <div
                key={item}
                className="inline-flex items-center justify-start gap-[15px] rounded-lg border border-gray-300 py-2 pl-3 pr-[30px] font-inter"
              >
                <div className="flex h-[49px] w-[49px] items-center justify-center overflow-hidden rounded-full">
                  <img
                    className="size-full object-cover"
                    src="https://via.placeholder.com/98x94"
                    alt=""
                  />
                </div>
                <div className="inline-flex flex-col items-start justify-start">
                  <div className="whitespace-nowrap text-sm font-medium text-gray-900">
                    Joseph Aaron
                  </div>
                  <div className="text-xs font-normal text-gray-900/50">
                    Canada
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Third Row Components */}
      <div className="mt-11 grid grid-cols-12 gap-[22px]">
        <Card className="relative col-span-full xl:col-span-4">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Salesman Leaderboard</CardTitle>
            <button
              type="button"
              className="inline-flex items-center justify-start gap-[5px]"
            >
              <div className="font-poppins text-sm font-semibold text-gray-500">
                View All
              </div>
              <ArrowCircleRight className="relative size-[18px] text-primary" />
            </button>
          </CardHeader>
          <CardContent className="flex gap-4">
            <img
              className="relative h-[248px] w-[168px] rounded-[15px] object-cover"
              src="/assets/images/salesman.png"
              alt=""
            />
            <div>
              <div className="font-poppins text-base font-medium text-black">
                John Maddux
              </div>
              <div className="mt-3 flex flex-col gap-1.5">
                {Array.from({ length: 5 }, (_, i) => i + 1).map((item) => (
                  <div className="flex gap-2" key={item}>
                    {item === 1 ? (
                      <>
                        <div className="h-[31px] w-[106px] bg-black text-center font-inter text-lg font-bold text-white">
                          $133,131
                        </div>
                        <div className="font-poppins text-xl font-bold uppercase text-primary">
                          Sales
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-[31px] w-[106px] bg-gray-300/70 text-center font-inter text-lg font-bold text-black">
                          51.9%
                        </div>
                        <div className="font-poppins text-base font-normal capitalize text-gray-900">
                          Average
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative col-span-full xl:col-span-8">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>
              Unsold Tickets{" "}
              <span className="text-sm font-semibold text-gray-800/60">
                (Rehash Department)
              </span>
            </CardTitle>

            <button
              type="button"
              className="inline-flex items-center justify-start gap-[5px]"
            >
              <div className="font-poppins text-sm font-semibold text-gray-500">
                View All
              </div>
              <ArrowCircleRight className="relative size-[18px] text-primary" />
            </button>
          </CardHeader>
          <CardContent className="flex gap-4">
            <UnsoldTicketsTable />
          </CardContent>
        </Card>
      </div>

      {/* Fourth Row Components */}
      <div className="mt-11 grid grid-cols-12 gap-6">
        <Card className="relative col-span-full lg:col-span-7">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Sales Funnel Analytics</CardTitle>

            <div className="flex gap-4">
              <Select defaultValue="month">
                <SelectTrigger className="w-[100px]" variant="outline">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Daily</SelectItem>
                  <SelectItem value="week">Weekly</SelectItem>
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="year">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="google">
                <SelectTrigger className="w-[124px]" variant="outline">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google PPC</SelectItem>
                  <SelectItem value="fb">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="insta">Instagram</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <FunnelChart />
          </CardContent>
        </Card>
        <Card className="relative col-span-full lg:col-span-5">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Total Revenue</CardTitle>

            <div className="flex gap-4">
              <Select defaultValue="month">
                <SelectTrigger className="w-[100px]" variant="outline">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Daily</SelectItem>
                  <SelectItem value="week">Weekly</SelectItem>
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="year">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="inline-flex h-10 w-full items-center justify-between font-inter">
              <div className="flex items-center justify-start gap-3">
                <img
                  alt=""
                  className="relative h-8 w-8"
                  src="/assets/icons/icon-growth-indicator.svg"
                />
                <div className="text-[26px] font-bold text-black">
                  $313,233.35
                </div>
              </div>
              <div className="inline-flex w-[91px] flex-col items-end justify-start gap-2">
                <div className="text-right text-sm font-normal leading-none tracking-wide text-red-500">
                  -1.9%
                </div>
                <div className="text-right text-sm font-normal leading-none tracking-wide text-stone-500">
                  vs last week
                </div>
              </div>
            </div>
            <LineChart />
          </CardContent>
        </Card>
      </div>
      {/*Fifth Row Components*/}
      <div className="mt-11 grid grid-cols-12 gap-6">
        <Card className="relative col-span-full lg:col-span-7">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Lead Submissions</CardTitle>

            <div className="flex gap-4">
              <ToggleGroup
                className="inline-flex w-auto flex-row items-center justify-start gap-[5px] rounded-[20px] border border-gray-100 bg-neutral-100 px-[5px] text-[#3A3F51]"
                defaultValue="1D"
                onValueChange={(value) => {
                  if (value) setLeadSubmissionsValue(value);
                }}
                type="single"
                value={leadSubmissionsValue}
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
            </div>
          </CardHeader>
          <CardContent>
            <ColumnChart />
          </CardContent>
        </Card>
        <Card className="relative col-span-full lg:col-span-5">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Lead Submissions</CardTitle>

            <div className="flex gap-4">
              <Select defaultValue="week">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex h-full flex-col items-center justify-center gap-7">
              {customerLeads.map((lead, index) => {
                const Icon = lead.icon;
                return (
                  <div
                    className="grid w-full grid-cols-12 items-center gap-2"
                    key={lead.key}
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
                          width: `${lead.value.toString()}%`,
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
