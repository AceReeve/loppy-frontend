import { baseApi } from "../api.ts";
import type { InviteUserPayload, InviteUserResponse } from "./types/user";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["user"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      inviteUser: builder.mutation<InviteUserResponse, InviteUserPayload>({
        query: (payload) => {
          return {
            url: `/user/invite-user`,
            method: "POST",
            body: payload,
          };
        },
      }),
      getInvitedUsers: builder.query<InviteUserResponse, undefined>({
        query: () => {
          return {
            url: `/Contacts/list`,
          };
        },
        providesTags: ["user"],
      }),
      validateInviteUser: builder.mutation<
        InviteUserResponse,
        InviteUserPayload
      >({
        query: (payload) => {
          return {
            url: `/user/validate-invite-user`,
            method: "POST",
            body: payload,
          };
        },
      }),
    }),
  });

export const { useInviteUserMutation, useValidateInviteUserMutation } = api;
