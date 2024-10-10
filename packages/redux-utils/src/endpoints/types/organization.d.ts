import { type GetSendInviteUserPayload } from "./settings-user";

export interface CreateOrganizationResponse {
  organization_name: string;
  description: string;
}

export interface CreateOrganizationPayload {
  organization_name: string;
  description: string;
  users?: GetSendInviteUserPayload["users"];
}

export interface GetOrganizationResponse {
  _id: string;
  organization_name: string;
  description: string;
  created_by: string;
  status: string;
  twilio_number?: string;
}

export interface SetActiveOrganizationResponse {
  organization_id: string;
  activated_by: string;
  status: string;
  _id: string;
  created_at: string;
  updated_at: string;
}

export interface SetActiveOrganizationPayload {
  id: string;
}
