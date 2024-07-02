import { baseApi } from "../api";
import { type SearchParamsType } from "../index.tsx";
import { CreateResetPasswordPayload } from "./types/forgot-password.ts";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["forgot-password"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      sendResetPassword: builder.mutation<
        undefined,
        CreateResetPasswordPayload
      >({
        query: (payload) => {
          const params = new URLSearchParams({
            email: payload.email,
          }).toString();
          return {
            url: `/user/forgot-password?${params}`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["forgot-password"],
      }),
    }),
  });

export const { useSendResetPasswordMutation } = api;
