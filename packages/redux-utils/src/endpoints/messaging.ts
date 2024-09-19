import { baseApi } from "../api";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["messaging", "twilio_credentials"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTwilioAccessToken: builder.query<string, string>({
        query: (organizationId: string) => {
          return {
            url: `/twilio-messaging/get-twilio-access-token/${organizationId}`,
            responseHandler: (response: Response) => response.text(),
          };
        },
        providesTags: ["messaging"],
      }),
    }),
  });

export const { useGetTwilioAccessTokenQuery } = api;
