import { baseApi } from "../api";
import {
  type BuyNumberPayload,
  type BuyNumberResponse,
  type GetAvailableLocalNumbersPayload,
  type GetAvailableLocalNumbersResponse,
  type GetPurchasedNumbersPayload,
  type GetPurchasedNumbersResponse,
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
      getPurchasedNumbers: builder.query<
        GetPurchasedNumbersResponse[],
        GetPurchasedNumbersPayload
      >({
        query: (payload) => {
          return {
            url: `/twilio-messaging/get-purchased-numbers/${payload.organization_id}`,
          };
        },
        providesTags: ["phone_numbers"],
      }),
      buyNumber: builder.mutation<BuyNumberResponse, BuyNumberPayload>({
        query: (payload) => {
          const params = new URLSearchParams(payload).toString();

          return {
            url: `/twilio-messaging/buy-number?${params}`,
            method: "POST",
          };
        },
        invalidatesTags: ["phone_numbers"],
      }),
    }),
  });

export const {
  useGetPurchasedNumbersQuery,
  useLazyGetAvailableLocalNumbersQuery,
  useBuyNumberMutation,
} = api;
