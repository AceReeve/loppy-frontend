import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = "";

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { logIn } = tokenSlice.actions;
