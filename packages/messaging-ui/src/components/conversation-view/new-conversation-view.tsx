/* eslint-disable -- will fix eslint errors later */
"use client";

import React, { useState } from "react";
import { useMessagesState } from "../../providers/messages-provider.tsx";
import MessageInputTo from "./message-input-to.tsx";
import MessageInputField from "./message-input-field.tsx";

export default function NewConversationView() {
  const { client } = useMessagesState();
  const [contacts, setContacts] = useState<string[]>([]);
  // TODO: To implement
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);

  return (
    <section className="flex flex-auto flex-col border-l border-gray-200">
      <div className="chat-header flex flex-none flex-row items-center justify-between px-6 py-4 shadow">
        <div className="flex w-full flex-col">
          <div className="text-md">
            <p className="font-bold">New Message</p>
          </div>
          <div className="mt-4 flex w-full items-start gap-2">
            <div className="font-nunito pt-4 text-sm">To:</div>
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
          <div className="custom-scrollbar-neutral column-reverse chat-body flex size-full flex-1 overflow-y-scroll bg-gray-100 p-4 pl-4">
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
              droppedFiles={droppedFiles}
              // typingData={typingData}
            />
          </div>
        </>
      ) : null}
    </section>
  );
}
