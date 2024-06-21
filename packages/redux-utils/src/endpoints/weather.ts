import { baseApi } from "../api.ts";
import type {
  GetWeatherDailyResponse,
  GetWeatherDayResponse,
} from "./types/weather";

const weatherApi = baseApi
  .enhanceEndpoints({
    addTagTypes: ["weather"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getWeatherDay: builder.query<GetWeatherDayResponse, undefined>({
        query: (data) => {
          const params = new URLSearchParams(data).toString();
          return {
            url: `/weather/openweather/day?${params}`,
          };
        },
        providesTags: ["weather"],
      }),
      getWeatherDaily: builder.query<GetWeatherDailyResponse, undefined>({
        query: (data) => {
          const params = new URLSearchParams(data).toString();
          return {
            url: `/weather/openweather/daily?${params}`,
          };
        },
        providesTags: ["weather"],
      }),
    }),
  });

export const { useGetWeatherDayQuery, useGetWeatherDailyQuery } = weatherApi;
