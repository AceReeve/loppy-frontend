import React from "react";
import { StatCard, type StatCardProps } from "@repo/ui/components/custom";
import {
  useGetLeadsQuery,
  useGetRevenueQuery,
} from "@repo/redux-utils/src/endpoints/dashboard.ts";
import { formatWithCurrencyShortened } from "@repo/hooks-and-utils/number-utils";
import {
  BriefcaseIcon,
  ChatBubbleLeftEllipsisIcon,
  CurrencyDollarIcon,
  PhoneArrowDownLeftIcon,
  PhoneArrowUpRightIcon,
} from "@heroicons/react/24/solid";

function StatCards() {
  const { data: revenueData, isLoading: revenueDataLoading } =
    useGetRevenueQuery(undefined);
  const { data: leadsData, isLoading: leadsDataLoading } =
    useGetLeadsQuery(undefined);

  const cards: StatCardProps[] = [
    {
      name: "Revenue",
      data: revenueData,
      loading: revenueDataLoading,
      icon: "/assets/icons/dashboard-stats-icons/icon-revenue.svg",
      formattedValue: (value) => formatWithCurrencyShortened(value),
    },
    {
      name: "Total Leads",
      data: leadsData,
      loading: leadsDataLoading,
      icon: "/assets/icons/dashboard-stats-icons/icon-total-leads.svg",
    },
    {
      name: "Leads Booked",
      data: leadsData,
      loading: leadsDataLoading,
      icon: "/assets/icons/dashboard-stats-icons/icon-leads-booked.svg",
    },
    {
      name: "Marketing Adspend",
      data: revenueData,
      loading: revenueDataLoading,
      icon: "/assets/icons/dashboard-stats-icons/icon-marketing-adspend.svg",
      formattedValue: (value) => formatWithCurrencyShortened(value),
    },
    {
      name: "Marketing ROI",
      data: leadsData,
      loading: leadsDataLoading,
      icon: "/assets/icons/dashboard-stats-icons/icon-marketing-roi.svg",
      formattedValue: (value) => `${value.toString()}x`,
    },
    {
      name: "Incoming Calls",
      data: leadsData,
      loading: leadsDataLoading,
      icon: <PhoneArrowDownLeftIcon className="size-5" />,
    },
    {
      name: "Outbound Calls",
      data: leadsData,
      loading: leadsDataLoading,
      icon: <PhoneArrowUpRightIcon className="size-5" />,
    },
    {
      name: "Messages Sent",
      data: leadsData,
      loading: leadsDataLoading,
      icon: <ChatBubbleLeftEllipsisIcon className="size-6" />,
    },
    {
      name: "Unsold Jobs",
      data: revenueData,
      loading: revenueDataLoading,
      icon: <BriefcaseIcon className="size-6" />,
      formattedValue: (value) => formatWithCurrencyShortened(value),
    },
    {
      name: "Revenue Goal",
      data: revenueData,
      loading: revenueDataLoading,
      icon: <CurrencyDollarIcon className="size-6" />,
      formattedValue: (value) => formatWithCurrencyShortened(value),
      variant: "gradient-primary",
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <StatCard key={card.name} {...card} />
      ))}
      {/*<StatCard*/}
      {/*  preText="$"*/}
      {/*  postText="k"*/}
      {/*  value="450"*/}
      {/*  name="Revenue Goal"*/}
      {/*  variant="gradient-primary"*/}
      {/*/>*/}
    </>
  );
}

export default StatCards;
