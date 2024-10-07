import { baseApi } from "../api";
import {
  type CreateOrganizationPayload,
  type CreateOrganizationResponse,
  type GetOrganizationResponse,
} from "./types/organization";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["organization"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllOrganizations: builder.query<GetOrganizationResponse[], undefined>({
        query: () => {
          return {
            url: `/twilio-messaging/organizations`,
          };
        },
        providesTags: ["organization"],
      }),
      createOrganization: builder.mutation<
        CreateOrganizationResponse,
        CreateOrganizationPayload
      >({
        query: (payload) => {
          return {
            url: `/twilio-messaging/organization`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["organization"],
      }),
    }),
  });

export const { useGetAllOrganizationsQuery, useCreateOrganizationMutation } =
  api;
