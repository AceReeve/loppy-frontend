import { type UniqueIdentifier } from "@dnd-kit/core";

export interface GetAllOpportunitiesResponse {
  id: UniqueIdentifier;
  _id: string;
  title: string;
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
  itemOrder: number;
  leads: Lead[];
}

export interface UpdateOpportunitiesPayload {
  _id: string;
  id: UniqueIdentifier;
  title: string;
  itemOrder: number;
  leads: string[];
  created_at: string;
  updated_at: string;
}

export interface UpdateOpportunityPayload {
  _id: string;
  title: string;
}

export interface CreateLeadPayload {
  master: string;
  description: string;
  category: string;
  status: string;
  amount: number;
  opportunity_id?: string;
}

export interface UpdateLeadPayload {
  leadId: string;
  payload: CreateLeadPayload;
}
