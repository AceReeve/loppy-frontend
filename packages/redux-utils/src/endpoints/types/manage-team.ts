export interface GetTeamsResponse {
  _id: string;
  team: string;
  description: string;
  // eslint-disable-next-line -- team members type is still unknown
  team_members: any[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTeamPayload {
  team: string;
  description: string;
}

export interface addRoleByTeamIdPayload {
  role: string;
  description: string;
  team: string;
}

export interface RolesByTeamIdResponse {
  _id: string;
  role: string;
  description: string;
  team: string;
}

export interface CreateTeamResponse {
  _id: string;
  team: string;
  description: string;
  // eslint-disable-next-line -- team members type is still unknown
  team_members: any[];
  created_by: string;
  created_at: string;
  updated_at: string;
}
