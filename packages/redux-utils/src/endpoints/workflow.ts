import { baseApi } from "../api";
import type {
  CreateWorkflowPayload,
  GetCreateWorkflowResponse,
  GetFolderResponse,
  GetIDPayload,
} from "./types/workflow";
import { GetContactsListResponse } from "./types/contacts";
import { CreateFolderPayload, GetEditFolderPayload } from "./types/workflow";

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

      createWorkflowFolder: builder.mutation<
        GetFolderResponse,
        CreateFolderPayload
      >({
        query: (payload) => {
          const queryParams = new URLSearchParams({
            folder_name: payload.folder_name,
          }).toString();
          return {
            url: `/react-flow/folder?${queryParams}`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["workflow"],
      }),

      getWorkflowList: builder.query<GetFolderResponse[], undefined>({
        query: () => {
          return {
            url: `/react-flow/folders`,
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

      editFolder: builder.mutation<GetFolderResponse, GetEditFolderPayload>({
        query: (payload) => {
          const queryParams = new URLSearchParams({
            id: payload.id,
            folder_name: payload.folder_name,
          }).toString();
          return {
            url: `/react-flow/folder/${payload.id}?${queryParams}`,
            method: "PUT",
            body: payload,
          };
        },
        invalidatesTags: ["workflow"],
      }),
    }),
  });

export const {
  useCreateWorkflowMutation,
  useCreateWorkflowFolderMutation,
  useGetWorkflowListQuery,
  useDeleteFolderMutation,
  useEditFolderMutation,
} = api;
