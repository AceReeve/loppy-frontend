export interface GetRolesResponse {
  data: {
    role: string;
    members: number;
  };
}

export interface GetTeamMembersResponse {
  data: {
    first_name: string;
    last_name: string;
    role: string;
    email: string;
  };
}
