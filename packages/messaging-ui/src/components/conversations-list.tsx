"use client";

import { DirectboxReceive } from "iconsax-react";
import type { AppState } from "@repo/redux-utils/src/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui";
import React, { useMemo } from "react";
import moment from "moment";
import type {
  ReduxConversation,
  ReduxMessage,
  SetParticipantsType,
  SetSidType,
} from "@repo/redux-utils/src/types/messaging/messaging";
import { getSdkConversationObject } from "@repo/redux-utils/src/utils/messaging/conversations-objects.ts";
import { updateCurrentConversation } from "@repo/redux-utils/src/slices/messaging/current-conversation-slice.ts";
import { Conversation } from "@twilio/conversations";
import { updateParticipants } from "@repo/redux-utils/src/slices/messaging/participants-slice.ts";
import ConversationsListSkeleton from "@/src/components/conversations-list-skeleton.tsx";
import { useMessagesState } from "@/src/providers/messages-provider.tsx";
import { updateUnreadMessages } from "@repo/redux-utils/src/slices/messaging/unread-messages-slice.ts";
import { setLastReadIndex } from "@repo/redux-utils/src/slices/messaging/last-read-index-slice.ts";
import { getTypingMessage } from "@/src/utils.ts";
import { getTranslation } from "@repo/redux-utils/src/utils/messaging/local-utils.ts";

function getLastMessage(
  messages: ReduxMessage[],
  convoLoading: string,
  convoEmpty: string,
  typingData: string[],
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
  return messages[messages.length - 1].body || "Media message";
}

export default function ConversationsList() {
  const { initialized } = useMessagesState();
  const conversations = useSelector((state: AppState) => state.conversations);
  const sid = useSelector((state: AppState) => state.currentConversation);
  const unreadMessages = useSelector((state: AppState) => state.unreadMessages);
  const messages = useSelector((state: AppState) => state.messageList);
  const typingData = useSelector((state: AppState) => state.typingData);

  const convoEmpty = getTranslation("en-US", "convoEmpty");
  const convoLoading = getTranslation("en-US", "convoLoading");

  const dispatch = useDispatch();

  const onConversationSelect = async (convo: ReduxConversation) => {
    if (!messages[convo.sid]) return;
    try {
      dispatch(setLastReadIndex(convo.lastReadMessageIndex ?? -1));
      dispatch(updateCurrentConversation(convo.sid));

      const participants =
        await getSdkConversationObject(convo).getParticipants();

      dispatch(
        updateParticipants({
          participants,
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
      //set messages to be read
      const lastMessage =
        messages[convo.sid].length &&
        messages[convo.sid][messages[convo.sid].length - 1];
      if (lastMessage && lastMessage.index !== -1) {
        await getSdkConversationObject(convo).advanceLastReadMessageIndex(
          lastMessage.index,
        );
      }
    } catch (e: any) {
      console.log(e);
      // unexpectedErrorNotification(e.message, addNotifications);
    }
  };

  const renderConversations = useMemo(() => {
    if (!initialized) return <ConversationsListSkeleton />;
    return conversations.map((convo) => (
      <div
        className={`relative flex items-center justify-between rounded-lg p-3 hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-blue-800 ${convo.sid === sid ? "bg-slate-100" : ""}`}
        key={convo.sid}
        onClick={async () => {
          await onConversationSelect(convo);
        }}
      >
        <div className="relative flex h-14 w-14 flex-shrink-0">
          <Avatar>
            <AvatarImage
              className="object-cover"
              src="/assets/images/abe-lincoln.jpeg"
            />
            <AvatarFallback>EX</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 rounded-full bg-white p-1">
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
        </div>
        <div className="relative ml-4 hidden min-w-0 flex-auto group-hover:block md:block">
          <div className="flex justify-between">
            <p className="text-sm font-semibold leading-snug text-neutral-700">
              {convo.friendlyName?.split("@")[0]}
            </p>
            <div className="text-xs font-medium leading-none text-neutral-400">
              {convo.lastMessage.dateCreated
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
            <p className="w-full font-nunito text-sm font-light leading-none text-neutral-400">
              {getLastMessage(
                messages[convo.sid],
                convoLoading,
                convoEmpty,
                typingData[convo.sid] ?? [],
              ) ?? ""}
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
      </div>
    ));
  }, [conversations, sid, messages]);

  return (
    <section className="custom-scrollbar-neutral group flex w-24 flex-none flex-col overflow-auto transition-all duration-300 ease-in-out md:w-2/5 lg:max-w-sm">
      <div className="header flex flex-none flex-row items-center justify-between p-4">
        <p className="text-md hidden font-bold group-hover:block md:block">
          Messages
        </p>
        <div className="flex gap-3">
          <a
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white group-hover:flex hover:bg-gray-200 md:flex"
            href="#"
          >
            <img
              alt=""
              className="relative h-5 w-5"
              src="/assets/icons/messaging/search.svg"
            />
          </a>
          {/*<NewMessageDialog />*/}

          <a
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white group-hover:flex hover:bg-gray-200 md:flex"
            href="#"
          >
            <img
              alt=""
              className="relative h-5 w-5"
              src="/assets/icons/messaging/tabler_dots.svg"
            />
          </a>
        </div>
      </div>
      <div className="inline-flex h-[76px] w-full items-center justify-between px-6 py-3">
        <div className="flex h-[52px] items-center justify-start gap-2.5">
          <DirectboxReceive className="relative h-[30px] w-[30px]" />
          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-1 self-stretch">
            <div className="font-nunito text-lg font-medium leading-relaxed text-neutral-600">
              Message Archived
            </div>
            <div className="self-stretch font-nunito text-sm font-normal leading-snug text-neutral-400">
              There are 10 Contacts
            </div>
          </div>
        </div>
        <a
          className="hidden h-10 w-10 items-center justify-center rounded-full bg-white group-hover:flex hover:bg-gray-200 md:flex"
          href="#"
        >
          <img
            alt=""
            className="relative h-5 w-5"
            src="/assets/icons/messaging/tabler_dots.svg"
          />
        </a>
      </div>
      <div className="custom-scrollbar-neutral contacts flex-1 overflow-y-scroll p-2">
        {renderConversations}
      </div>
    </section>
  );
}
