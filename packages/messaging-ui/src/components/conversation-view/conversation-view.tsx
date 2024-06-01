"use client";

import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "@repo/redux-utils/src/store.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui";
import React, { useEffect, useMemo } from "react";
import { useMessagesState } from "@/src/providers/messages-provider.tsx";
import MessagesBox from "@/src/components/conversation-view/messages-box.tsx";
import MessageInputField from "@/src/components/conversation-view/message-input-field.tsx";
import NewConversationView from "@/src/components/conversation-view/new-conversation-view.tsx";

export default function ConversationView() {
  const { client, initialized, sidebarOpen, setSidebarOpen } =
    useMessagesState();

  const conversations = useSelector((state: AppState) => state.conversations);
  const sid = useSelector((state: AppState) => state.currentConversation);
  const lastReadIndex = useSelector((state: AppState) => state.lastReadIndex);
  const messages = useSelector((state: AppState) => state.messageList);
  const participants =
    useSelector((state: AppState) => state.participants)[sid] ?? [];

  const openedConversation = useMemo(
    () => conversations.find((convo) => convo.sid === sid),
    [sid, conversations],
  );

  // console.log("messages", messages);
  // console.log("participants", participants);
  //
  // useEffect(() => {
  //   if (openedConversation) {
  //     handlePromiseRejection(async () => {
  //       const convoSid: string = openedConversation.sid;
  //       // const sidExists = Boolean(
  //       //   messages.filter(({ sid }) => sid === convoSid).length,
  //       // );
  //       const sidExists = false;
  //       if (!sidExists) {
  //         const paginator = await getMessages(
  //           getSdkConversationObject(openedConversation),
  //         );
  //         const messagesPerPage = paginator.items;
  //         console.log("messages", messages);
  //         //save to redux
  //         dispatch(
  //           pushMessages({
  //             channelSid: convoSid,
  //             messages: messagesPerPage,
  //           }),
  //         );
  //       }
  //     });
  //   }
  // }, []);

  if (!openedConversation) return <NewConversationView />;

  return (
    <section className="flex flex-auto flex-col border-l border-gray-200">
      <div className="chat-header flex flex-none flex-row items-center justify-between px-6 py-4 shadow">
        <div className="flex">
          <div className="relative mr-4 flex h-12 w-12 flex-shrink-0">
            <Avatar>
              <AvatarImage
                className="object-cover"
                src="/assets/images/abe-lincoln.jpeg"
              />
              <AvatarFallback>EX</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-sm">
            <p className="font-bold">
              {openedConversation?.friendlyName ?? "-"}
            </p>
            <p>Active 1h ago</p>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 hover:bg-gray-200"
            href="#"
          >
            <img
              alt=""
              className="relative h-7 w-7 "
              src="/assets/icons/messaging/user-plus.svg"
            />
          </a>
          <a
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 hover:bg-gray-200"
            href="#"
          >
            <img
              alt=""
              className="relative h-7 w-7 "
              src="/assets/icons/messaging/search.svg"
            />
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 hover:bg-gray-200"
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <img
              alt=""
              className="relative h-7 w-7 "
              src="/assets/icons/messaging/sidebar.svg"
            />
          </button>
        </div>
      </div>
      {sid && openedConversation && client ? (
        <>
          <MessagesBox
            convo={openedConversation}
            convoSid={sid}
            // handleDroppedFiles={setDroppedFiles}
            lastReadIndex={lastReadIndex}
            loadingState={initialized}
            messages={messages[sid]}
            participants={participants}
          />
          {/*<div className="bg-gray-100 p-4 text-sm text-gray-500">*/}
          {/*  {typingData.length > 0 && typingInfo}*/}
          {/*</div>*/}
          <div className="chat-footer flex-none">
            <MessageInputField
              client={client}
              convo={openedConversation}
              convoSid={sid}
              // droppedFiles={droppedFiles}
              messages={messages[sid]}
              // typingData={typingData}
            />
          </div>
        </>
      ) : (
        <div className="flex-1 bg-gray-100 p-4">No message selected</div>
      )}
    </section>
  );
}
