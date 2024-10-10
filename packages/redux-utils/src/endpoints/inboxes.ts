import { baseApi } from "../api";
import {
  type GetAvailableLocalNumbersPayload,
  type GetAvailableLocalNumbersResponse,
} from "./types/numbers";
import {
  type CreateInboxPayload,
  type GetAllInboxesResponse,
  type SetActiveInboxPayload,
  type SetActiveInboxResponse,
} from "./types/inboxes";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["inboxes"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAvailableInboxes: builder.query<
        GetAvailableLocalNumbersResponse[],
        GetAvailableLocalNumbersPayload
      >({
        query: (payload) => {
          const params = new URLSearchParams(payload).toString();
          return {
            url: `/messages/available-numbers?${params}`,
          };
        },
        providesTags: ["inboxes"],
      }),

      getAllInboxes: builder.query<GetAllInboxesResponse[], undefined>({
        query: () => {
          return {
            url: `/twilio-messaging/inboxes`,
          };
        },
        providesTags: ["inboxes"],
      }),

      createInbox: builder.mutation<GetAllInboxesResponse, CreateInboxPayload>({
        query: (payload) => {
          return {
            url: `/twilio-messaging/inbox`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["inboxes"],
      }),

      getActiveInbox: builder.query<GetAllInboxesResponse, undefined>({
        query: () => {
          return {
            url: `/twilio-messaging/get-activated-inbox`,
          };
        },
        providesTags: ["inboxes"],
      }),

      setActiveInbox: builder.mutation<
        SetActiveInboxResponse,
        SetActiveInboxPayload
      >({
        query: (payload) => {
          return {
            url: `/twilio-messaging/activate-inbox?id=${payload.id}`,
            method: "PUT",
            body: payload,
          };
        },
        invalidatesTags: ["inboxes"],
      }),
    }),
  });

export const {
  useGetActiveInboxQuery,
  useGetAvailableInboxesQuery,
  useGetAllInboxesQuery,
  useCreateInboxMutation,
  useSetActiveInboxMutation,
} = api;
