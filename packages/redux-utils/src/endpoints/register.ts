import { baseApi } from "../api";
import { type CreateRegisterDetailsPayload } from "./types/register.ts";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["register"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      registerDetails: builder.mutation<
        undefined,
        CreateRegisterDetailsPayload
      >({
        query: (payload) => {
          return {
            url: `/user/user-info`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["register"],
      }),
    }),
  });

export const { useRegisterDetailsMutation } = api;
