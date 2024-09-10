import { baseApi } from "../api";
import {
  type InvoicePaymentsResponse,
  type LeadsResponse,
  type StatCardResponse,
} from "./types/dashboard";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["dashboard"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRevenue: builder.query<StatCardResponse, undefined>({
        query: () => {
          const queryParams = new URLSearchParams({
            page: "1",
            pageSize: "1000",
          }).toString();
          return {
            url: `/service-titan/invoices-payments?${queryParams}`,
          };
        },
        transformResponse: (
          response: InvoicePaymentsResponse,
        ): StatCardResponse => {
          return {
            range: "month",
            currentValue: response.data.reduce(
              (acc, cur) => acc + Number(cur.total),
              0,
            ),
            previousValue: 200000,
          };
        },
        providesTags: ["dashboard"],
      }),

      getLeads: builder.query<StatCardResponse, undefined>({
        query: () => {
          return {
            url: `/service-titan/call-reasons`,
          };
        },
        transformResponse: (response: LeadsResponse): StatCardResponse => {
          return {
            range: "month",
            currentValue: response.data.reduce(
              (acc, cur) => acc + Number(cur.isLead),
              0,
            ),
            previousValue: 10,
          };
        },
        providesTags: ["dashboard"],
      }),
    }),
  });

export const { useGetRevenueQuery, useGetLeadsQuery } = api;
