import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeliveryAmount, JSONValue, Message } from "@twilio/conversations";
import {
  mediaMap,
  messagesMap,
} from "../../utils/messaging/conversations-objects.ts";
import { ReduxMessage } from "../../types/messaging/messaging"; // Assuming you have a separate file for types

export type ChatMessagesState = Record<string, ReduxMessage[]>;

const initialState: ChatMessagesState = {};

const reduxifyMessage = (message: Message | ReduxMessage): ReduxMessage => ({
  sid: message.sid,
  index: message.index,
  body: message.body,
  author: message.author,
  participantSid: message.participantSid,
  attributes: message.attributes,
  dateCreated: message.dateCreated,
  aggregatedDeliveryReceipt: message.aggregatedDeliveryReceipt
    ? {
        total: message.aggregatedDeliveryReceipt.total,
        sent: message.aggregatedDeliveryReceipt.sent,
        delivered: message.aggregatedDeliveryReceipt.delivered,
        read: message.aggregatedDeliveryReceipt.read,
        undelivered: message.aggregatedDeliveryReceipt.undelivered,
        failed: message.aggregatedDeliveryReceipt.failed,
      }
    : null,
  attachedMedia:
    message.attachedMedia?.map((el) => ({
      sid: el.sid,
      filename: el.filename,
      contentType: el.contentType,
      size: el.size,
      category: el.category,
    })) ?? null,
});

const messageListSlice = createSlice({
  name: "messageList",
  initialState,
  reducers: {
    pushMessages: (
      state,
      action: PayloadAction<{ channelSid: string; messages: Message[] }>,
    ) => {
      const { channelSid, messages: messagesToAdd } = action.payload;
      const existingMessages = state[channelSid] ?? [];

      for (const message of messagesToAdd) {
        messagesMap.set(message.sid, message);
        if (message.attachedMedia) {
          message.attachedMedia.forEach((media) => {
            mediaMap.set(media.sid, media);
          });
        }
      }

      state[channelSid] = existingMessages.concat(
        messagesToAdd.map(reduxifyMessage),
      );
    },
    addMessages: (
      state,
      action: PayloadAction<{ channelSid: string; messages: Message[] }>,
    ) => {
      const { channelSid, messages: messagesToAdd } = action.payload;
      const existingMessages = state[channelSid] ?? [];

      const filteredExistingMessages = existingMessages.filter(
        (message: ReduxMessage) => {
          return !messagesToAdd.find(
            (value) =>
              value.body === message.body &&
              value.author === message.author &&
              (message.index === -1 || value.index === message.index),
          );
        },
      );

      const messagesUnique = [
        ...filteredExistingMessages,
        ...messagesToAdd.map(reduxifyMessage),
      ];

      for (const message of messagesToAdd) {
        if (message instanceof Message) {
          messagesMap.set(message.sid, message);
          if (message.attachedMedia) {
            message.attachedMedia.forEach((media) => {
              mediaMap.set(media.sid, media);
            });
          }
        }
      }

      const sortedMessages = messagesUnique.sort((a, b) => {
        return a.index - b.index;
      });

      state[channelSid] = sortedMessages;
    },
    removeMessages: (
      state,
      action: PayloadAction<{ channelSid: string; messages: ReduxMessage[] }>,
    ) => {
      const { channelSid, messages: messagesToRemove } = action.payload;
      const existingMessages = state[channelSid] ?? [];
      const messages = existingMessages.filter(
        ({ index }) =>
          !messagesToRemove.find(
            ({ index: messageIndex }) => messageIndex === index,
          ),
      );

      for (const message of messagesToRemove) {
        messagesMap.delete(message.sid);
        if (message.attachedMedia) {
          message.attachedMedia.forEach((media) => {
            mediaMap.delete(media.sid);
          });
        }
      }

      state[channelSid] = messages;
    },
  },
});

export const { pushMessages, addMessages, removeMessages } =
  messageListSlice.actions;
export default messageListSlice.reducer;
