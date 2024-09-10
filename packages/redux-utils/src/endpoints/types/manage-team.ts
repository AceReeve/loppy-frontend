export interface GetTeamsResponse {
  _id: string;
  team: string;
  description: string;
  team_members: TeamMembers[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTeamPayload {
  team: string;
  description: string;
}

export interface GetTeamMemberResponse {
  _id: string;
  team: string;
  description: string;
  role: string;
  team_members: TeamMembers[];
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
  team_members: TeamMembers[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface User {
  email: string;
  role: string;
  team: string;
}

export interface InviteTeamMembersPayload {
  users: User[];
}

interface TeamMembers {
  _id: string;
  email: string;
  role_name: string;
  status: string;
}
