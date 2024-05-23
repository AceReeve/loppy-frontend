import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ReduxConversation {
  sid: string;
  friendlyName: string | null;
  dateUpdated: Date | null;
  notificationLevel: "default" | "muted";
  lastReadMessageIndex: number | null;
  lastMessage?: {
    index?: number;
    dateCreated?: Date;
  };
}

const initialState: ReduxConversation[] = [];

let originalConversations: ReduxConversation[] = [];

const convoSorter = (a: ReduxConversation, b: ReduxConversation) =>
  (b.lastMessage?.dateCreated?.getTime() ?? b.dateUpdated?.getTime() ?? 0) -
  (a.lastMessage?.dateCreated?.getTime() ?? a.dateUpdated?.getTime() ?? 0);

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    upsertConversation: (state , action: PayloadAction<Conversation>) => {
      const {
        sid,
        friendlyName,
        dateUpdated,
        notificationLevel,
        lastReadMessageIndex,
        lastMessage,
      } = action.payload;
      const filteredClone = state.filter(
        (conversation) => conversation.sid !== action.payload.sid,
      );

      conversationsMap.set(action.payload.sid, action.payload);

      originalConversations = [
        ...filteredClone,
        {
          sid,
          friendlyName,
          dateUpdated,
          notificationLevel,
          lastReadMessageIndex,
          lastMessage: {
            ...lastMessage,
          },
        },
      ].sort(convoSorter);

      return originalConversations;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
