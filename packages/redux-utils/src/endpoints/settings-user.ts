import { baseApi } from "../api.ts";
import {
  GetCancelInvitedUserPayload,
  GetInviteUserResponse,
  GetRolesResponse,
  GetSendInviteUserPayload,
} from "./types/settings-user";
import { SearchParamsType } from "../index.tsx";
import {
  CreateContactPayload,
  GetCreateContactResponse,
} from "./types/contacts";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["settings-user"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRoles: builder.query<GetRolesResponse[], void>({
        query: () => "/role",
        providesTags: ["settings-user"],
      }),

      getInvitedUsers: builder.query<GetInviteUserResponse, void>({
        query: () => "user/get-invited-user",
        providesTags: ["settings-user"],
      }),

      cancelInvite: builder.mutation<string, GetCancelInvitedUserPayload>({
        query: (params) => {
          //const queryParams = new URLSearchParams(params).toString();
          return {
            url: `user/cancel-invited-user?${params}`,
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
