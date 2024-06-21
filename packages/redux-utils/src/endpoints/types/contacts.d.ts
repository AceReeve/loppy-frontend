export interface GetContactsPayload {
  search_key?: string;
  status?: string;
  skip?: number;
  limit?: number;
  sort_dir?: string;
  tag: string[];
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
    tags: [
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

export interface Contact {
  _id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
}

export interface GetCreateContactResponse {
  user_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | number;
  source: string;
  lifetime_value: string | number;
  last_campaign_ran: string;
  last_interaction: string;
  tags: {
    tag_name: string;
  }[];
  _id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Tag {
  tag_name: string;
  _id: string;
}

export interface CreateContactPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number | string;
  source: string;
  lifetime_value: number | string;
  last_campaign_ran: string;
  last_interaction: string;
  tags: {
    tag_name: string;
  }[];
}

export interface ImportContactsResponse {
  message: string;
}
export interface ExportContactsResponse {
  message: string;
  fileName: string;
  url: string;
}

export interface ExportContactsPayload {
  dateFrom: Date;
  dateTo: Date;
  all: boolean;
}
