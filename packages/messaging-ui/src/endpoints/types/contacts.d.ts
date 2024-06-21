export interface GetContactsPayload {
  search_key?: string;
  status?: string;
  skip?: number;
  limit?: number;
  sort_dir?: string;
}

export interface GetContactsResponse {
  data: {
    _id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: number;
    source: string;
    lifetime_value: number;
    last_campaign_ran: string;
    last_interaction: string;
    tag: [
      {
        tag_name: string;
        _id: string;
      },
    ];
    created_at: string;
    updated_at: string;
  }[];
  meta: {
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
}

export type GetContactsListResponse = Record<string, string>;

export interface Contacts {
  _id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
}

export interface APIContact {
  _id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  source: string;
  lifetime_value: number;
  last_campaign_ran: string;
  last_interaction: string;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

export interface Tag {
  tag_name: string;
  _id: string;
}

export interface CreateContactPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
}

export interface ImportContactsResponse {
  message: string;
}
