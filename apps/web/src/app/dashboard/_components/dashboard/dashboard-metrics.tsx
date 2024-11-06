import React, { useEffect } from "react";
import { StatCard, type StatCardProps } from "@repo/ui/components/custom";
import { formatWithCurrencyShortened } from "@repo/hooks-and-utils/number-utils";
import { type DateRange } from "@repo/ui/components/ui";
import { useGetDashboardMetricsQuery } from "@repo/redux-utils/src/endpoints/service-titan.ts";

interface DashboardMetricsProps {
  dateRange: DateRange;
}

function DashboardMetrics({ dateRange }: DashboardMetricsProps) {
  const { data, isLoading, isFetching, refetch } = useGetDashboardMetricsQuery({
    startDate: dateRange.from?.toISOString() ?? "",
    endDate: dateRange.to?.toISOString() ?? "",
  });

  useEffect(() => {
    void refetch();
  }, [dateRange]);

  const {
    revenue,
    totalLeads,
    leadsBooked,
    marketingAdspend,
    marketingROI,
    revenuePerTicket,
    clubMembers,
    unsoldJobs,
  } = data?.metrics ?? {};

  const cards: StatCardProps[] = [
    {
      name: "Revenue",
      data: revenue,
      loading: isLoading || isFetching,
      icon: "/assets/icons/dashboard-stats-icons/icon-revenue.svg",
      formattedValue: (value) => formatWithCurrencyShortened(value),
    },
    {
      name: "Total Leads",
      data: totalLeads,
      loading: isLoading || isFetching,
      icon: "/assets/icons/dashboard-stats-icons/icon-total-leads.svg",
    },
    {
      name: "Leads Booked",
      data: leadsBooked,
      loading: isLoading || isFetching,
      icon: "/assets/icons/dashboard-stats-icons/icon-leads-booked.svg",
    },
    {
      name: "Marketing Adspend",
      data: marketingAdspend,
      loading: isLoading || isFetching,
      icon: "/assets/icons/dashboard-stats-icons/icon-marketing-adspend.svg",
      formattedValue: (value) => formatWithCurrencyShortened(value),
    },
    {
      name: "Marketing ROI",
      data: marketingROI,
      loading: isLoading || isFetching,
      icon: "/assets/icons/dashboard-stats-icons/icon-marketing-roi.svg",
      formattedValue: (value) => `${value.toString()}x`,
    },
    {
      name: "Revenue Per Ticket",
      data: revenuePerTicket,
      loading: isLoading || isFetching,
      formattedValue: (value) => formatWithCurrencyShortened(value),
    },
    {
      name: "Club Members",
      data: clubMembers,
      loading: isLoading || isFetching,
    },
    {
      name: "Messages Sent",
      data: undefined,
      loading: isLoading,
    },
    {
      name: "Unsold Jobs",
      data: unsoldJobs,
      loading: isLoading || isFetching,
      formattedValue: (value) => formatWithCurrencyShortened(value),
    },
    {
      name: "Revenue Goal",
      data: revenue,
      loading: isLoading || isFetching,
      formattedValue: (value) => formatWithCurrencyShortened(value),
      variant: "gradient-primary",
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <StatCard key={card.name} {...card} />
      ))}
    </>
  );
}

export default DashboardMetrics;
