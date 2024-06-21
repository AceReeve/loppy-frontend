import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = false;

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    updateTimeFormat: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { updateTimeFormat } = timeSlice.actions;
export default timeSlice.reducer;
