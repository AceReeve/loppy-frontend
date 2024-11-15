"use client";

import React, { useState } from "react";
import { ArrowCircleRight, Call, Global, Facebook } from "iconsax-react";
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
  type DateRange,
} from "@repo/ui/components/ui";
import { Mail } from "lucide-react";
import { endOfMonth, startOfMonth } from "date-fns";
import ColumnChart from "@/src/components/charts/column-chart";
import UnsoldTicketsTable from "@/src/components/table/unsold-tickets-table";
import DashboardMetrics from "@/src/app/dashboard/_components/dashboard/dashboard-metrics.tsx";
import { DashboardOverviewHeader } from "@/src/app/dashboard/_components/dashboard/sections/dashboard-overview/dashboard-overview-header.tsx";
import LatestBookingsSection from "@/src/app/dashboard/_components/dashboard/sections/latest-bookings/latest-bookings-section.tsx";
import UnsoldJobsSection from "@/src/app/dashboard/_components/dashboard/sections/unsold-jobs/unsold-jobs-section.tsx";

export default function Page() {
  const [leadSubmissionsValue, setLeadSubmissionsValue] = useState("1D");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  const customerLeads = [
    {
      key: "Google",
      icon: Global,
      lead: "Social Media",
      value: 50,
    },
    {
      key: "facebook",
      icon: Facebook,
      lead: "Facebook",
      value: 34,
    },
    {
      key: "email",
      icon: Mail,
      lead: "Email",
      value: 34,
    },
    {
      key: "call",
      icon: Call,
      lead: "Call",
      value: 18,
    },
  ];

  const colors = ["#4CAF50", "#2196F3", "#9C27B0"];
  // if (loading) return <p>Loading users...</p>;
  // if (error) return <p>{error?.message}</p>;

  return (
    <div className="p-6">
      {/* Dashboard Header */}
      <DashboardOverviewHeader setDateRange={setDateRange} />

      {/*  First Row Components */}
      <Card className="bg-card/60">
        <CardContent className="mt-3 grid grid-cols-2 gap-x-8 gap-y-8 px-6 pb-5 pt-12 md:grid-cols-3 xl:grid-cols-5">
          <DashboardMetrics dateRange={dateRange} />
        </CardContent>
      </Card>

      {/* Second Row Components */}
      <div className="mt-6 grid grid-cols-12 gap-[22px]">
        <LatestBookingsSection />
      </div>

      {/* Third Row Components */}
      <div className="mt-6 grid grid-cols-12 gap-[22px]">
        <UnsoldJobsSection />
      </div>

      {/* Fourth Row Components */}
      <div className="mt-6 grid grid-cols-12 gap-[22px]">
        <Card className="relative col-span-full">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Marketed Sold Leads</CardTitle>
            <button
              type="button"
              className="inline-flex items-center justify-start gap-[5px]"
            >
              <div className="font-poppins text-sm font-semibold text-gray-500">
                View All
              </div>
              <ArrowCircleRight className="relative size-[18px] stroke-current text-primary" />
            </button>
          </CardHeader>
          <CardContent className="flex gap-4">
            <UnsoldTicketsTable />
          </CardContent>
        </Card>
      </div>

      {/*Fifth Row Components*/}
      <div className="mt-6 grid grid-cols-12 gap-6">
        <Card className="relative col-span-full lg:col-span-7">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>All Leads</CardTitle>

            <div className="flex gap-4">
              <ToggleGroup
                className="inline-flex w-auto flex-row items-center justify-start gap-[5px] rounded-[20px] bg-gray-100 px-[5px] text-black"
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
          <CardContent className="relative">
            <ColumnChart />
          </CardContent>
        </Card>
        <Card className="relative col-span-full lg:col-span-5">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Customer Leads</CardTitle>

            <div className="flex gap-4">
              <Select defaultValue="week">
                <SelectTrigger className="w-[120px]">
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
                      <Icon
                        className="stroke-current text-[#2CD8CE]"
                        size={24}
                      />
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
