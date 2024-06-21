import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
} from "@reduxjs/toolkit/query";
import { getSession, signOut } from "next-auth/react";

const addTokenToRequest = async (headers: Headers) => {
  const session = await getSession();
  // @ts-expect-error disregard jwt does not exist error
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- disregard
  if (session?.jwt) headers.set("Authorization", `Bearer ${session.jwt}`);
  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  prepareHeaders: (headers) => {
    return addTokenToRequest(headers);
  },
});

const baseQueryWithReauth: BaseQueryFn = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 403) {
    // Implement logic for restricted access
  } else if (result.error?.status === 401) {
    //Logout the user
    //Or redirect to unauthorized page
    await signOut({ callbackUrl: "/" });
  } else {
    //Allow the user to access the route.
  }

  return result;
};

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
