"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  ConnectionState,
  Conversation,
  Message,
} from "@twilio/conversations";
import { Client } from "@twilio/conversations";
import {
  useGetTwilioAccessTokenQuery,
  useGetTwilioCredentialsQuery,
} from "@repo/redux-utils/src/endpoints/messaging.ts";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
} from "@repo/ui/components/ui";
import { AlertCircle } from "lucide-react";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useDispatch, useSelector } from "react-redux";
import {
  removeConversation,
  upsertConversation,
} from "@repo/redux-utils/src/slices/messaging/conversation-slice.ts";
import { getSdkMessageObject } from "@repo/redux-utils/src/utils/messaging/conversations-objects.ts";
import { handlePromiseRejection } from "@repo/hooks-and-utils/helpers";
import type { Session } from "@repo/redux-utils/src";
import { updateParticipants } from "@repo/redux-utils/src/slices/messaging/participants-slice.ts";
import {
  addMessages,
  removeMessages,
} from "@repo/redux-utils/src/slices/messaging/message-list-slice.ts";
import { updateCurrentConversation } from "@repo/redux-utils/src/slices/messaging/current-conversation-slice.ts";
import { type AppState } from "@repo/redux-utils/src/store.ts";
import { type ReduxMessage } from "@repo/redux-utils/src/types/messaging/messaging";
import { updateUnreadMessages } from "@repo/redux-utils/src/slices/messaging/unread-messages-slice.ts";
import { updateUser } from "@repo/redux-utils/src/slices/messaging/users-slice.ts";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { LoadingOverlay } from "@repo/ui/loading-overlay.tsx";
import { type InviteUserResponse } from "@repo/redux-utils/src/endpoints/types/user";
import { useGetContactsListQuery } from "@repo/redux-utils/src/endpoints/contacts.ts";
import { useGetInvitedUsersQuery } from "@repo/redux-utils/src/endpoints/user.ts";
import {
  type ShowEmojiPickerProps,
  type ShowReactionPickerProps,
} from "../messaging";
import ManualPopover from "../components/manual-popover.tsx";
import { MessagingFilters } from "../messaging.enum.ts";
import { TwilioCredentialsPayloadAndResponse } from "@repo/redux-utils/src/endpoints/types/messaging";

