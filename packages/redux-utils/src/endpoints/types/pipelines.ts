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
  description: string;
  category: string;
  itemOrder: number;
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

export interface CreateLeadPayload {
  description: string;
  category: string;
  itemOrder: number;
  amount: number;
  opportunity_id: string;
}
