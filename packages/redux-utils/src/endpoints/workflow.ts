import { baseApi } from "../api";
import {
  type CreateWorkflowPayload,
  type GetCreateWorkflowResponse,
  type GetFolderResponse,
  type GetIDPayload,
  type GetWorkflowListPayload,
  type PublishWorkflowPayload,
  type SaveWorkflowPayload,
  type CreateFolderPayload,
  type GetEditFolderPayload,
} from "./types/workflow";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["workflow"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createWorkflow: builder.mutation<
        GetCreateWorkflowResponse,
        CreateWorkflowPayload | undefined
      >({
        query: (payload) => {
          const queryParams = new URLSearchParams(payload).toString();
          return {
            url: `/react-flow/workflow${queryParams}`,
            method: "POST",
          };
        },
        invalidatesTags: ["workflow"],
      }),

      saveWorkflow: builder.mutation<
        GetCreateWorkflowResponse,
        SaveWorkflowPayload | undefined
      >({
        query: (payload) => {
          const queryParams = payload
            ? new URLSearchParams({ id: payload.id }).toString()
            : "";
          return {
            url: `/react-flow/workflow${queryParams}`,
            method: "PUT",
            body: payload,
          };
        },
        invalidatesTags: ["workflow"],
      }),

      publishWorkflow: builder.mutation<
        GetCreateWorkflowResponse,
        PublishWorkflowPayload
      >({
        query: (payload) => {
          const queryParams = new URLSearchParams(payload).toString();
          return {
            url: `/react-flow/workflow-published?${queryParams}`,
            method: "PUT",
          };
        },
        invalidatesTags: ["workflow"],
      }),

      createWorkflowFolder: builder.mutation<
        GetFolderResponse,
        CreateFolderPayload
      >({
        query: (payload) => {
          const queryParams = new URLSearchParams({
            id: payload.id,
            name: payload.name,
          }).toString();
          return {
            url: `/react-flow/folder?${queryParams}`,
            method: "POST",
          };
        },
        invalidatesTags: ["workflow"],
      }),

      getWorkflowList: builder.query<
        GetFolderResponse[],
        GetWorkflowListPayload
      >({
        query: (payload) => {
          const queryParams = payload.id
            ? new URLSearchParams(payload).toString()
            : "";
          return {
            url: `/react-flow/folders/?${queryParams}`,
          };
        },
        providesTags: ["workflow"],
      }),

      getWorkflow: builder.query<
        GetCreateWorkflowResponse,
        GetWorkflowListPayload
      >({
        query: (payload) => {
          const queryParams = payload.id
            ? new URLSearchParams(payload).toString()
            : "";

          return {
            url: `/react-flow/workflow/{id}?${queryParams}`,
          };
        },
        providesTags: ["workflow"],
      }),

      deleteFolder: builder.mutation<GetFolderResponse, GetIDPayload>({
        query: (payload) => {
          const queryParams = new URLSearchParams({
            id: payload.id,
          }).toString();
          return {
            url: `/react-flow/folder/{id}?${queryParams}`,
            method: "DELETE",
            body: payload,
          };
        },
        invalidatesTags: ["workflow"],
      }),

      editFolder: builder.mutation<undefined, GetEditFolderPayload>({
        query: (payload) => {
          const queryParams = new URLSearchParams({
            id: payload.id,
            name: payload.name,
          }).toString();
          return {
            url: `/react-flow/folder/?${queryParams}`,
            method: "PUT",
          };
        },
        invalidatesTags: ["workflow"],
      }),
    }),
  });

export const {
  useCreateWorkflowMutation,
  useCreateWorkflowFolderMutation,
  useDeleteFolderMutation,
  useEditFolderMutation,
  usePublishWorkflowMutation,
  useSaveWorkflowMutation,
  useLazyGetWorkflowListQuery,
  useGetWorkflowQuery,
} = api;
