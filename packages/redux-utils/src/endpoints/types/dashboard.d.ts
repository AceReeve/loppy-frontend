export interface StatCardResponse {
  range: "month" | "year" | "week" | "day";
  currentValue: number;
  previousValue: number;
}

// Invoice Response (This is temporary)

export interface InvoicePaymentsResponse {
  page: number;
  pageSize: number;
  hasMore: boolean;
  totalCount: number | null;
  data: Invoice[];
}

interface Invoice {
  id: number;
  syncStatus: string;
  summary: string;
  referenceNumber: string;
  invoiceDate: string;
  dueDate: string;
  subTotal: number;
  salesTax: number;
  salesTaxCode: string | null;
  total: string;
  balance: string;
  invoiceType: string | null;
  customer: Customer;
  customerAddress: Address;
  location: Location;
  locationAddress: Address;
  businessUnit: BusinessUnit;
  termName: string;
  createdBy: string | null;
  batch: string | null;
  depositedOn: string | null;
  createdOn: string;
  modifiedOn: string;
  adjustmentToId: number | null;
  job: Job;
  projectId: number | null;
  royalty: Royalty;
  employeeInfo: string | null;
  commissionEligibilityDate: string | null;
  sentStatus: string;
  reviewStatus: string;
  assignedTo: string | null;
  items: string | null;
  customFields: string | null;
}

interface Customer {
  id: number;
  name: string;
}

interface Address {
  street: string;
  unit: string | null;
  city: string;
  state: string;
  zip: string;
  country: string | null;
}

interface Location {
  id: number;
  name: string;
}

interface BusinessUnit {
  id: number;
  name: string;
}

interface Job {
  id: number;
  number: string;
  type: string;
}

interface Royalty {
  status: string;
  date: string | null;
  sentOn: string | null;
  memo: string | null;
}

// Leads Response (This is temporary)

interface LeadsResponse {
  page: number;
  pageSize: number;
  hasMore: boolean;
  totalCount: number | null;
  data: LeadItem[];
}

interface LeadItem {
  id: number;
  name: string;
  isLead: boolean;
  active: boolean;
  createdOn: string;
  modifiedOn: string;
}
