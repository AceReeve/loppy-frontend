"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useMessagesState } from "@/src/providers/messages-provider.tsx";
import MessageInputField from "@/src/components/conversation-view/message-input-field.tsx";
import MessageInputTo from "@/src/components/conversation-view/message-input-to.tsx";

export default function NewConversationView() {
  const { client } = useMessagesState();
  const [contacts, setContacts] = useState<string[]>([]);

  return (
    <section className="flex flex-auto flex-col border-l border-gray-200">
      <div className="chat-header flex flex-none flex-row items-center justify-between px-6 py-4 shadow">
        <div className="flex flex-col w-full">
          <div className="text-md">
            <p className="font-bold">New Message</p>
          </div>
          <div className="w-full flex mt-4 items-start gap-2">
            <div className="font-nunito text-sm pt-4">To:</div>
            <MessageInputTo
              className="w-full flex-wrap rounded-xl"
              contacts={contacts}
              setContacts={setContacts}
            />
          </div>
        </div>
      </div>
      {client ? (
        <>
          <div className="custom-scrollbar-neutral flex column-reverse size-full pl-4 chat-body flex-1 overflow-y-scroll bg-gray-100 p-4">
            {/*<div className="inline-flex w-full flex-col items-start justify-start gap-1">*/}
            {/*  test*/}
            {/*</div>*/}
          </div>

          {/*<div className="bg-gray-100 p-4 text-sm text-gray-500">*/}
          {/*  {typingData.length > 0 && typingInfo}*/}
          {/*</div>*/}
          <div className="chat-footer flex-none">
            <MessageInputField
              client={client}
              selectedContacts={contacts}
              // droppedFiles={droppedFiles}
              // typingData={typingData}
            />
          </div>
        </>
      ) : null}
    </section>
  );
}
