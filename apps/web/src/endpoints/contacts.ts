import { baseApi } from "@repo/redux-utils/src/api.ts";

import {
  CreateContactPayload,
  GetContactsResponse,
  GetCreateContactResponse,
  ImportContactsResponse,
} from "@/src/endpoints/types/contacts";

const userApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["contacts"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getContacts: builder.query<GetContactsResponse, undefined>({
        query: () => {
          return {
            url: `/Contacts/get-all?skip=0`,
          };
        },
        providesTags: ["contacts"],
      }),
      createContact: builder.mutation<
        GetCreateContactResponse,
        CreateContactPayload
      >({
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
} = userApi;
