export interface InboxesResponse {
  data: {
    name: string;
    owner: string;
    members: string;
    phone_number: string;
    created_at: string;
  };
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
  purchased_number: string;
}

export interface SetActiveInboxResponse {
  inbox_id: string;
  activated_by: string;
  status: string;
  _id: string;
  created_at: string;
  updated_at: string;
}

export interface SetActiveInboxPayload {
  id: string;
}
