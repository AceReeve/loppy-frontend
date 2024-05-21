"use client";
import { Provider } from "react-redux";
import { store } from "./store.ts";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
