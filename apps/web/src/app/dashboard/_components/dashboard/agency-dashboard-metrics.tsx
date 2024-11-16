import React, { useEffect } from "react";
import {
  ProgressStatCard,
  StatCard,
  type StatCardProps,
} from "@repo/ui/components/custom";
import { formatWithCurrencyShortened } from "@repo/hooks-and-utils/number-utils";
import { type DateRange } from "@repo/ui/components/ui";
import { useGetDashboardMetricsQuery } from "@repo/redux-utils/src/endpoints/service-titan.ts";
import { cn } from "@repo/ui/utils";
import { UserEdit } from "iconsax-react";
import AgencyRankStatCard from "@/src/app/dashboard/_components/dashboard/stat-cards/agency-rank-stat-card.tsx";

interface AgencyDashboardMetricsProps {
  dateRange: DateRange;
}

type StatCardWithComponentProps = StatCardProps & {
  component?: React.FC<StatCardProps>;
};

function AgencyDashboardMetrics({ dateRange }: AgencyDashboardMetricsProps) {
  const { data, isLoading, isFetching, refetch } = useGetDashboardMetricsQuery({
    startDate: dateRange.from?.toISOString() ?? "",
    endDate: dateRange.to?.toISOString() ?? "",
  });

  useEffect(() => {
    void refetch();
  }, [dateRange]);

  const { revenue, totalLeads, leadsBooked, clubMembers } = data?.metrics ?? {};

  const cards: StatCardWithComponentProps[] = [
    {
      name: "Monthly Recurring",
      data: revenue,
      loading: isLoading || isFetching,
      formattedValue: (value) => formatWithCurrencyShortened(value),
    },
    {
      name: "Agency Points",
      data: totalLeads,
      loading: isLoading || isFetching,
    },
    {
      name: "Trophies Earned",
      data: leadsBooked,
      loading: isLoading || isFetching,
      icon: "/assets/icons/dashboard-stats-icons/icon-trophy.png",
      iconWrapperClass: "bg-white shadow-soft p-0",
      iconClass: "size-8",
    },
    {
      name: "Profile Visits",
      data: leadsBooked,
      loading: isLoading || isFetching,
      className: "max-w-[120px]",
      component: ProgressStatCard,
      icon: <UserEdit className="size-7" />,
    },
    {
      name: "Agency Rank",
      data: clubMembers,
      loading: isLoading || isFetching,
      formattedValue: (value) => `#${value.toString()}`,
      icon: "/assets/icons/dashboard-stats-icons/icon-trophy.png",
      iconClass: "size-12",
      variant: "gradient-primary",
      className: "rounded-[35px]",
      component: AgencyRankStatCard,
    },
  ];

  return (
    <>
      {cards.map((card) => {
        const Component = card.component ?? StatCard;
        return (
          <Component
            key={card.name}
            {...card}
            className={cn("flex-1", card.className)}
          />
        );
      })}
    </>
  );
}

export default AgencyDashboardMetrics;
