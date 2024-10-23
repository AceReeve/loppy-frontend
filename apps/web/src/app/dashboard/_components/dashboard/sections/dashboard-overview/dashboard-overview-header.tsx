import * as React from "react";
import { Card, CardContent, DateRangePicker } from "@repo/ui/components/ui";
import { DashboardGoalProgress } from "@/src/app/dashboard/_components/dashboard/sections/dashboard-overview/dashboard-goal-progress.tsx";
import IconOverview from "@/src/app/dashboard/_components/icons/icon-overview.tsx";
import { useDashboardState } from "@/src/providers/dashboard-provider.tsx";

export function DashboardOverviewHeader() {
  const { session } = useDashboardState();

  return (
    <Card>
      <CardContent className="px-6 py-5">
        <div className="flex items-center justify-between gap-5 max-lg:flex-col max-lg:items-start">
          {/* Overview Section */}
          <section className="flex max-lg:w-full">
            <div className="my-auto flex items-start gap-3 self-stretch">
              <div className="mt-1.5 flex size-[52px] flex-col items-center justify-center rounded-2xl border border-solid border-gray-300 px-3.5">
                <IconOverview />
              </div>
              <div className="flex w-fit shrink-0 grow basis-0 flex-col">
                <h1 className="font-poppins text-3xl font-semibold leading-none text-gray-900">
                  Overview
                </h1>
                <p className="mt-2 font-poppins text-sm text-gray-500">
                  <span className="font-semibold">Hello </span>
                  <span className="font-semibold text-gray-800">
                    {session?.user.name ?? ""}
                  </span>
                  , welcome to the Service Hero Dashboard
                </p>
              </div>
            </div>
          </section>

          {/* Goal Section */}
          <section className="flex items-center justify-end gap-4">
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-col">
                <h2 className="text-base font-semibold tracking-wider text-black">
                  October&apos;s Goal Progress
                </h2>
                <DashboardGoalProgress completed={8} total={10} />
              </div>
              <div className="flex flex-auto gap-3">
                <div className="my-auto flex flex-col items-center gap-1 text-xs tracking-wider max-lg:flex-row">
                  <div className="min-h-[30px] rounded-2xl bg-primary px-5 py-2 font-bold text-white">
                    80 Leads
                  </div>
                  <div className="font-medium text-black">77% complete</div>
                </div>
              </div>
            </div>
            {/*  Date Filter */}
            <DateRangePicker className="h-12" />
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
