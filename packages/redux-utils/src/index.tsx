import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppState, AppDispatch } from "./store.ts";

export { store } from "./store.ts";
export { baseApi, nextApi } from "./api.ts";
export { StoreProvider } from "./store-provider.tsx";
export type { Session } from "next-auth";

export type SearchParamsType =
  | string[][]
  | Record<string, string | number>
  | string
  | URLSearchParams;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
