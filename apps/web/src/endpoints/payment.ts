import { baseApi } from "@repo/redux-utils/src/api.ts";
import {
  CreatePaymentIntentPayload,
  CreatePaymentIntentResponse,
  SummarizePaymentPayload,
  SummarizePaymentResponse,
} from "@/src/endpoints/types/payment";

const paymentApi = baseApi
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
    }),
  });

export const { useCreatePaymentIntentMutation, useSummarizePaymentMutation } =
  paymentApi;
