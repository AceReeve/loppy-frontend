// Database Types
export interface Payment {
  id: number;
  date: string;
  total: string;
  active: boolean;
}

export interface Lead {
  id: number;
  status: LeadStatus;
  createdOn: string;
  active: boolean;
}

export type LeadStatus = "New" | "Converted" | "Dismissed" | "Accepted";

export interface CampaignCost {
  id: number;
  year: number;
  month: number;
  dailyCost: number;
  campaignId: number;
}

export interface Campaign {
  id: number;
  name: string;
  active: boolean;
  category: {
    id: number;
    name: string;
    active: boolean;
  };
}

export type JobStatus =
  | "Scheduled"
  | "Dispatched"
  | "InProgress"
  | "Hold"
  | "Completed"
  | "Canceled";

export interface Job {
  id: number;
  jobStatus: JobStatus;
  total: number;
  createdOn: string;
  completedOn: string;
}

export interface Membership {
  id: number;
  status: MembershipStatus;
  from: string;
  to: string;
  cancellationDate?: string;
  active: boolean;
}

export type MembershipStatus =
  | "Active"
  | "Suspended"
  | "Expired"
  | "Canceled"
  | "Deleted";

// Period Calculations
export interface DateRange {
  startDate: Date;
  endDate?: Date;
}

export interface PeriodMetrics {
  revenue: number;
  totalLeads: number;
  bookedLeads: number;
  marketingSpend: number;
  marketingROI: number;
  revenuePerTicket: number;
  clubMembersCount: number;
  unsoldJobsValue: number;
}
