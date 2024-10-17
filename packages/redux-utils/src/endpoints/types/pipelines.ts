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
  id: UniqueIdentifier;
  _id: string;
  master: string;
  description: string;
  category: string;
  status: string;
  amount: number;
  created_at?: string;
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
  master: string;
  description: string;
  category: string;
  status: string;
  amount: number;
  stage_id?: string;
}

export interface UpdateLeadPayload {
  leadId: string;
  payload: CreateLeadPayload;
}
