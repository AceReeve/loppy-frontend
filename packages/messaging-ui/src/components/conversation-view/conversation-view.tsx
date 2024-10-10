"use client";

import { useSelector } from "react-redux";
import type { AppState } from "@repo/redux-utils/src/store.ts";
import React, { useMemo, useState } from "react";
import { DefaultAvatar } from "@repo/ui/components/custom";
import { cn } from "@repo/ui/utils";
import { useMessagesState } from "../../providers/messages-provider.tsx";
import ConversationPhoto from "../conversation-photo.tsx";
import ConversationLabel from "../conversation-label.tsx";
import NewConversationView from "./new-conversation-view.tsx";
import MessagesBox from "./messages-box.tsx";
import MessageInputField from "./message-input-field.tsx";

export default function ConversationView() {
  const { client, sidebarOpen, setSidebarOpen } = useMessagesState();

  const conversations = useSelector((state: AppState) => state.conversations);
  const sid = useSelector((state: AppState) => state.currentConversation);
  const lastReadIndex = useSelector((state: AppState) => state.lastReadIndex);
  const messages = useSelector((state: AppState) => state.messageList);
  const participants =
    useSelector((state: AppState) => state.participants)[sid] ?? [];

  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);

  const openedConversation = useMemo(
    () => conversations.find((convo) => convo.sid === sid),
    [sid, conversations],
  );

  const handleDroppedFiles = (files: File[]) => {
    setDroppedFiles(files);
  };

  if (!openedConversation) return <NewConversationView />;

  return (
    <section
      className={cn(
        "flex flex-auto flex-col bg-card",
        !sidebarOpen && "rounded-tr-3xl",
      )}
    >
      <div className="chat-header flex flex-none flex-row items-center justify-between px-6 py-4">
        <div className="flex">
          <div className="relative mr-4 flex size-12 flex-shrink-0">
            <ConversationPhoto participants={participants} />
          </div>
          <div className="text-sm">
            <p className="font-bold">
              <ConversationLabel participants={participants} />
            </p>
            <p>Active 1h ago</p>
          </div>
          <div className="flex">
            {participants.map((participant, index) => (
              <div
                className={`bg-primary-light size-10 rounded-full ${index !== 0 ? "-ml-2" : "ml-4"}`}
                key={participant.sid}
              >
                <DefaultAvatar
                  image=""
                  name={
                    participant.type === "chat"
                      ? (participant.identity ?? "")
                      : (participant.address ?? "")
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 hover:bg-gray-200"
            type="button"
          >
            <img
              alt=""
              className="relative h-7 w-7 "
              src="/assets/icons/messaging/user-plus.svg"
            />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 hover:bg-gray-200"
            type="button"
          >
            <img
              alt=""
              className="relative h-7 w-7 "
              src="/assets/icons/messaging/search.svg"
            />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 hover:bg-gray-200"
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
            type="button"
          >
            <img
              alt=""
              className="relative h-7 w-7 "
              src="/assets/icons/messaging/sidebar.svg"
            />
          </button>
        </div>
      </div>
      {sid && client ? (
        <>
          <MessagesBox
            convo={openedConversation}
            convoSid={sid}
            handleDroppedFiles={handleDroppedFiles}
            lastReadIndex={lastReadIndex}
            messages={messages[sid] ?? []}
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
              droppedFiles={droppedFiles}
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
