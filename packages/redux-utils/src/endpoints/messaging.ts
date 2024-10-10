import { baseApi } from "../api";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["messaging", "twilio_credentials"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTwilioAccessToken: builder.query<string, undefined>({
        query: () => {
          return {
            url: `/twilio-messaging/get-twilio-access-token`,
            responseHandler: (response: Response) => {
              if (response.ok) {
                return response.text();
              }
              return response.json();
            },
          };
        },
        providesTags: ["messaging"],
      }),
    }),
  });

export const { useGetTwilioAccessTokenQuery } = api;
