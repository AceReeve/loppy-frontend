import { baseApi } from "../api";
import {
  type CreateNewPasswordPayload,
  type CreateResetPasswordPayload,
  GetResetPasswordResponse,
} from "./types/forgot-password.ts";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["forgot-password"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      sendResetPassword: builder.mutation<
        GetResetPasswordResponse,
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
          const params = new URLSearchParams({
            token: payload.token,
          }).toString();
          return {
            url: `/user/reset-password?${params}`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["forgot-password"],
      }),
    }),
  });

export const { useSendResetPasswordMutation, useSetNewPasswordMutation } = api;
