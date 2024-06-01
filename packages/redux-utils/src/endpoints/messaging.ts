import { baseApi } from "../api";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["messaging"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTwilioAccessToken: builder.query<string, undefined>({
        query: () => {
          return {
            url: `/messages/get-twilio-access-token`,
            responseHandler: (response: { text: () => any }) => response.text(),
          };
        },
        providesTags: ["messaging"],
      }),
    }),
  });

export const { useGetTwilioAccessTokenQuery } = api;
