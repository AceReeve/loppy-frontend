import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UnreadMessagesState = Record<string, number>;

const initialState: UnreadMessagesState = {};

export const unreadMessageSlice = createSlice({
  name: "unreadMessage",
  initialState,
  reducers: {
    updateUnreadMessages: (
      state,
      action: PayloadAction<{ channelSid: string; unreadCount: number }>,
    ) => {
      const { channelSid, unreadCount } = action.payload;
      state[channelSid] = unreadCount;
    },
  },
});

export const { updateUnreadMessages } = unreadMessageSlice.actions;
