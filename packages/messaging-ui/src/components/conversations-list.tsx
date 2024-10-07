"use client";

import { MessageAdd } from "iconsax-react";
import type { AppState } from "@repo/redux-utils/src/store.ts";
import { useDispatch, useSelector } from "react-redux";
import React, { useMemo } from "react";
import moment from "moment";
import type {
  ReduxConversation,
  ReduxMessage,
} from "@repo/redux-utils/src/types/messaging/messaging";
import { getSdkConversationObject } from "@repo/redux-utils/src/utils/messaging/conversations-objects.ts";
import { updateCurrentConversation } from "@repo/redux-utils/src/slices/messaging/current-conversation-slice.ts";
import { updateParticipants } from "@repo/redux-utils/src/slices/messaging/participants-slice.ts";
import { updateUnreadMessages } from "@repo/redux-utils/src/slices/messaging/unread-messages-slice.ts";
import { setLastReadIndex } from "@repo/redux-utils/src/slices/messaging/last-read-index-slice.ts";
import { getTranslation } from "@repo/redux-utils/src/utils/messaging/local-utils.ts";
import { PhoneIcon } from "@heroicons/react/20/solid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui";
import { useGetAllInboxesQuery } from "@repo/redux-utils/src/endpoints/inboxes.ts";
import { getTypingMessage } from "../utils.ts";
import { useMessagesState } from "../providers/messages-provider.tsx";
import { MessagingFilters } from "../messaging.enum.ts";
import ConversationsListSkeleton from "./conversations-list-skeleton.tsx";
import ConversationPhoto from "./conversation-photo.tsx";
import ConversationLabel from "./conversation-label.tsx";

function getLastMessage(
  convoLoading: string,
  convoEmpty: string,
  typingData: string[],
  messages?: ReduxMessage[] | null,
) {
  if (messages === undefined || messages === null) {
    return convoLoading;
  }
  if (typingData.length) {
    return getTypingMessage(typingData);
  }
  if (messages.length === 0) {
    return convoEmpty;
  }
  return messages[messages.length - 1].body ?? "Media message";
}

