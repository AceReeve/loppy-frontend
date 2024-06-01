import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notificationSlice } from "src/slices/notification-slice.ts";

const initialState = false;

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    updateTimeFormat: (state, action: PayloadAction<boolean>) => {
      state = action.payload;
    },
  },
});

export const { updateTimeFormat } = timeSlice.actions;
export default timeSlice.reducer;
