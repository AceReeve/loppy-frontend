import { baseApi } from "../api";
import {
  type BuyNumberPayload,
  type BuyNumberResponse,
  type GetAvailableLocalNumbersPayload,
  type GetAvailableLocalNumbersResponse,
  type GetPurchasedNumbersResponse,
} from "./types/numbers";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["numbers"],
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
        providesTags: ["numbers"],
      }),
      getPurchasedNumbers: builder.query<
        GetPurchasedNumbersResponse[],
        undefined
      >({
        query: () => {
          return {
            url: `/twilio-messaging/get-purchased-numbers`,
          };
        },
        providesTags: ["numbers"],
      }),
      buyNumber: builder.mutation<BuyNumberResponse, BuyNumberPayload>({
        query: (payload) => {
          const params = new URLSearchParams(payload).toString();

          return {
            url: `/twilio-messaging/buy-number?${params}`,
            method: "POST",
          };
        },
        invalidatesTags: ["numbers"],
      }),
    }),
  });

export const {
  useGetPurchasedNumbersQuery,
  useLazyGetAvailableLocalNumbersQuery,
  useBuyNumberMutation,
} = api;
