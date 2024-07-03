import { baseApi } from "../api";
import { type SearchParamsType } from "../index.tsx";
import {
  CreateNewPasswordPayload,
  CreateResetPasswordPayload,
} from "./types/forgot-password.ts";

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
      setNewPassword: builder.mutation<undefined, CreateNewPasswordPayload>({
        query: (payload) => {
          return {
            url: `/user/reset-password`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["forgot-password"],
      }),
    }),
  });

export const { useSendResetPasswordMutation, useSetNewPasswordMutation } = api;
