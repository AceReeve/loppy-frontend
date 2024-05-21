export interface InviteUserPayload {
  email: string[];
}

export interface InviteUserResponse {
  emails: {
    email: string;
    status: string;
  }[];
  invited_by: string;
}
