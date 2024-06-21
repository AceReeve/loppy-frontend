import { baseApi } from "@repo/redux-utils/src/api.ts";
import {
  type GetContactsListResponse,
  type GetContactsResponse,
} from "./types/contacts";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["contacts"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getContacts: builder.query<
        GetContactsResponse,
        Record<string, string> | undefined
      >({
        query: (params) => {
          const queryParams = new URLSearchParams(params).toString();

          return {
            url: `/Contacts/get-all?${queryParams}`,
          };
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
    }),
  });

export const { useGetContactsQuery, useGetContactsListQuery } = api;
