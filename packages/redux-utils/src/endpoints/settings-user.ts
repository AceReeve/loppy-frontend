import { baseApi } from "../api.ts";
import {
  type GetCancelInvitedUserPayload,
  type GetInviteUserResponse,
  type GetRolesResponse,
  type GetSendInviteUserPayload,
} from "./types/settings-user";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["settings-user"],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
      getRoles: builder.query<GetRolesResponse[], undefined>({
        query: () => "/role",
        providesTags: ["settings-user"],
      }),

      getInvitedUsers: builder.query<GetInviteUserResponse, undefined>({
        query: () => "user/get-invited-user",
        providesTags: ["settings-user"],
      }),

      cancelInvite: builder.mutation<string, GetCancelInvitedUserPayload>({
        query: (payload) => {
          const params = new URLSearchParams({
            email: payload.email,
          }).toString();
          return {
            url: `user/cancel-invited-user?${params}`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["settings-user"],
      }),

      sendInviteUser: builder.mutation<
        GetInviteUserResponse,
        GetSendInviteUserPayload
      >({
        query: (payload) => {
          return {
            url: `/user/invite-user`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["settings-user"],
      }),
      getMembers: builder.query<GetInviteUserResponse, undefined>({
        query: () => {
          return {
            url: `/user/members`,
          };
        },
        providesTags: ["settings-user"],
      }),
    }),
  });

export const {
  useGetRolesQuery,
  useGetInvitedUsersQuery,
  useGetMembersQuery,
  useCancelInviteMutation,
  useSendInviteUserMutation,
} = api;
