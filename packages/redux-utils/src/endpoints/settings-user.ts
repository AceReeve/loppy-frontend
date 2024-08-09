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
    }),
  });

export const {
  useGetRolesQuery,
  useGetInvitedUsersQuery,
  useCancelInviteMutation,
  useSendInviteUserMutation,
} = api;
