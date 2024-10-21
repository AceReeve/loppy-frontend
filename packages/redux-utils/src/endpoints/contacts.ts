import { baseApi } from "../api";
import { type SearchParamsType } from "../index.tsx";
import type {
  ContactSelect,
  CreateContactPayload,
  GetContactsListResponse,
  GetContactsResponse,
  GetCreateContactResponse,
  ImportContactsResponse,
} from "./types/contacts";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["contacts"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getContacts: builder.query<GetContactsResponse, SearchParamsType>({
        query: (params) => {
          const queryParams = new URLSearchParams(params).toString();
          return {
            url: `/Contacts/get-all?${queryParams}`,
          };
        },
        providesTags: ["contacts"],
      }),
      getAllContact: builder.query<ContactSelect[], undefined>({
        query: () => {
          return {
            url: `/Contacts/get-all-contacts`,
          };
        },
        transformResponse: (response: GetCreateContactResponse[]) => {
          return response.map((u) => ({
            value: u._id,
            label: `${u.first_name} ${u.last_name}`,
          }));
        },
        providesTags: ["contacts"],
      }),
      getContactsList: builder.query<GetContactsListResponse, undefined>({
        query: () => {
          return {
            url: `/Contacts/list`,
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

      exportContacts: builder.query<Blob, SearchParamsType>({
        query: (data) => {
          const params = new URLSearchParams(data).toString();
          return {
            url: `/Contacts/export?${params}`,
            method: "GET",
            responseType: "blob",
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
  useGetAllContactQuery,
  useGetContactsListQuery,
  useCreateContactMutation,
  useImportContactsMutation,
  useLazyExportContactsQuery,
} = api;
