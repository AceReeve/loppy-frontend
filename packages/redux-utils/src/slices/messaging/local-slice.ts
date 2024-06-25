import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type LocalState = string;
const initialState: LocalState = "";

export const localSlice = createSlice({
  name: "local",
  initialState,
  reducers: {
    updateLocal: (state: LocalState, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { updateLocal } = localSlice.actions;
