import { baseApi } from "../api.ts";
import type {
  ChangePasswordPayload,
  GetUserProfileResponse,
  InviteUserPayload,
  InviteUserResponse,
  UpdateUserInfoPayload,
} from "./types/user";

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
      getInvitedUsers: builder.query<InviteUserResponse[], undefined>({
        query: () => {
          return {
            url: `/user/get-invited-user`,
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

      // personal settings
      getUserProfile: builder.query<GetUserProfileResponse, undefined>({
        query: () => {
          return {
            url: `/user/profile`,
          };
        },
        providesTags: ["user"],
      }),
      updateUserInfo: builder.mutation<undefined, UpdateUserInfoPayload>({
        query: (payload) => {
          return {
            url: `/user/user-info`,
            method: "POST",
            body: payload,
          };
        },
      }),
      uploadProfile: builder.mutation<
        undefined,
        { userId: string; payload: FormData }
      >({
        query: ({ userId, payload }) => {
          return {
            url: `/user/upload-profile?id=${userId}`,
            method: "POST",
            body: payload,
          };
        },
      }),
      changePassword: builder.mutation<undefined, ChangePasswordPayload>({
        query: (payload) => {
          return {
            url: `/user/change-password`,
            method: "POST",
            body: payload,
          };
        },
      }),
    }),
  });

export const {
  useGetInvitedUsersQuery,
  useInviteUserMutation,
  useValidateInviteUserMutation,
  useGetUserProfileQuery,
  useUpdateUserInfoMutation,
  useUploadProfileMutation,
  useChangePasswordMutation,
} = api;
