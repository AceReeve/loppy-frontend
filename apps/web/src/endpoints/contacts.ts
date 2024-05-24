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
      getContacts: builder.query<GetContactsResponse,undefined>({
        query: () => {
          return {
            url: `/Contacts/get-all?skip=0`,
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

      ),
      importContacts: builder.mutation<null, null>({
            query: () => {
              return {
                url: `/Contacts/import`,
                method:"POST",
              };
            },
          }
      )
    }),

  });

export const {  useGetContactsQuery, useCreateContactMutation} = userApi;
