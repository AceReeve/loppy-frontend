import { baseApi } from "@repo/redux-utils/src/api.ts";
import {
  InviteUserPayload,
  InviteUserResponse,
} from "@/src/endpoints/types/user";

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
