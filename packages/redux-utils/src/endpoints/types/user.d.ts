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

export interface GetUserProfileResponse {
  userDetails: {
    _id: string;
    email: string;
    password: string;
    verified_email: boolean;
    status: string;
    login_by: string;
    login_count: number;
    role: UserRole;
    created_at: string;
    updated_at: string;
    reset_password_token: string;
  };
  userInfo?: {
    _id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    address: string;
    zipCode: number;
    city: string;
    state: string;
    contact_no: number;
    gender: "male" | "female";
    company: string;
    birthday: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
    profile?: Profile;
  };
}

export interface UserRole {
  _id: string;
  role_name: string;
  description: string;
  role_status: string;
  created_at: string;
  updated_at: string;
}

interface Profile {
  image_1: ProfileImage;
}

interface ProfileImage {
  path: string;
}

export interface UpdateUserInfoPayload {
  first_name: string;
  last_name: string;
  contact_no: number;
  birthday: string;
  gender: string;
  company?: string;
  address: string;
  zipCode: number;
  city: string;
  state: string;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
}
