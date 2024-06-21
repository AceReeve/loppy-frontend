import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  token?: string;
}

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reducer: (state: AuthState) => state,
  },
});

export const { reducer } = authSlice.actions;
export default authSlice.reducer;
