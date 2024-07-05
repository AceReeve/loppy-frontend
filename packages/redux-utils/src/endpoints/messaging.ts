import { baseApi } from "../api";
import { type TwilioCredentialsPayloadAndResponse } from "./types/messaging";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["messaging", "twilio_credentials"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTwilioAccessToken: builder.query<string, undefined>({
        query: () => {
          return {
            url: `/messages/get-twilio-access-token`,
            responseHandler: (response: Response) => response.text(),
          };
        },
        providesTags: ["messaging"],
      }),
      setTwilioCredentials: builder.mutation<
        TwilioCredentialsPayloadAndResponse,
        TwilioCredentialsPayloadAndResponse
      >({
        query: (payload) => {
          return {
            url: "/messages/twilio-credentials",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["twilio_credentials"],
      }),
      getTwilioCredentials: builder.query<
        TwilioCredentialsPayloadAndResponse,
        undefined
      >({
        query: () => {
          return {
            url: "/messages/get-twilio-credentials",
          };
        },
        providesTags: ["twilio_credentials"],
      }),
    }),
  });

export const {
  useGetTwilioAccessTokenQuery,
  useGetTwilioCredentialsQuery,
  useSetTwilioCredentialsMutation,
} = api;
