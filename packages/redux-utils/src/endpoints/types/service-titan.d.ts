export interface DashboardMetric {
  value: number;
  growth: number;
  previousPeriodText: string;
}

export interface GetDashboardMetricsResponse {
  metrics: {
    revenue: DashboardMetric;
    totalLeads: DashboardMetric;
    leadsBooked: DashboardMetric;
    marketingAdspend: DashboardMetric;
    marketingROI: DashboardMetric;
    revenuePerTicket: DashboardMetric;
    clubMembers: DashboardMetric;
    unsoldJobs: DashboardMetric;
  };
}

export interface GetDashboardMetricsPayload {
  startDate: string;
  endDate: string;
}

export interface SyncStatus {
  lastSyncedAt: Date;
  lastContinuationToken: string;
  entityType: "payments" | "leads" | "bookings";
  success: boolean;
  record_count: number;
  user_id: string;
  message?: string;
}

export interface GetSyncStatusResponse {
  success: boolean;
  data: Record<string, SyncStatus | undefined>;
  lastSync: string;
}

export interface SyncServiceTitanResponse {
  success: boolean;
  count: number;
  message: string;
}

export interface SyncServiceTitanPayload {
  entity: string;
  includeRecentChanges?: boolean;
}

export interface CredentialsResponse {
  _id: string;
  user_id: string;
  appKey: string;
  clientId: string;
  clientSecret: string;
  tenantId: string;
}

export interface SetCredentialsPayload {
  clientId: string;
  clientSecret: string;
  appKey: string;
  tenantId: string;
}

export interface VerifyCredentialsPayload {
  clientId: string;
  clientSecret: string;
  appKey: string;
  tenantId: string;
}
