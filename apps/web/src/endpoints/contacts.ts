import { baseApi } from "@repo/redux-utils/src/api.ts";
import type {
  CreateContactPayload,
  ExportContactsPayload,
  ExportContactsResponse,
  GetContactsResponse,
  GetCreateContactResponse,
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
  useImportContactsMutation, useLazyExportContactsQuery,
} = api;
