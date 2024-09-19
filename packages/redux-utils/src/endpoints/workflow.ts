import { baseApi } from "../api";
import {
  CreateWorkflowPayload,
  GetCreateWorkflowResponse,
  GetFolderResponse,
  GetIDPayload,
  GetWorkflowListPayload,
  PublishWorkflowPayload,
  SaveWorkflowPayload,
} from "./types/workflow";
import type {
  CreateFolderPayload,
  GetEditFolderPayload,
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
          const queryParams = payload?.id
            ? `?${new URLSearchParams({ id: payload.id })}`
            : "";
          return {
            url: `/react-flow/workflow${queryParams}`,
            method: "POST",
          };
        },
        invalidatesTags: ["workflow"],
      }),

      saveWorkflow: builder.mutation<
        GetCreateWorkflowResponse,
        SaveWorkflowPayload
      >({
        query: (payload) => {
          const queryParams = payload?.id
            ? `?${new URLSearchParams({ id: payload.id })}`
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
          const queryParams = new URLSearchParams({
            id: payload.id,
            published: payload.published.toString(),
          });
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
            body: payload,
          };
        },
        invalidatesTags: ["workflow"],
      }),

      getWorkflowList: builder.query<
        GetFolderResponse[],
        GetWorkflowListPayload
      >({
        query: (payload) => {
          const queryParams = payload?.id
            ? `?${new URLSearchParams({ id: payload.id })}`
            : "";
          return {
            url: `/react-flow/folders${queryParams}`,
          };
        },
        providesTags: ["workflow"],
      }),

      getWorkflow: builder.query<
        GetCreateWorkflowResponse,
        GetWorkflowListPayload
      >({
        query: (payload) => {
          const queryParams = payload?.id
            ? `?${new URLSearchParams({ id: payload.id })}`
            : "";
          return {
            url: `/react-flow/workflow/{id}${queryParams}`,
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
