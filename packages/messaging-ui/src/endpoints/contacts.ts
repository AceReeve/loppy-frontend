import { baseApi } from "@repo/redux-utils/src/api.ts";
import type {
  CreateContactPayload,
  GetContactsResponse,
  ImportContactsResponse,
} from "@/src/endpoints/types/contacts";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["contacts"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getContacts: builder.query<
        GetContactsResponse,
        Record<string, any> | undefined
      >({
        query: (params) => {
          const queryParams = new URLSearchParams(params).toString();

          return {
            url: `/Contacts/get-all?${queryParams}`,
          };
        },
        providesTags: ["contacts"],
      }),
      createContact: builder.mutation<null, CreateContactPayload>({
        query: (payload) => {
          return {
            url: `/Contacts`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["contacts"],
      }),
      importContacts: builder.mutation<ImportContactsResponse, FormData>({
        query: (payload) => {
          return {
            url: `/Contacts/import`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["contacts"],
      }),
    }),
  });

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useImportContactsMutation,
} = api;
