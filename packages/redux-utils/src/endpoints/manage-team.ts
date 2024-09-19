import { baseApi } from "../api.ts";
import type {
  addRoleByTeamIdPayload,
  CreateTeamPayload,
  CreateTeamResponse,
  DeleteTeamMemberPayload,
  GetTeamMemberResponse,
  GetTeamsResponse,
  InviteTeamMembersPayload,
  RolesByTeamIdResponse,
  UpdateTeamPayload,
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
      updateTeam: builder.mutation<undefined, UpdateTeamPayload>({
        query: ({ teamId, payload }) => {
          return {
            url: `/manage-team/team/${teamId}`,
            method: "PUT",
            body: payload,
          };
        },
      }),
      deleteTeam: builder.mutation<undefined, string>({
        query: (teamId: string) => {
          return {
            url: `/manage-team/team/${teamId}`,
            method: "DELETE",
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
      // delete team member
      deleteTeamMember: builder.mutation<undefined, DeleteTeamMemberPayload>({
        query: ({ teamId, memberId }) => {
          return {
            url: `/manage-team/team-member/${teamId}/${memberId}`,
            method: "DELETE",
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
      // delete role
      deleteRoleById: builder.mutation<undefined, string>({
        query: (roleId: string) => {
          return {
            url: `/manage-team/custom-role/${roleId}`,
            method: "DELETE",
          };
        },
      }),
      uploadTeamProfile: builder.mutation<
        undefined,
        { teamId: string; payload: FormData }
      >({
        query: ({ teamId, payload }) => {
          return {
            url: `/manage-team/upload-profile?id=${teamId}`,
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
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useGetTeamMembersQuery,
  useInviteTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useGetAllRolesByTeamIdQuery,
  useAddRoleByTeamIdMutation,
  useDeleteRoleByIdMutation,
  useUploadTeamProfileMutation,
} = api;
