import { baseApi } from "@repo/redux-utils/src/api.ts";

import {
  CreateContactPayload,
  ExportContactsPayload,
  ExportContactsResponse,
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
        query: (data) => {
          const params = new URLSearchParams(data).toString();
          return {
            //url: `/Contacts/get-all?skip=0`,
            url: `Contacts/get-all?${params}`,
            //url: `Contacts/get-all`,
          };
        },
        providesTags: ["contacts"],

        /*getContacts: builder.query<GetContactsResponse, undefined>({
          query: () => {
            return {
              //url: `/Contacts/get-all?skip=0`,
              url: "Contacts/get-all?skip=1&tag=ChatGPT",
            };
          },*/
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
      exportContacts: builder.query<
        ExportContactsResponse,
        ExportContactsPayload
      >({
        query: (payload) => {
          return {
            url: `/Contacts/export`,
            method: "GET",
            body: payload,
          };
        },
        providesTags: ["contacts"],
      }),
    }),
  });

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useImportContactsMutation,
  useExportContactsQuery,
} = userApi;
