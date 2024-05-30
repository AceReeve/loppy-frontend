"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { ConnectionState, Message } from "@twilio/conversations";
import { Client } from "@twilio/conversations";
import { useGetTwilioAccessTokenQuery } from "@repo/redux-utils/src/endpoints/messaging.ts";
import LoadingSpinner from "@repo/ui/loading-spinner.tsx";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui";
import { AlertCircle } from "lucide-react";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useDispatch } from "react-redux";
import {
  parseConversation,
  upsertConversation,
} from "@repo/redux-utils/src/slices/messaging/conversation-slice.ts";
import { conversationsMap } from "@repo/redux-utils/src/utils/messaging/conversations-objects.ts";
import { handlePromiseRejection } from "@repo/hooks-and-utils/helpers";
import type { Session } from "@repo/redux-utils";
import { updateParticipants } from "@repo/redux-utils/src/slices/messaging/participants-slice.ts";
import { addMessages } from "@repo/redux-utils/src/slices/messaging/message-list-slice.ts";

interface ContextType {
  accessToken: string | undefined;
  client: Client | undefined;
  connectionState: ConnectionState | undefined;
  initialized: boolean;
  session: Session | null;
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
        dispatch(upsertConversation(parseConversation(conversation)));
        conversationsMap.set(conversation.sid, conversation);

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

    newClient.on("messageAdded", (message: Message) => {
      console.log("Message Added");
      // await upsertMessage(message, upsertMessages, updateUnreadMessages);
      // if (message.author === localStorage.getItem("username")) {
      //   clearAttachments(message.conversation.sid, "-1");
      // }
    });
    newClient.on("userUpdated", async (event) => {
      console.log("User updated");

      // await updateUser(event.user);
    });

    newClient.on("participantUpdated", (data) => {
      console.log("Participant updated");

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
