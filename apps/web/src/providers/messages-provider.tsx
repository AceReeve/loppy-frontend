"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useMessagesAccessToken from "@/fetchers/messages/use-messages-access-token";
import LoadingOverlay from "@/components/loading/loading-overlay";
import {
  Client,
  ConnectionState,
  Conversation,
  Message,
  Participant,
} from "@twilio/conversations";
import { handlePromiseRejection } from "@/app/dashboard/messages/helpers";
import { useDispatch, useSelector } from "react-redux";
import { AppState, actionCreators } from "@/store";
import { bindActionCreators } from "redux";
import {
  AddMessagesType,
  SetParticipantsType,
  SetUnreadMessagesType,
} from "@/types/messaging-types";

async function loadUnreadMessagesCount(
  convo: Conversation,
  updateUnreadMessages: SetUnreadMessagesType,
) {
  let count = 0;

  try {
    count =
      (await convo.getUnreadMessagesCount()) ??
      (await convo.getMessagesCount());
  } catch (e) {
    console.error("getUnreadMessagesCount threw an error", e);
  }

  updateUnreadMessages(convo.sid, count);
}

async function handleParticipantsUpdate(
  participant: Participant,
  updateParticipants: SetParticipantsType,
) {
  const result = await participant.conversation.getParticipants();
  updateParticipants(result, participant.conversation.sid);
}

type ContextType = {
  accessToken: string | undefined;
  client: Client | undefined;
};

const MessagesContext = createContext<ContextType | null>(null);

export default function MessagesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: token, error, isLoading } = useMessagesAccessToken();

  const [connectionState, setConnectionState] = useState<ConnectionState>();
  const [client, setClient] = useState<Client>();
  const [clientIteration, setClientIteration] = useState(0);
  const conversations = useSelector((state: AppState) => state.convos);
  const sid = useSelector((state: AppState) => state.sid);
  const sidRef = useRef("");
  // const [alertsExist, AlertsView] = useAppAlert();
  sidRef.current = sid;

  // console.log(conversations);

  const dispatch = useDispatch();
  const {
    upsertMessages,
    updateLoadingState,
    updateParticipants,
    updateUser,
    updateUnreadMessages,
    startTyping,
    endTyping,
    upsertConversation,
    removeMessages,
    removeConversation,
    updateCurrentConversation,
    addNotifications,
    clearAttachments,
    updateLocal,
  } = bindActionCreators(actionCreators, dispatch);

  const updateTypingIndicator = (
    participant: Participant,
    sid: string,
    callback: (sid: string, user: string) => void,
  ) => {
    const {
      // @ts-ignore
      attributes: { friendlyName },
      identity,
    } = participant;
    if (identity === localStorage.getItem("username")) {
      return;
    }
    callback(sid, identity || friendlyName || "");
  };

  useEffect(() => {
    if (!token) return;
    const client = new Client(token);

    setClient(client);

    const local = localStorage.getItem("local") || "en-US";
    updateLocal(local);

    client.on("conversationJoined", (conversation) => {
      console.log("conversationJoined");
      upsertConversation(conversation);

      conversation.on("typingStarted", (participant) => {
        handlePromiseRejection(
          () =>
            updateTypingIndicator(participant, conversation.sid, startTyping),
          addNotifications,
        );
      });

      conversation.on("typingEnded", async (participant) => {
        await handlePromiseRejection(
          async () =>
            updateTypingIndicator(participant, conversation.sid, endTyping),
          addNotifications,
        );
      });

      handlePromiseRejection(async () => {
        if (conversation.status === "joined") {
          console.log("joined");
          const result = await conversation.getParticipants();
          updateParticipants(result, conversation.sid);

          const messages = await conversation.getMessages();
          upsertMessages(conversation.sid, messages.items);
          await loadUnreadMessagesCount(conversation, updateUnreadMessages);
        }
      }, addNotifications);
    });

    client.on("conversationRemoved", async (conversation: Conversation) => {
      updateCurrentConversation("");
      await handlePromiseRejection(async () => {
        removeConversation(conversation.sid);
        updateParticipants([], conversation.sid);
      }, addNotifications);
    });
    client.on("messageAdded", async (message: Message) => {
      await upsertMessage(message, upsertMessages, updateUnreadMessages);
      if (message.author === localStorage.getItem("username")) {
        clearAttachments(message.conversation.sid, "-1");
      }
    });
    client.on("userUpdated", async (event) => {
      await updateUser(event.user);
    });
    client.on("participantLeft", async (participant) => {
      await handlePromiseRejection(
        async () => handleParticipantsUpdate(participant, updateParticipants),
        addNotifications,
      );
    });
    client.on("participantUpdated", async (event) => {
      await handlePromiseRejection(
        async () =>
          handleParticipantsUpdate(event.participant, updateParticipants),
        addNotifications,
      );
    });
    client.on("participantJoined", async (participant) => {
      await handlePromiseRejection(
        async () => handleParticipantsUpdate(participant, updateParticipants),
        addNotifications,
      );
    });
    client.on("conversationUpdated", async ({ conversation }) => {
      console.log("conversationUpdated");
      await handlePromiseRejection(
        () => upsertConversation(conversation),
        addNotifications,
      );
    });

    client.on("messageUpdated", async ({ message }) => {
      console.log("messageUpdated");
      await handlePromiseRejection(
        async () =>
          upsertMessage(message, upsertMessages, updateUnreadMessages),
        addNotifications,
      );
    });

    client.on("messageRemoved", async (message) => {
      await handlePromiseRejection(
        () => removeMessages(message.conversation.sid, [message]),
        addNotifications,
      );
    });

    client.on("pushNotification", (event) => {
      // @ts-ignore
      if (event.type !== "twilio.conversations.new_message") {
        return;
      }

      if (Notification.permission === "granted") {
        console.log("notification granted");
        // showNotification(event);
      } else {
        console.log("Push notification is skipped", Notification.permission);
      }
    });

    // client.on("tokenAboutToExpire", async () => {
    //   if (username && password) {
    //     const token = await getToken(username, password);
    //     await client.updateToken(token);
    //     login(token);
    //   }
    // });

    // client.on("tokenExpired", async () => {
    //   if (username && password) {
    //     const token = await getToken(username, password);
    //     login(token);
    //     setClientIteration((x) => x + 1);
    //   }
    // });

    client.on("connectionStateChanged", (state) => {
      console.log("connectionStateChanged");
      console.log(state);
      setConnectionState(state);
    });

    updateLoadingState(false);

    return () => {
      client?.removeAllListeners();
    };
  }, [clientIteration, token]);

  async function upsertMessage(
    message: Message,
    upsertMessages: AddMessagesType,
    updateUnreadMessages: SetUnreadMessagesType,
  ) {
    //transform the message and add it to redux
    await handlePromiseRejection(async () => {
      if (sidRef.current === message.conversation.sid) {
        await message.conversation.advanceLastReadMessageIndex(message.index);
      }
      upsertMessages(message.conversation.sid, [message]);
      await loadUnreadMessagesCount(message.conversation, updateUnreadMessages);
    }, addNotifications);
  }

  const openedConversation = useMemo(
    () => conversations.find((convo) => convo.sid === sid),
    [sid, conversations],
  );

  console.log(openedConversation);

  if (isLoading) return <LoadingOverlay />;
  if (error) {
    if (error.message === "Not Found") {
      return <>Failed to load messaging.</>;
    }
  }
  return (
    <MessagesContext.Provider
      value={{
        accessToken: token,
        client,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export const useMessagesState = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessagesState must be used within a DashboardProvider");
  }
  return context;
};
