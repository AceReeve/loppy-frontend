export interface InviteUserPayload {
  email: string[];
}

export interface InviteUserResponse {
  emails:
    | {
        email: string;
        status: string;
      }[]
    | undefined;
  invited_by: string;
}

export interface UserProfile {
  user_id: string;
  first_name: string;
  last_name: string;
  status: string;
  _id: string;
  created_at: string;
  updated_at: string;
  address?: string;
  zipCode?: number;
  city?: string;
  state?: string;
  contact_no?: number;
  gender?: string;
  company?: string;
  birthday?: string;
  role?: string | null;
}

export interface SaveUserInfoPayload {
  first_name: string;
  last_name: string;
  contact_no: number;
  birthday: string;
  gender: string;
  company: string;
  address: string;
  zipCode: number;
  city: string;
  state: string;
}

export interface SaveUserInfoResponse {
  result: UserProfile;
}

export interface GetUserInfoResponse {
  userDetails: {
    _id: string;
    email: string;
    password: string;
    status: string;
    login_by: string;
    login_count: number;
    created_at: string;
    updated_at: string;
  };
  userInfo: UserProfile;
}
