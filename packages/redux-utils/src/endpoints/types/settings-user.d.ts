export interface GetRolesResponse {
  role_status: string;
  _id: string;
  role_name: string;
  description: string;
}

export interface GetSendInviteUserPayload {
  users: {
    email: string;
    role: string;
  }[];
}

export interface GetCancelInvitedUserPayload {
  email: string;
}
export interface GetCanceledInvitedUserResponse {
  message: string;
}

export interface GetInviteUserResponse {
  _id: string;
  invited_by: string;
  created_at: string;
  updated_at: string;
  users: User[];
}

export interface Email {
  email: string;
  role: Role;
  status: string;
  _id: string;
}

export interface User {
  email: string;
  role: UserRole;
  status: string;
  _id: string;
}

export interface Role {
  _id: string;
  role_name: string;
  description: string;
}

export interface UserRole {
  role_status: string;
  _id: string;
  role_name: string;
  description: string;
}

export interface GetInviteUsersPayload {
  users: [
    {
      email: string;
      role: string;
    },
  ];
}
