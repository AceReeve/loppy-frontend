import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { getSession } from "next-auth/react";

export interface Pokemon {}

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();
  console.log("session", session);
  if (session?.jwt) {
    headers.set("Authorization", `Bearer ${session.jwt}`);
  }
  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,

  prepareHeaders: (headers, { getState }: any) => {
    return addTokenToRequest(headers, { getState });
  },
});

const baseQueryWithReauth: BaseQueryFn = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    // Implement logic for restricted access
  } else if (result?.error?.status === 401) {
    //Logout the user
    //Or redirect to unauthorized page
  } else {
    //Allow the user to access the route.
  }

  return result;
};

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
