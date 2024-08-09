import { baseApi } from "../api";
import {
  type GetAvailableLocalNumbersPayload,
  type GetAvailableLocalNumbersResponse,
} from "./types/phone-numbers";

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
    }),
  });

export const { useGetAvailableInboxesQuery } = api;
