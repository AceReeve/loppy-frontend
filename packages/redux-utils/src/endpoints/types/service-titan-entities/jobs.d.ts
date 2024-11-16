interface CustomField {
  typeId: number;
  name: string;
  value: string;
}

interface JobGeneratedLeadSource {
  jobId: number;
  employeeId: number;
}

interface ExternalData {
  key: string;
  value: string;
}

export interface Job {
  id: number;
  jobNumber: string;
  projectId: number;
  customerId: number;
  locationId: number;
  jobStatus: string;
  completedOn: string;
  businessUnitId: number;
  jobTypeId: number;
  priority: string;
  campaignId: number;
  summary: string;
  customFields: CustomField[];
  appointmentCount: number;
  firstAppointmentId: number;
  lastAppointmentId: number;
  recallForId: number;
  warrantyId: number;
  jobGeneratedLeadSource: JobGeneratedLeadSource;
  noCharge: boolean;
  notificationsEnabled: boolean;
  createdOn: string;
  createdById: number;
  modifiedOn: string;
  tagTypeIds: number[];
  leadCallId: number;
  bookingId: number;
  soldById: number;
  externalData: ExternalData[];
  customerPo: string;
  invoiceId: number;
  membershipId: number;
  total: number;
  active: boolean;

  //   Added props
  name: string;
  customerName: string;
}

export interface JobType {
  id: number;
  name: string;
  businessUnitIds: number[];
  skills: string[];
  tagTypeIds: number[];
  priority: string;
  duration: number;
  soldThreshold: number;
  class: string;
  summary: string;
  noCharge: boolean;
  enforceRecurringServiceEventSelection: boolean;
  invoiceSignaturesRequired: boolean;
  modifiedOn: string;
  createdOn: string;
  externalData: ExternalData[];
  active: boolean;
}