export default function ConversationsList() {
  const { initialized, setSidebarOpen, setMessageFilter, messageFilter } =
    useMessagesState();
  const conversations = useSelector((state: AppState) => state.conversations);
  const sid = useSelector((state: AppState) => state.currentConversation);
  const unreadMessages = useSelector((state: AppState) => state.unreadMessages);
  const messages = useSelector((state: AppState) => state.messageList);
  const participants = useSelector((state: AppState) => state.participants);
  const typingData = useSelector((state: AppState) => state.typingData);

  const convoEmpty = getTranslation("en-US", "convoEmpty");
  const convoLoading = getTranslation("en-US", "convoLoading");

  const dispatch = useDispatch();

  const { organization } = useMessagesState();
  const { data: inboxesList } = useGetAllInboxesQuery({
    organization_id: organization._id,
  });

  const messageFilters = [
    { key: MessagingFilters.ALL, label: "All" },
    {
      key: MessagingFilters.SMS,
      label: <PhoneIcon className="size-4 text-blue-950" />,
    },
    {
      key: MessagingFilters.SERVIHERO,
      label: (
        <img
          src="/assets/images/logo.png"
          className="size-6 text-blue-950"
          alt=""
        />
      ),
    },
    {
      key: MessagingFilters.GROUP,
      label: (
        <img
          src="/assets/icons/messaging/icon-group.svg"
          className="size-6 text-blue-950"
          alt=""
        />
      ),
    },
  ];

  const onConversationSelect = async (convo: ReduxConversation) => {
    const messageList = messages[convo.sid];
    if (!messageList) return;
    try {
      dispatch(setLastReadIndex(convo.lastReadMessageIndex ?? -1));
      dispatch(updateCurrentConversation(convo.sid));

      const convoParticipants =
        await getSdkConversationObject(convo).getParticipants();

      dispatch(
        updateParticipants({
          participants: convoParticipants,
          sid: convo.sid,
        }),
      );

      // //update unread messages
      dispatch(
        updateUnreadMessages({
          channelSid: convo.sid,
          unreadCount: 0,
        }),
      );
      setSidebarOpen(true);
      //set messages to be read
      const lastMessage =
        messageList.length && messageList[messageList.length - 1];
      if (lastMessage && lastMessage.index !== -1) {
        await getSdkConversationObject(convo).advanceLastReadMessageIndex(
          lastMessage.index,
        );
      }
    } catch (e) {
      // console.log(e);
      // unexpectedErrorNotification(e.message, addNotifications);
    }
  };

  const renderConversations = useMemo(() => {
    if (!initialized) return <ConversationsListSkeleton />;
    return conversations.map((convo) => {
      const convoParticipants = participants[convo.sid];
      if (!convoParticipants) return;
      switch (messageFilter) {
        case MessagingFilters.SMS:
          if (convoParticipants[0].type !== "sms") return;
          break;
        case MessagingFilters.SERVIHERO:
          if (convoParticipants[0].type !== "chat") return;
          break;
        case MessagingFilters.GROUP:
          if (convoParticipants.length < 3) return;
          break;
        default:
        // if filter is not set, just proceed
      }
      return (
        <button
          className={`relative flex w-full items-center justify-between rounded-lg p-3 hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-blue-800 ${convo.sid === sid ? "bg-slate-100" : ""}`}
          key={convo.sid}
          onClick={() => {
            void (async () => {
              await onConversationSelect(convo);
            })();
          }}
          type="button"
        >
          <div className="size-14">
            <ConversationPhoto participants={participants[convo.sid]} />
          </div>
          <div className="relative ml-4 hidden min-w-0 flex-auto group-hover:block md:block">
            <div className="flex justify-between">
              <p className="text-sm font-semibold leading-snug text-neutral-700">
                <ConversationLabel participants={participants[convo.sid]} />
              </p>
              <div className="text-xs font-medium leading-none text-neutral-400">
                {convo.lastMessage?.dateCreated
                  ? moment(convo.lastMessage.dateCreated).fromNow()
                  : null}
              </div>
            </div>

            <div className="mt-2 flex items-start gap-1 text-sm text-gray-600">
              <img
                alt=""
                className="size-5"
                src="/assets/icons/messaging/check-read-line-duotone.svg"
              />
              <p className="font-nunito w-full text-left text-sm font-light leading-none text-neutral-400">
                {getLastMessage(
                  convoLoading,
                  convoEmpty,
                  typingData[convo.sid] ?? [],
                  messages[convo.sid],
                )}
              </p>
              {(unreadMessages[convo.sid] ?? 0) > 0 && (
                <div className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500 px-2 py-1">
                  <div className="text-xs font-medium leading-none text-white">
                    {unreadMessages[convo.sid]}
                  </div>
                </div>
              )}
            </div>
          </div>
        </button>
      );
    });
  }, [
    conversations,
    sid,
    messages,
    unreadMessages,
    initialized,
    messageFilters,
  ]);

  if (!conversations.length) {
    return null;
  }

  return (
    <section className="custom-scrollbar-neutral bg-card group flex w-24 flex-none flex-col overflow-auto transition-all duration-300 ease-in-out md:w-2/5 lg:max-w-sm rounded-tl-3xl">
      <div className="header flex flex-none flex-row items-center justify-between p-4">
        <p className="text-md hidden font-bold group-hover:block md:block">
          Messages
        </p>
        <div className="flex gap-3">
          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white hover:bg-gray-200 group-hover:flex md:flex"
            type="button"
          >
            <img
              alt=""
              className="relative h-5 w-5"
              src="/assets/icons/messaging/search.svg"
            />
          </button>
          {/*<NewMessageDialog />*/}
          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white hover:bg-gray-200 group-hover:flex md:flex"
            onClick={() => {
              dispatch(updateCurrentConversation(""));
              setSidebarOpen(false);
            }}
            type="button"
          >
            <MessageAdd className="relative h-5 w-5" />
          </button>
          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white hover:bg-gray-200 group-hover:flex md:flex"
            type="button"
          >
            <img
              alt=""
              className="relative h-5 w-5"
              src="/assets/icons/messaging/tabler_dots.svg"
            />
          </button>
        </div>
      </div>
      <div className="px-4 block gap-2 items-center">
        <p className="text-sm font-bold mb-1">Inbox</p>
        <Select defaultValue={inboxesList?.[0]._id}>
          <SelectTrigger variant="outline">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {inboxesList?.map((item) => (
              <SelectItem value={item._id} key={item._id}>
                {item.inbox_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex border-b border-gray-200 text-sm text-gray-500 mt-2">
        {messageFilters.map((item) => (
          <button
            type="button"
            className={`button rounded-none px-6 py-3 hover:bg-gray-100 ${item.key === messageFilter ? "border-b-4 border-blue-900" : ""}`}
            key={item.key}
            onClick={() => {
              setMessageFilter(item.key);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="custom-scrollbar-neutral contacts flex-1 overflow-y-scroll p-2">
        {renderConversations}
      </div>
    </section>
  );
}
