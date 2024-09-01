import { baseApi } from "../api";
import { type SearchParamsType } from "../index.tsx";
import {
  CreateWorkflowPayload,
  GetCreateWorkflowResponse,
} from "./types/workflow";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["workflow"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createWorkflow: builder.mutation<
        GetCreateWorkflowResponse,
        CreateWorkflowPayload
      >({
        query: (payload) => {
          return {
            url: `/react-flow/workflow`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["workflow"],
      }),
    }),
  });

export const { useCreateWorkflowMutation } = api;
