import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeliveryAmount, JSONValue, Message } from "@twilio/conversations";
import { mediaMap, messagesMap } from "@/conversations-objects";
import { ChatMessagesState, ReduxMessage, ReduxMedia } from "./types"; // Assuming you have a separate file for types

const initialState: ChatMessagesState = {};

const messageListSlice = createSlice({
    name: "messageList",
    initialState,
    reducers: {
        pushMessages: (state, action: PayloadAction<{ channelSid: string, messages: Message[] }>) => {
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
        addMessages: (state, action: PayloadAction<{ channelSid: string, messages: Message[] }>) => {
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
        removeMessages: (state, action: PayloadAction<{ channelSid: string, messages: ReduxMessage[] }>) => {
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

export const { pushMessages, addMessages, removeMessages } = messageListSlice.actions;
export default messageListSlice.reducer;

const reduxifyMessage = (message: Message | ReduxMessage): ReduxMessage => {
};

// Export reduxifyMessage if needed
export { reduxifyMessage };
