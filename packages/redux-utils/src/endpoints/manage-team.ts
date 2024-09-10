import { baseApi } from "../api.ts";
import type {
  addRoleByTeamIdPayload,
  CreateTeamPayload,
  CreateTeamResponse,
  GetTeamMemberResponse,
  GetTeamsResponse,
  InviteTeamMembersPayload,
  RolesByTeamIdResponse,
} from "./types/manage-team.ts";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["manage-team"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTeams: builder.query<GetTeamsResponse[], undefined>({
        query: () => {
          return {
            url: `/manage-team/teams`,
          };
        },
        providesTags: ["manage-team"],
      }),
      createTeam: builder.mutation<CreateTeamResponse, CreateTeamPayload>({
        query: (payload) => {
          return {
            url: `/manage-team/team`,
            method: "POST",
            body: payload,
          };
        },
      }),
      // get team members
      getTeamMembers: builder.query<GetTeamMemberResponse, string>({
        query: (teamId: string) => {
          return {
            url: `/manage-team/team/${teamId}`,
          };
        },
      }),
      // invite team member
      inviteTeamMember: builder.mutation<undefined, InviteTeamMembersPayload>({
        query: (payload) => {
          return {
            url: `/manage-team/invite-member`,
            method: "POST",
            body: payload,
          };
        },
      }),

      // get all roles by team id
      getAllRolesByTeamId: builder.query<RolesByTeamIdResponse[], string>({
        query: (teamId: string) => {
          return {
            url: `/manage-team/role/all/${teamId}`,
          };
        },
      }),
      addRoleByTeamId: builder.mutation<undefined, addRoleByTeamIdPayload>({
        query: (payload) => {
          return {
            url: `/manage-team/custom-role`,
            method: "POST",
            body: payload,
          };
        },
      }),
    }),
  });

export const {
  useGetTeamsQuery,
  useCreateTeamMutation,
  useGetTeamMembersQuery,
  useInviteTeamMemberMutation,
  useGetAllRolesByTeamIdQuery,
  useAddRoleByTeamIdMutation,
} = api;
