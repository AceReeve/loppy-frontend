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

export interface InviteUser {}
