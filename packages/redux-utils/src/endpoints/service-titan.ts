import { nextApi } from "../api.ts";
import {
  type CredentialsResponse,
  type GetDashboardMetricsPayload,
  type GetDashboardMetricsResponse,
  type GetSyncStatusResponse,
  type SetCredentialsPayload,
  type SyncServiceTitanPayload,
  type SyncServiceTitanResponse,
  type VerifyCredentialsPayload,
} from "./types/service-titan";
import { type SuccessResponse } from "./types/commons";
import { type Job } from "./types/service-titan-entities/jobs";

const api = nextApi
  .enhanceEndpoints({
    addTagTypes: ["service-titan"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getDashboardMetrics: builder.query<
        GetDashboardMetricsResponse,
        GetDashboardMetricsPayload
      >({
        query: (params) => {
          const queryParams = new URLSearchParams(params).toString();
          return {
            url: `/service-titan/dashboard-metrics?${queryParams}`,
          };
        },
        providesTags: ["service-titan"],
      }),

      getServiceTitanSyncStatus: builder.query<
        GetSyncStatusResponse,
        undefined
      >({
        query: () => {
          return {
            url: `/service-titan/sync/status`,
          };
        },
        providesTags: ["service-titan"],
      }),

      getUnsoldJobs: builder.query<Job[], undefined>({
        query: () => {
          return {
            url: `/service-titan/entities/unsold-jobs`,
          };
        },
        providesTags: ["service-titan"],
      }),

      syncServiceTitan: builder.mutation<
        SyncServiceTitanResponse,
        SyncServiceTitanPayload
      >({
        query: (payload) => {
          return {
            url: `/service-titan/sync/${payload.entity}`,
            method: "POST",
            body: {
              includeRecentChanges: payload.includeRecentChanges,
            },
          };
        },
        invalidatesTags: ["service-titan"],
      }),

      getCredentials: builder.query<CredentialsResponse, undefined>({
        query: () => ({
          url: "/service-titan/credentials",
        }),
        providesTags: ["service-titan"],
      }),

      setCredentials: builder.mutation<SuccessResponse, SetCredentialsPayload>({
        query: (payload) => ({
          url: "/service-titan/credentials",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        }),
        invalidatesTags: ["service-titan"],
      }),

      deleteCredentials: builder.mutation<SuccessResponse, undefined>({
        query: () => ({
          url: "/service-titan/credentials",
          method: "DELETE",
        }),
        invalidatesTags: ["service-titan"],
      }),

      verifyCredentials: builder.mutation<
        SuccessResponse,
        VerifyCredentialsPayload
      >({
        query: (payload) => ({
          url: "/service-titan/verify",
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["service-titan"],
      }),
    }),
  });

export const {
  useGetDashboardMetricsQuery,
  useGetServiceTitanSyncStatusQuery,
  useSyncServiceTitanMutation,
  useGetCredentialsQuery,
  useSetCredentialsMutation,
  useVerifyCredentialsMutation,
  useDeleteCredentialsMutation,
  useGetUnsoldJobsQuery,
} = api;
