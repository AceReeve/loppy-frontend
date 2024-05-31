"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type {
  ConnectionState,
  Conversation,
  Message,
} from "@twilio/conversations";
import { Client } from "@twilio/conversations";
import { useGetTwilioAccessTokenQuery } from "@repo/redux-utils/src/endpoints/messaging.ts";
import LoadingSpinner from "@repo/ui/loading-spinner.tsx";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui";
import { AlertCircle } from "lucide-react";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useDispatch, useSelector } from "react-redux";
import {
  removeConversation,
  upsertConversation,
} from "@repo/redux-utils/src/slices/messaging/conversation-slice.ts";
import { conversationsMap } from "@repo/redux-utils/src/utils/messaging/conversations-objects.ts";
import { handlePromiseRejection } from "@repo/hooks-and-utils/helpers";
import type { Session } from "@repo/redux-utils";
import { updateParticipants } from "@repo/redux-utils/src/slices/messaging/participants-slice.ts";
import {
  addMessages,
  removeMessages,
} from "@repo/redux-utils/src/slices/messaging/message-list-slice.ts";
import { updateCurrentConversation } from "@repo/redux-utils/src/slices/messaging/current-conversation-slice.ts";
import { AppState } from "@repo/redux-utils/src/store.ts";
import { SetUnreadMessagesType } from "@repo/redux-utils/src/types/messaging/messaging";
import { updateUnreadMessages } from "@repo/redux-utils/src/slices/messaging/unread-messages-slice.ts";
import { updateUser } from "@repo/redux-utils/src/slices/messaging/users-slice.ts";

interface ContextType {
  accessToken: string | undefined;
  client: Client | undefined;
  connectionState: ConnectionState | undefined;
  initialized: boolean;
  session: Session | null;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const MessagesProviderContext = createContext<ContextType | null>(null);

export default function MessagesProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const {
    data: token,
    error,
    isLoading,
  } = useGetTwilioAccessTokenQuery(undefined);

  const dispatch = useDispatch();

  const [client, setClient] = useState<Client>();
  const [connectionState, setConnectionState] = useState<ConnectionState>();
  const [initialized, setInitialized] = useState(false);
  const sid = useSelector((state: AppState) => state.currentConversation);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!token) return;

    const newClient = new Client(token);
    setClient(newClient);

    newClient.on("initialized", () => {
      setInitialized(true);
    });
    newClient.on("initFailed", (e) => {
      console.log(e.error);
    });

    newClient.on("connectionStateChanged", (state) => {
      console.log("connectionStateChanged");
      console.log(state);
      setConnectionState(state);
    });

    newClient.on("conversationJoined", (conversation) => {
      handlePromiseRejection(async () => {
        dispatch(upsertConversation(conversation));

        if (conversation.status === "joined") {
          const result = await conversation.getParticipants();
          dispatch(
            updateParticipants({
              participants: result,
              sid: conversation.sid,
            }),
          );

          const messages = await conversation.getMessages();
          dispatch(
            addMessages({
              channelSid: conversation.sid,
              messages: messages.items,
            }),
          );
          // await loadUnreadMessagesCount(conversation, updateUnreadMessages);
        }
      });
    });

    newClient.on("conversationUpdated", ({ conversation }) => {
      handlePromiseRejection(() => dispatch(upsertConversation(conversation)));
    });

    newClient.on("conversationRemoved", (conversation: Conversation) => {
      dispatch(updateCurrentConversation(""));
      handlePromiseRejection(() => {
        dispatch(removeConversation(conversation.sid));
        dispatch(
          updateParticipants({
            participants: [],
            sid: conversation.sid,
          }),
        );
      });
    });

    newClient.on("messageAdded", (message) => {
      upsertMessage(message);
      // if (message.author === localStorage.getItem("username")) {
      //   clearAttachments(message.conversation.sid, "-1");
      // }
    });
    newClient.on("messageUpdated", (data) => {
      upsertMessage(data.message);
    });

    newClient.on("messageRemoved", (message) => {
      dispatch(
        removeMessages({
          channelSid: message.conversation.sid,
          messages: [message],
        }),
      );
    });
    newClient.on("userUpdated", (event) => {
      console.log("User updated");

      dispatch(updateUser(event.user));
    });

    newClient.on("participantUpdated", (data) => {
      handlePromiseRejection(async () => {
        const { participant } = data;
        const result = await participant.conversation.getParticipants();
        dispatch(
          updateParticipants({
            participants: result,
            sid: participant.conversation.sid,
          }),
        );
      });
    });

    newClient.on("participantUpdated", (data) => {
      handlePromiseRejection(async () => {
        const { participant } = data;
        const result = await participant.conversation.getParticipants();
        dispatch(
          updateParticipants({
            participants: result,
            sid: participant.conversation.sid,
          }),
        );
      });
    });
    newClient.on("participantJoined", (participant) => {
      handlePromiseRejection(async () => {
        const result = await participant.conversation.getParticipants();
        dispatch(
          updateParticipants({
            participants: result,
            sid: participant.conversation.sid,
          }),
        );
      });
    });
  }, [token]);

  async function upsertMessage(message: Message) {
    //transform the message and add it to redux
    await handlePromiseRejection(async () => {
      if (sid === message.conversation.sid) {
        await message.conversation.advanceLastReadMessageIndex(message.index);
      }
      dispatch(
        addMessages({
          channelSid: message.conversation.sid,
          messages: [message],
        }),
      );
      await loadUnreadMessagesCount(message.conversation);
    });
  }

  async function loadUnreadMessagesCount(convo: Conversation) {
    let count = 0;

    try {
      count =
        (await convo.getUnreadMessagesCount()) ??
        (await convo.getMessagesCount());
    } catch (e) {
      console.error("getUnreadMessagesCount threw an error", e);
    }

    dispatch(
      updateUnreadMessages({
        channelSid: convo.sid,
        unreadCount: count,
      }),
    );
  }

  if (error) {
    return (
      <Alert className="max-w-96" variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{getErrorMessage(error)}</AlertDescription>
      </Alert>
    );
  }

  if (!token) {
    return (
      <Alert className="max-w-96">
        <LoadingSpinner />
        <AlertTitle>Loading Messages</AlertTitle>
        <AlertDescription>This may take a while.</AlertDescription>
      </Alert>
    );
  }

  return (
    <MessagesProviderContext.Provider
      value={{
        accessToken: token,
        client,
        connectionState,
        initialized,
        session,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </MessagesProviderContext.Provider>
  );
}

export const useMessagesState = () => {
  const context = useContext(MessagesProviderContext);
  if (!context) {
    throw new Error(
      "useMessagesState must be used within a MessagesProviderProvider",
    );
  }
  return context;
};
