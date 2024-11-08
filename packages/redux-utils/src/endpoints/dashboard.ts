import { nextApi } from "../api";
import { type SuccessResponse } from "./types/commons";
import {
  type GetAccentColorPayload,
  type GetAccentColorResponse,
} from "./types/dashboard";

const api = nextApi
  .enhanceEndpoints({
    addTagTypes: ["dashboard"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAccentColor: builder.query<GetAccentColorPayload, undefined>({
        query: () => {
          return {
            url: `/dashboard/accent-color`,
          };
        },
        providesTags: ["dashboard"],
      }),

      setAccentColor: builder.mutation<SuccessResponse, GetAccentColorResponse>(
        {
          query: (payload) => {
            return {
              url: `/dashboard/accent-color`,
              method: "POST",
              body: payload,
            };
          },
          invalidatesTags: ["dashboard"],
        },
      ),
    }),
  });

export const { useGetAccentColorQuery, useSetAccentColorMutation } = api;
