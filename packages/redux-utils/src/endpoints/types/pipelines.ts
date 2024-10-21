import { type UniqueIdentifier } from "@dnd-kit/core";

export interface GetAllPipelinesResponse {
  _id: string;
  title: string;
  color: string;
  lead_value: number;
  opportunities: GetAllOpportunitiesResponse[];
}

export interface CreatePipelinePayload {
  title: string;
}

export interface ImportPipelinesResponse {
  message: string;
}

export interface GetAllOpportunitiesResponse {
  id: UniqueIdentifier;
  _id: string;
  title: string;
  color: string;
  lead_value: number;
  itemOrder: number;
  leads: Lead[];
}

export interface Lead {
  _id: string;
  id: UniqueIdentifier;
  owner_id?: Owner;
  stage_id?: string;
  pipeline_id?: string;
  primary_contact_name_id?: string;
  opportunity_name: string;
  opportunity_source: string;
  status: string;
  opportunity_value: number;
  primary_email?: string;
  primary_phone?: string;
  additional_contacts?: string;
  followers?: string;
  business_name?: string;
  tags?: string[];
  created_at?: string;
}

interface Owner {
  _id: string;
  email: string;
}

export interface CreateOpportunityPayload {
  title: string;
  color: string;
  itemOrder: number;
  leads: Lead[];
  lead_value: number;
  pipeline_id: string;
}

export interface UpdateOpportunities {
  _id: string;
  id: UniqueIdentifier;
  title: string;
  color: string;
  lead_value: number;
  itemOrder: number;
  leads: string[];
  created_at: string;
  updated_at: string;
}

export interface UpdateOpportunitiesPayload {
  pipeline_id: string;
  pipeline_opportunities: string[];
  updated_items: UpdateOpportunities[];
}

export interface UpdateOpportunityPayload {
  _id: string;
  title: string;
  color: string;
  lead_value: number;
}

export interface GetAllOpportunitiesPaginatedPayload {
  page: number;
  limit: number;
  search: string;
}

export interface GetAllOpportunitiesPaginatedResponse {
  records: UpdateOpportunities[];
  info: {
    totalRecords: number;
    totalPages: number;
  };
}

export interface CreateLeadPayload {
  owner_id: string;
  stage_id?: string;
  pipeline_id?: string;
  primary_contact_name_id: string;
  opportunity_name: string;
  opportunity_source: string;
  status: string;
  opportunity_value: number;
  primary_email: string;
  primary_phone: string;
  additional_contacts: string;
  followers: string;
  business_name: string;
  tags: string[];
}

export interface UpdateLeadPayload {
  leadId: string;
  payload: CreateLeadPayload;
}
