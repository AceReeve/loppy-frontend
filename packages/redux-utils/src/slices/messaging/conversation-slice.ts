import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Conversation } from "@twilio/conversations";
import { type ReduxConversation } from "../../types/messaging/messaging";
import { conversationsMap } from "../../utils/messaging/conversations-objects.ts";

const initialState: ReduxConversation[] = [];

let originalConversations: ReduxConversation[] = [];

const convoSorter = (a: ReduxConversation, b: ReduxConversation) =>
  (b.lastMessage?.dateCreated?.getTime() ?? b.dateUpdated?.getTime() ?? 0) -
  (a.lastMessage?.dateCreated?.getTime() ?? a.dateUpdated?.getTime() ?? 0);

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    upsertConversation(state, action: PayloadAction<Conversation>) {
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
    updateConversation(state, action: PayloadAction<ReduxConversation>) {
      const targetIndex = state.findIndex(
        (convo: ReduxConversation) => convo.sid === action.payload.sid,
      );

      if (targetIndex !== -1) {
        state[targetIndex] = action.payload;
      }
    },
    removeConversation(state, action: PayloadAction<string>) {
      const targetIndex = state.findIndex(
        (convo: ReduxConversation) => convo.sid === action.payload,
      );

      if (targetIndex !== -1) {
        state.splice(targetIndex, 1);
      }
      conversationsMap.delete(action.payload);
    },
    filterConversations(state, action: PayloadAction<string>) {
      const searchString = action.payload;

      // Filter the conversations based on searchString
      const filteredConversations = originalConversations.filter(
        (convo: ReduxConversation) => {
          return convo.friendlyName
            ? convo.friendlyName
                .toLowerCase()
                .includes(searchString.toLowerCase())
            : false;
        },
      );

      return filteredConversations;
    },
  },
});

export const {
  upsertConversation,
  updateConversation,
  removeConversation,
  filterConversations,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
