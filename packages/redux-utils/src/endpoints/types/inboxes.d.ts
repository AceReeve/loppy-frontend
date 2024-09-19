export interface InboxesResponse {
  data: {
    name: string;
    owner: string;
    members: string;
    phone_number: string;
    created_at: string;
  };
}

export interface GetAllInboxesPayload {
  organization_id: string;
}

export interface GetAllInboxesResponse {
  _id: string;
  inbox_name: string;
  description: string;
  organization_id: string;
  purchased_number: string;
  created_by: string;
  status: string;
  members: never[];
  created_at: string;
  updated_at: string;
}

export interface CreateInboxPayload {
  inbox_name: string;
  description: string;
  organization_id: string;
  purchased_number: string;
}
