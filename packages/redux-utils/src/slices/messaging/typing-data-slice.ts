import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TypingDataState = Record<string, string[]>;
const initialState: TypingDataState = {};
export const typingDataSlice = createSlice({
  name: "typingData",
  initialState,
  reducers: {
    typingStarted: (
      state,
      action: PayloadAction<{ channelSid: string; participant: string }>,
    ) => {
      const { channelSid, participant } = action.payload;
      const existedUsers = state[channelSid] ?? [];
      existedUsers.push(participant);
    },
    typingEnded: (
      state,
      action: PayloadAction<{ channelSid: string; participant: string }>,
    ) => {
      const { channelSid, participant } = action.payload;
      const index = (state[channelSid] ?? []).findIndex(
        (user) => user === participant,
      );
      if (index !== -1) {
        state[channelSid].splice(index, 1);
      }
    },
  },
});
export const { typingStarted, typingEnded } = typingDataSlice.actions;
export default typingDataSlice.reducer;
