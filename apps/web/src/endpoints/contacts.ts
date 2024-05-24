import { baseApi } from "@repo/redux-utils/src/api.ts";
import {
  InviteUserPayload,
  InviteUserResponse,
} from "@/src/endpoints/types/user";
import {Contacts, CreateContactPayload, GetContactsPayload, GetContactsResponse} from "@/src/endpoints/types/contacts";

const userApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["user"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getContacts: builder.query<Contacts[],GetContactsPayload>({
        query: (payload) => {
          return {
            url: `/Contacts/get-all`,
            body:payload
          };
        },
      }),
      createContact: builder.mutation<null, CreateContactPayload>({
        query: (payload) => {
          return {
            url: `/Contacts`,
            method:"POST",
            body: payload,
          };
        },
          }
      )

    }),
  });

export const { useContactsQuery ,useGetContactsQuery, useCreateContactMutation} = userApi;