interface ContextType {
  accessToken: string | undefined;
  client: Client | undefined;
  connectionState: ConnectionState | undefined;
  initialized: boolean;
  session: Session | null;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  newConvoLoading: boolean;
  setNewConvoLoading: (open: boolean) => void;
  showEmojiPicker: (props: ShowEmojiPickerProps | null) => void;
  showReactionPicker: (props: ShowReactionPickerProps | null) => void;
  onReactionClick: (reaction: string, message: ReduxMessage | null) => void;
  onEmojiClick: (reaction: string | null) => void;
  emojiClicked: string | null;
  contactsMap: Record<string, string> | undefined;
  invitedUsers: InviteUserResponse | undefined;
  messageFilter: MessagingFilters;
  setMessageFilter: (filter: MessagingFilters) => void;
  twilioCredentials: TwilioCredentialsPayloadAndResponse | undefined;
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
    isLoading: isTokenLoading,
  } = useGetTwilioAccessTokenQuery(undefined);
  const { data: twilioCredentials, isLoading: isCredsLoading } =
    useGetTwilioCredentialsQuery(undefined);
  const isLoading = isTokenLoading || isCredsLoading;

  const dispatch = useDispatch();

  const [client, setClient] = useState<Client>();
  const [connectionState, setConnectionState] = useState<ConnectionState>();
  const [initialized, setInitialized] = useState(false);
  const [newConvoLoading, setNewConvoLoading] = useState(false);
  const [messageFilter, setMessageFilter] = useState<MessagingFilters>(
    MessagingFilters.ALL,
  );

  // state to rerender emoji picker
  const [emojiPickerState, setEmojiPickerState] =
    useState<ShowEmojiPickerProps | null>(null);
  const [reactionPickerState, setReactionPickerState] =
    useState<ShowReactionPickerProps | null>(null);
  const [emojiClicked, setEmojiClicked] = useState<string | null>(null);

  // needs ref since state doesn't update callback quickly
  const emojiPickerRef = useRef<ShowEmojiPickerProps | null>(null);
  const reactionPickerRef = useRef<ShowReactionPickerProps | null>(null);
  const showEmojiPicker = (value: ShowEmojiPickerProps | null) => {
    setEmojiPickerState(value);
    emojiPickerRef.current = value;
  };
  const showReactionPicker = (value: ShowReactionPickerProps | null) => {
    setReactionPickerState(value);
    reactionPickerRef.current = value;
  };

  const sid = useSelector((state: AppState) => state.currentConversation);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: contactsData } = useGetContactsListQuery(undefined);
  const { data: invitedUsersData } = useGetInvitedUsersQuery(undefined);

  const invitedUsers = invitedUsersData?.[0];

  // Add '+' sign to keys
  const contactsMap = contactsData
    ? Object.entries(contactsData).reduce(
        (acc, [key, value]) => ({ ...acc, [`+${key}`]: value }),
        {},
      )
    : {};

  useEffect(() => {
    if (!token) return;

    const newClient = new Client(token);
    setClient(newClient);

    newClient.on("initialized", () => {
      setInitialized(true);
    });
    newClient.on("initFailed", () => {
      //   TODO: Set init failed action
    });

    newClient.on("connectionStateChanged", (state) => {
      setConnectionState(state);
    });

    newClient.on("conversationJoined", (conversation) => {
      dispatch(upsertConversation(conversation));
      void handlePromiseRejection(async () => {
        if (conversation.status === "joined") {
          const participants = await conversation.getParticipants();
          dispatch(
            updateParticipants({
              participants,
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
      dispatch(upsertConversation(conversation));
    });

    newClient.on("conversationRemoved", (conversation: Conversation) => {
      dispatch(updateCurrentConversation(""));
      dispatch(removeConversation(conversation.sid));
      dispatch(
        updateParticipants({
          participants: [],
          sid: conversation.sid,
        }),
      );
    });

    newClient.on("messageAdded", (message) => {
      void upsertMessage(message);
      // if (message.author === localStorage.getItem("username")) {
      //   clearAttachments(message.conversation.sid, "-1");
      // }z
    });
    newClient.on("messageUpdated", (data) => {
      void upsertMessage(data.message);
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
      dispatch(updateUser(event.user));
    });

    newClient.on("participantUpdated", (data) => {
      void handlePromiseRejection(async () => {
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
      void handlePromiseRejection(async () => {
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

  if (isLoading) {
    return (
      <Alert className="max-w-96">
        <LoadingSpinner />
        <AlertTitle>Loading Messages</AlertTitle>
        <AlertDescription>This may take a while.</AlertDescription>
      </Alert>
    );
  }

  if (!twilioCredentials) {
    return (
      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-12 lg:px-24 lg:py-24">
          <div className="mb-12 flex w-full flex-col text-center">
            <h1 className="max-w-5xl text-2xl font-bold leading-none text-gray-600">
              Setup Twilio Credentials to Access Messaging
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-gray-500">
              Input your{" "}
              <a href="https://console.twilio.com/" className="text-primary">
                twilio credentials
              </a>{" "}
              in order to access messaging.
            </p>
            <Button
              onClick={() => {
                location.replace("/dashboard/settings");
              }}
              className="mt-4"
            >
              Setup your twilio credentials
            </Button>
          </div>
        </div>
      </section>
    );
  }

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

    await handlePromiseRejection(async () => {
      count =
        (await convo.getUnreadMessagesCount()) ??
        (await convo.getMessagesCount());

      dispatch(
        updateUnreadMessages({
          channelSid: convo.sid,
          unreadCount: count,
        }),
      );
    });
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

  function onReactionClick(reaction: string, message: ReduxMessage | null) {
    if (!message) return;
    const attributes = message.attributes as {
      reactions?: Record<string, string[]>;
    };
    const reactionUsers = attributes.reactions?.[reaction] ?? [];
    // @ts-expect-error disregard jwt does not exist error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- disregard errors
    const currentUserId = session?.jwt ?? "";
    void getSdkMessageObject(message).updateAttributes({
      ...attributes,
      reactions: {
        ...attributes.reactions,
        [reaction]: reactionUsers.includes(currentUserId as string)
          ? reactionUsers.filter((id) => id !== currentUserId)
          : [...reactionUsers, currentUserId],
      },
    });
    showReactionPicker(null);
  }
  function onEmojiClick(reaction: string | null) {
    setEmojiClicked(reaction);
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
        newConvoLoading,
        setNewConvoLoading,
        showEmojiPicker,
        showReactionPicker,
        onReactionClick,
        onEmojiClick,
        emojiClicked,
        contactsMap,
        invitedUsers,
        messageFilter,
        setMessageFilter,
        twilioCredentials,
      }}
    >
      {newConvoLoading ? <LoadingOverlay /> : null}
      {children}
      <ManualPopover
        clickEvent={reactionPickerState?.event ?? null}
        hideType="hidden" // or "remove"
        position="top"
      >
        <EmojiPicker
          allowExpandReactions={false}
          emojiStyle={EmojiStyle.FACEBOOK}
          onReactionClick={(emoji) => {
            onReactionClick(
              emoji.unified,
              reactionPickerRef.current?.message ?? null,
            );
          }}
          reactionsDefaultOpen
        />
      </ManualPopover>
      <ManualPopover
        clickEvent={emojiPickerState?.event ?? null}
        hideType="hidden" // or "remove"
        position="top"
      >
        <EmojiPicker
          emojiStyle={EmojiStyle.FACEBOOK}
          onEmojiClick={(emoji) => {
            onEmojiClick(emoji.emoji);
          }}
        />
      </ManualPopover>
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
