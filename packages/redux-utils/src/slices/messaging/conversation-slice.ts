import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "@twilio/conversations";
import { ReduxConversation } from "../../types/messaging/messaging";
import { conversationsMap } from "../../utils/messaging/conversations-objects.ts";

const initialState: ReduxConversation[] = [];

let originalConversations: ReduxConversation[] = [];

const conversationSorter = (a: ReduxConversation, b: ReduxConversation) => {
  return (
    new Date(b.lastMessage.dateCreated ?? b.dateUpdated ?? 0).getTime() -
    new Date(a.lastMessage.dateCreated ?? b.dateUpdated ?? 0).getTime()
  );
};

export const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    upsertConversation: (state, action: PayloadAction<ReduxConversation>) => {
      const filteredClone = state.filter(
        (conversation) => conversation.sid !== action.payload.sid,
      );

      originalConversations = [...filteredClone, action.payload].sort(
        conversationSorter,
      );

      return originalConversations;
    },
  },
});

export const parseConversation = (
  conversation: Conversation,
): ReduxConversation => {
  const {
    sid,
    friendlyName,
    dateUpdated,
    notificationLevel,
    lastReadMessageIndex,
    lastMessage,
  } = conversation;

  return {
    sid,
    friendlyName,
    dateUpdated: dateUpdated?.toISOString() ?? null,
    notificationLevel,
    lastReadMessageIndex,
    lastMessage: {
      index: lastMessage?.index,
      dateCreated: lastMessage?.dateCreated?.toISOString(),
    },
  };
};
// Action creators are generated for each case reducer function
export const { upsertConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
