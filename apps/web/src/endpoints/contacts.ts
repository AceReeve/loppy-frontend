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
      inviteUser: builder.query<InviteUserResponse, null>({
        query: () => {
          return {
            url: `/Contacts/get-all`,
          };
        },
      }),
    }),
  });

export const { useInviteUserQuery } = userApi;
