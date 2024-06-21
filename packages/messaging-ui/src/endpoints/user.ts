import { baseApi } from "@repo/redux-utils/src/api.ts";
import { type InviteUserResponse } from "@/src/endpoints/types/user";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["user"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getInvitedUsers: builder.query<InviteUserResponse[], undefined>({
        query: () => {
          return {
            url: `/user/get-invited-user`,
          };
        },
        providesTags: ["user"],
      }),
    }),
  });

export const { useGetInvitedUsersQuery } = api;
