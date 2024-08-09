import { baseApi } from "../api";
import {
  type GetAvailableLocalNumbersPayload,
  type GetAvailableLocalNumbersResponse,
} from "./types/phone-numbers";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["phone_numbers"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAvailableLocalNumbers: builder.query<
        GetAvailableLocalNumbersResponse[],
        GetAvailableLocalNumbersPayload
      >({
        query: (payload) => {
          const params = new URLSearchParams(payload).toString();
          return {
            url: `/messages/available-numbers?${params}`,
          };
        },
        providesTags: ["phone_numbers"],
      }),
    }),
  });

export const { useLazyGetAvailableLocalNumbersQuery } = api;
