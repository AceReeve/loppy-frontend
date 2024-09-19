import { baseApi } from "../api";
import {
  type GetAvailableLocalNumbersPayload,
  type GetAvailableLocalNumbersResponse,
} from "./types/phone-numbers";
import {
  type CreateInboxPayload,
  type GetAllInboxesPayload,
  type GetAllInboxesResponse,
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

      getAllInboxes: builder.query<
        GetAllInboxesResponse[],
        GetAllInboxesPayload
      >({
        query: (payload) => {
          return {
            url: `/twilio-messaging/inboxes/${payload.organization_id}`,
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
    }),
  });

export const {
  useGetAvailableInboxesQuery,
  useGetAllInboxesQuery,
  useCreateInboxMutation,
} = api;
