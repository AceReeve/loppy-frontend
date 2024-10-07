import { baseApi } from "../api";
import {
  type UpdateOpportunitiesPayload,
  type GetAllOpportunitiesResponse,
  type CreateOpportunityPayload,
  type CreateLeadPayload,
  type UpdateLeadPayload,
  type UpdateOpportunityPayload,
} from "./types/pipelines";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["pipelines"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      // OPPORTUNITIES
      getAllOpportunities: builder.query<
        GetAllOpportunitiesResponse[],
        undefined
      >({
        query: () => {
          return {
            url: `/opportunity`,
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
            url: `/opportunity`,
            method: "POST",
            body: payload,
          };
        },
      }),
      updateOpportunities: builder.mutation<
        undefined,
        UpdateOpportunitiesPayload[]
      >({
        query: (payload) => {
          return {
            url: `/opportunity`,
            method: "PUT",
            body: payload,
          };
        },
      }),
      updateOpportunity: builder.mutation<undefined, UpdateOpportunityPayload>({
        query: (payload) => {
          return {
            url: `/opportunity/${payload._id}`,
            method: "PUT",
            body: payload,
          };
        },
      }),
      deleteOpportunity: builder.mutation<undefined, string>({
        query: (opportunityId: string) => {
          return {
            url: `/opportunity/${opportunityId}`,
            method: "DELETE",
          };
        },
      }),

      // LEADS
      createLead: builder.mutation<undefined, CreateLeadPayload>({
        query: (payload) => {
          return {
            url: `/lead`,
            method: "POST",
            body: payload,
          };
        },
      }),
      updateLead: builder.mutation<undefined, UpdateLeadPayload>({
        query: ({ leadId, payload }) => {
          return {
            url: `/lead/${leadId}`,
            method: "PUT",
            body: payload,
          };
        },
      }),
      deleteLead: builder.mutation<undefined, string>({
        query: (leadId: string) => {
          return {
            url: `/lead/${leadId}`,
            method: "DELETE",
          };
        },
      }),
    }),
  });

export const {
  useGetAllOpportunitiesQuery,
  useCreateOpportunityMutation,
  useUpdateOpportunitiesMutation,
  useUpdateOpportunityMutation,
  useDeleteOpportunityMutation,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} = api;
