import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CurrentConversationState = string;
const initialState: CurrentConversationState = "";

export const currentConversationSlice = createSlice({
  name: "currentConversation",
  initialState,
  reducers: {
    updateCurrentConversation: (
      state: CurrentConversationState,
      action: PayloadAction<string>,
    ) => {
      return action.payload;
    },
  },
});

export const { updateCurrentConversation } = currentConversationSlice.actions;
export default currentConversationSlice.reducer;
