import { baseApi } from "../api";
import {
  type UpdateOpportunitiesPayload,
  type GetAllOpportunitiesResponse,
  type CreateOpportunityPayload,
  type CreateLeadPayload,
} from "./types/pipelines";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["pipelines"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
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

      createLead: builder.mutation<undefined, CreateLeadPayload>({
        query: (payload) => {
          return {
            url: `/lead`,
            method: "POST",
            body: payload,
          };
        },
      }),
    }),
  });

export const {
  useGetAllOpportunitiesQuery,
  useCreateOpportunityMutation,
  useUpdateOpportunitiesMutation,
  useCreateLeadMutation,
} = api;
