import { baseApi } from "@repo/redux-utils/src/api.ts";
import type {
  CreatePaymentIntentPayload,
  CreatePaymentIntentResponse,
  GetPaymentStatusResponse,
  SummarizePaymentPayload,
  SummarizePaymentResponse,
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
  useSummarizePaymentMutation,
  useGetPaymentStatusQuery,
} = api;
