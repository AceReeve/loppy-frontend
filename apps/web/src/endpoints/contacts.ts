import { baseApi } from "@repo/redux-utils/src/api.ts";

import {
  CreateContactPayload,
  ExportContactsPayload,
  ExportContactsResponse,
  GetContactsResponse,
  GetCreateContactResponse,
  ImportContactsResponse,
} from "@/src/endpoints/types/contacts";
import { string } from "zod";

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

      exportContacts: builder.query({
        query: (data) => {
          const params = new URLSearchParams(data).toString();
          return {
            url: `/Contacts/export?${params}`,
            method: "GET",
            responseType: "blob",
          };
        },

        transformResponse(response, meta) {
          console.log("Meta" + meta);
          /*          const type = meta?.headers?.get("type");
                  const contentDisposition = meta?.headers?.get("content-disposition");
                   const regex =
                     /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/;
                   const fileName = contentDisposition.match(regex)[3];
                   const url = URL.createObjectURL(
                     new Blob([response], {
                       type,
                     }),
                   );*/

          return {
            url: "",
            fileName: "",
          };
        },
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
  // useExportContactsQuery,
  useLazyExportContactsQuery,
} = userApi;
