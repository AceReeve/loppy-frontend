import { baseApi } from "../api.ts";
import {
  type GetUserInfoResponse,
  type InviteUserPayload,
  type InviteUserResponse,
  type SaveUserInfoPayload,
  type SaveUserInfoResponse,
} from "./types/user";
import type {
  GetInviteUserResponse,
  GetSendInviteUserPayload,
} from "./types/settings-user";

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
        GetInviteUserResponse,
        GetSendInviteUserPayload
      >({
        query: (payload) => {
          return {
            url: `/user/validate-invite-user`,
            method: "POST",
            body: payload,
          };
        },
      }),
      getUserInfo: builder.query<GetUserInfoResponse, undefined>({
        query: () => {
          return {
            url: `/user/profile`,
          };
        },
      }),
      saveUserInfo: builder.mutation<SaveUserInfoResponse, SaveUserInfoPayload>(
        {
          query: (payload) => {
            return {
              url: `/user/user-info`,
              method: "POST",
              body: payload,
            };
          },
        }
      ),
    }),
  });

export const {
  useGetInvitedUsersQuery,
  useInviteUserMutation,
  useValidateInviteUserMutation,
  useSaveUserInfoMutation,
  useGetUserInfoQuery,
} = api;
