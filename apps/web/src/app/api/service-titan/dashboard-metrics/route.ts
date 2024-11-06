import { NextResponse } from "next/server";
import { calculatePercentage } from "@repo/hooks-and-utils/number-utils";
import { createPeriod } from "@repo/hooks-and-utils/date-period-utils";
import { type GetDashboardMetricsResponse } from "@repo/redux-utils/src/endpoints/types/service-titan";
import {
  type DateRange,
  type PeriodMetrics,
  type Payment,
  type Lead,
  type CampaignCost,
  type Membership,
  type Job,
} from "@/src/types/dashboard-metrics";
import { type Database, db as database } from "@/src/lib/db.ts";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "startDate and endDate are required query parameters" },
        { status: 400 },
      );
    }

    const currentPeriod: DateRange = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };
    // Export constants
    const previousPeriod = createPeriod(currentPeriod).previousPeriod;

    const [currentMetrics, previousMetrics] = await Promise.all([
      calculatePeriodMetrics(database, currentPeriod),
      calculatePeriodMetrics(database, previousPeriod),
    ]);

    const metrics = calculateGrowthRates(
      currentMetrics,
      previousMetrics,
      currentPeriod,
    );

    return NextResponse.json({ metrics });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dashboard metrics" },
      { status: 500 },
    );
  }
}

async function calculatePeriodMetrics(
  db: Database,
  period: DateRange,
): Promise<PeriodMetrics> {
  const { startDate, endDate } = period;

  // Payments (Revenue)
  const payments = await db.find<Payment>("synced-payments", {
    date: {
      $gte: startDate.toISOString(),
      $lte: endDate?.toISOString() ?? startDate.toISOString(),
    },
    active: true,
  });

  const revenue = payments.reduce(
    (sum, payment) => sum + parseFloat(payment.total),
    0,
  );

  // Leads
  const leads = await db.find<Lead>("synced-leads", {
    createdOn: {
      $gte: startDate.toISOString(),
      $lte: endDate?.toISOString() ?? startDate.toISOString(),
    },
    active: true,
  });

  const totalLeads = leads.length;

  const bookedLeads = leads.filter((lead) =>
    ["Converted", "Accepted"].includes(lead.status),
  ).length;

  // Marketing Spend
  const campaignCosts = await db.find<CampaignCost>("synced-campaign-costs", {
    year: startDate.getFullYear(),
    month: startDate.getMonth() + 1,
  });

  const marketingSpend = campaignCosts.reduce(
    (sum, cost) => sum + cost.dailyCost,
    0,
  );

  /* Commented code for future active campaign filtering
    const activeCampaigns = await db.collection<Campaign>('campaigns').find({
      active: true
    }).toArray()
    const activeCampaignIds = activeCampaigns.map(campaign => campaign.id)
    const marketingSpend = campaignCosts
      .filter(cost => activeCampaignIds.includes(cost.campaignId))
      .reduce((sum, cost) => sum + cost.dailyCost, 0)
    */

  // Club Members
  const clubMembers = await db.find<Membership>("synced-memberships", {
    status: "Active",
    from: { $lte: endDate?.toISOString() ?? startDate.toISOString() },
    $or: [{ to: { $gte: startDate.toISOString() } }, { to: null }],
  });

  // Unsold Jobs
  const unsoldJobs = await db.find<Job>("synced-jobs", {
    jobStatus: { $nin: ["Completed", "Canceled"] },
    $or: [
      {
        createdOn: { $lte: endDate?.toISOString() ?? startDate.toISOString() },
      },
    ],
    total: { $ne: 0 },
  });

  const unsoldJobsValue = unsoldJobs.reduce((sum, job) => sum + job.total, 0);

  // Derived calculations
  const revenuePerTicket = bookedLeads > 0 ? revenue / bookedLeads : 0;
  const marketingROI =
    marketingSpend > 0 ? (revenue - marketingSpend) / marketingSpend : 0;

  return {
    revenue,
    totalLeads,
    bookedLeads,
    marketingSpend,
    marketingROI,
    revenuePerTicket,
    clubMembersCount: clubMembers.length,
    unsoldJobsValue,
  };
}

function calculateGrowthRates(
  current: PeriodMetrics,
  previous: PeriodMetrics,
  currentPeriod: DateRange,
): GetDashboardMetricsResponse["metrics"] {
  const period = createPeriod(currentPeriod);
  const { previousPeriodText } = period;
  return {
    revenue: {
      value: current.revenue,
      growth: calculatePercentage(current.revenue, previous.revenue),
      previousPeriodText,
    },
    totalLeads: {
      value: current.totalLeads,
      growth: calculatePercentage(current.totalLeads, previous.totalLeads),
      previousPeriodText,
    },
    leadsBooked: {
      value: current.bookedLeads,
      growth: calculatePercentage(current.bookedLeads, previous.bookedLeads),
      previousPeriodText,
    },
    marketingAdspend: {
      value: current.marketingSpend,
      growth: calculatePercentage(
        current.marketingSpend,
        previous.marketingSpend,
      ),
      previousPeriodText,
    },
    marketingROI: {
      value: current.marketingROI,
      growth: calculatePercentage(current.marketingROI, previous.marketingROI),
      previousPeriodText,
    },
    revenuePerTicket: {
      value: current.revenuePerTicket,
      growth: calculatePercentage(
        current.revenuePerTicket,
        previous.revenuePerTicket,
      ),
      previousPeriodText,
    },
    clubMembers: {
      value: current.clubMembersCount,
      growth: calculatePercentage(
        current.clubMembersCount,
        previous.clubMembersCount,
      ),
      previousPeriodText,
    },
    unsoldJobs: {
      value: current.unsoldJobsValue,
      growth: calculatePercentage(
        current.unsoldJobsValue,
        previous.unsoldJobsValue,
      ),
      previousPeriodText,
    },
  };
}
