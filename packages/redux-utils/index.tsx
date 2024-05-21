import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppState, AppDispatch } from "./src/store";

export { store } from "./src/store";
export { baseApi } from "./src/api";
export * from "../../apps/web/src/endpoints/payment";
export { StoreProvider } from "./src/StoreProvider";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
