import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type LastReadIndexState = number;

const initialState: LastReadIndexState = -1;

export const lastReadIndexSlice = createSlice({
  name: "lastReadIndex",
  initialState,

  reducers: {
    setLastReadIndex: (
      state: LastReadIndexState,
      action: PayloadAction<number>,
    ) => {
      return action.payload;
    },
  },
});

export const { setLastReadIndex } = lastReadIndexSlice.actions;
