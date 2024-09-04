export interface CreateOrganizationResponse {
  organization_name: string;
  description: string;
}

export interface CreateOrganizationPayload {
  organization_name: string;
  description: string;
}

export interface GetOrganizationResponse {
  _id: string;
  organization_name: string;
  description: string;
  created_by: string;
  twilio_account_sid: string;
  twilio_chat_service_sid: string;
  twilio_api_key_sid: string;
  twilio_api_key_secret: string;
  twilio_auth_token: string;
  status: StatusEnum;
}
