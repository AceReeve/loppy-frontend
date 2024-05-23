import { baseApi } from "@repo/redux-utils/src/api.ts";
import {
  InviteUserPayload,
  InviteUserResponse,
} from "@/src/endpoints/types/user";

const userApi = baseApi
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
    }),
  });

export const { useInviteUserMutation } = userApi;
