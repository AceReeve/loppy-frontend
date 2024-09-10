import { baseApi } from "../api.ts";
import {
  type CreatePaymentIntentPayload,
  type CreatePaymentIntentResponse,
  type CreateSubscriptionPayload,
  type CreateSubscriptionResponse,
  type GetPaymentStatusResponse,
  type SummarizePaymentPayload,
  type SummarizePaymentResponse,
} from "./types/payment";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["payment"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      summarizePayment: builder.mutation<
        SummarizePaymentResponse,
        SummarizePaymentPayload
      >({
        query: (payload) => {
          return {
            url: `/payment/summarize-payment`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["payment"],
      }),
      createPaymentIntent: builder.mutation<
        CreatePaymentIntentResponse,
        CreatePaymentIntentPayload
      >({
        query: (payload) => {
          return {
            url: `/payment/create-payment-intent`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["payment"],
      }),
      createSubscription: builder.mutation<
        CreateSubscriptionResponse,
        CreateSubscriptionPayload
      >({
        query: (payload) => {
          return {
            url: `/payment/create-subscription`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["payment"],
      }),
      getPaymentStatus: builder.query<
        GetPaymentStatusResponse | null,
        undefined
      >({
        query: () => {
          return {
            url: `/payment/payment-status`,
          };
        },
        providesTags: ["payment"],
      }),
    }),
  });

export const {
  useCreatePaymentIntentMutation,
  useCreateSubscriptionMutation,
  useSummarizePaymentMutation,
  useGetPaymentStatusQuery,
} = api;
