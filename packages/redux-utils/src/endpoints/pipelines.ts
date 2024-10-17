import { baseApi } from "../api";
import { type SearchParamsType } from "../index.tsx";
import {
  type UpdateOpportunitiesPayload,
  type GetAllOpportunitiesResponse,
  type CreateOpportunityPayload,
  type CreateLeadPayload,
  type UpdateLeadPayload,
  type UpdateOpportunityPayload,
  type GetAllPipelinesResponse,
  type CreatePipelinePayload,
  type ImportPipelinesResponse,
  type GetAllOpportunitiesPaginatedPayload,
  type GetAllOpportunitiesPaginatedResponse,
} from "./types/pipelines";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["pipelines"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      // PIPELINES
      getAllPipelines: builder.query<GetAllPipelinesResponse[], undefined>({
        query: () => {
          return {
            url: `/pipelines`,
          };
        },
        providesTags: ["pipelines"],
      }),

      createPipeline: builder.mutation<undefined, CreatePipelinePayload>({
        query: (payload) => {
          return {
            url: `/pipelines`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["pipelines"],
      }),

      getPipeline: builder.query<
        GetAllPipelinesResponse,
        { pipelineId: string }
      >({
        query: ({ pipelineId }) => {
          return {
            url: `/pipelines/${pipelineId}`,
          };
        },
        transformResponse: (response: GetAllPipelinesResponse) => {
          return {
            ...response,
            opportunities: response.opportunities.map((opportunity) => ({
              ...opportunity,
              id: `opportunity-${opportunity._id}`,
              leads: opportunity.leads.map((lead) => ({
                ...lead,
                id: `item-${lead._id}`,
              })),
            })),
          };
        },
        providesTags: ["pipelines"],
      }),

      exportPipelines: builder.query<Blob, SearchParamsType>({
        query: (data: string) => {
          const params = new URLSearchParams(data).toString();
          return {
            url: `/pipelines/export?${params}`,
            method: "GET",
            responseType: "blob",
          };
        },
      }),
      importPipelines: builder.mutation<ImportPipelinesResponse, FormData>({
        query: (payload) => {
          return {
            url: `/pipelines/import`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["pipelines"],
      }),
      deletePipeline: builder.mutation<undefined, string>({
        query: (pipelineId: string) => {
          return {
            url: `/pipelines/${pipelineId}`,
            method: "DELETE",
          };
        },
      }),

      // OPPORTUNITIES
      getAllOpportunities: builder.query<
        GetAllOpportunitiesResponse[],
        undefined
      >({
        query: () => {
          return {
            url: `/stages`,
          };
        },
        transformResponse: (response: GetAllOpportunitiesResponse[]) => {
          return response.map((opportunity) => ({
            ...opportunity,
            id: `opportunity-${opportunity._id}`,
            leads: opportunity.leads.map((lead) => ({
              ...lead,
              id: `item-${lead._id}`,
            })),
          }));
        },
        providesTags: ["pipelines"],
      }),
      createOpportunity: builder.mutation<undefined, CreateOpportunityPayload>({
        query: (payload) => {
          return {
            url: `/stages`,
            method: "POST",
            body: payload,
          };
        },
      }),
      updateOpportunities: builder.mutation<
        undefined,
        UpdateOpportunitiesPayload
      >({
        query: (payload) => {
          return {
            url: `/stages`,
            method: "PUT",
            body: payload,
          };
        },
      }),
      updateOpportunity: builder.mutation<undefined, UpdateOpportunityPayload>({
        query: (payload) => {
          return {
            url: `/stages/${payload._id}`,
            method: "PUT",
            body: payload,
          };
        },
      }),
      deleteOpportunity: builder.mutation<undefined, string>({
        query: (opportunityId: string) => {
          return {
            url: `/stages/${opportunityId}`,
            method: "DELETE",
          };
        },
      }),
      getAllOpportunitiesPaginated: builder.query<
        GetAllOpportunitiesPaginatedResponse,
        GetAllOpportunitiesPaginatedPayload
      >({
        query: ({ page, limit, search }) => {
          return {
            url: `/stages/paginated?page=${page.toString()}&limit=${limit.toString()}&search=${search}`,
          };
        },
        providesTags: ["pipelines"],
      }),

      // LEADS
      createLead: builder.mutation<undefined, CreateLeadPayload>({
        query: (payload) => {
          return {
            url: `/opportunities`,
            method: "POST",
            body: payload,
          };
        },
      }),
      updateLead: builder.mutation<undefined, UpdateLeadPayload>({
        query: ({ leadId, payload }) => {
          return {
            url: `/opportunities/${leadId}`,
            method: "PUT",
            body: payload,
          };
        },
      }),
      deleteLead: builder.mutation<undefined, string>({
        query: (leadId: string) => {
          return {
            url: `/opportunities/${leadId}`,
            method: "DELETE",
          };
        },
      }),
    }),
  });

export const {
  useGetAllPipelinesQuery,
  useCreatePipelineMutation,
  useGetPipelineQuery,
  useLazyExportPipelinesQuery,
  useImportPipelinesMutation,
  useDeletePipelineMutation,
  useGetAllOpportunitiesQuery,
  useCreateOpportunityMutation,
  useUpdateOpportunitiesMutation,
  useUpdateOpportunityMutation,
  useDeleteOpportunityMutation,
  useGetAllOpportunitiesPaginatedQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} = api;
