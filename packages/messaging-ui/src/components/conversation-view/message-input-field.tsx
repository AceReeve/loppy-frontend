import { Client } from "@twilio/conversations";
import {
  ReduxConversation,
  ReduxMessage,
} from "@repo/redux-utils/src/types/messaging/messaging";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getSdkConversationObject } from "@repo/redux-utils/src/utils/messaging/conversations-objects.ts";
import { unexpectedErrorNotification } from "@/src/utils.ts";
import { EmojiNormal } from "iconsax-react";
import MessageInput from "@/src/components/conversation-view/message-input.tsx";

interface SendMessageProps {
  convoSid: string;
  client: Client;
  messages: ReduxMessage[];
  convo: ReduxConversation;
  // typingData: string[];
  // droppedFiles: File[];
}

export default function MessageInputField(props: SendMessageProps) {
  const [message, setMessage] = useState("");
  // const [files, setFiles] = useState<File[]>([]);
  // // needed to clear input type=file
  // const [filesInputKey, setFilesInputKey] = useState<string>("input-key");

  const dispatch = useDispatch();

  useEffect(() => {
    setMessage("");
    // setFiles([]);
    // setFilesInputKey(Date.now().toString());
  }, [props.convo]);

  // useEffect(() => {
  //   if (!files.length) {
  //     setFilesInputKey(Date.now().toString());
  //   }
  // }, [files]);

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   setFiles(props.droppedFiles);
  //   return () => {
  //     abortController.abort();
  //   };
  // }, [props.droppedFiles]);

  const sdkConvo = useMemo(
    () => getSdkConversationObject(props.convo),
    [props.convo.sid],
  );

  // const onFilesChange = (event: ChangeEvent<HTMLInputElement>): void => {
  //   const { files: assets } = event.target;
  //   if (!assets?.length) {
  //     return;
  //   }
  //
  //   const validFiles = Array.from(assets).filter(
  //     ({ size }) => size < MAX_FILE_SIZE + 1,
  //   );
  //
  //   if (validFiles.length < assets.length) {
  //     // TODO: show error
  //   }
  //
  //   setFiles([...files, ...validFiles]);
  // };

  // const onFileRemove = (file: string) => {
  //   const fileIdentityArray = file.split("_");
  //   const fileIdentity = fileIdentityArray
  //     .slice(0, fileIdentityArray.length - 1)
  //     .join();
  //   const existentFiles = files.filter(
  //     ({ name, size }) =>
  //       name !== fileIdentity &&
  //       size !== Number(fileIdentityArray[fileIdentityArray.length - 1]),
  //   );
  //
  //   setFiles(existentFiles);
  // };

  const onMessageSend = async () => {
    // if (message.length === 0 && files.length == 0) {
    if (message.length === 0) {
      return;
    }

    const { convo } = props;
    const sdkConvo = getSdkConversationObject(convo);

    const newMessageBuilder = sdkConvo.prepareMessage().setBody(message);

    // const newMessage: ReduxMessage = {
    //   author: client.user.identity,
    //   body: message,
    //   attributes: {},
    //   dateCreated: currentDate,
    //   index: -1,
    //   participantSid: "",
    //   sid: "-1",
    //   aggregatedDeliveryReceipt: null,
    //   attachedMedia: [],
    // } as ReduxMessage;

    // for (const file of files) {
    //   const fileData = new FormData();
    //   fileData.set(file.name, file, file.name);
    //
    //   // @ts-ignore
    //   newMessage.attachedMedia.push({
    //     sid: key + "",
    //     size: file.size,
    //     filename: file.name,
    //     contentType: file.type,
    //   });
    //   addAttachment(convo.sid, "-1", key + "", file);
    //   newMessageBuilder.addMedia(fileData);
    // }

    setMessage("");
    // setFiles([]);
    const messageIndex = await newMessageBuilder.build().send();

    try {
      await sdkConvo.advanceLastReadMessageIndex(messageIndex ?? 0);
    } catch (e: any) {
      unexpectedErrorNotification(e);
      throw e;
    }
  };

  return (
    <>
      <div className="flex flex-row items-center gap-2 p-4">
        <button
          type="button"
          className="mx-2 flex h-6 w-6 flex-shrink-0 items-center justify-center text-blue-600 hover:text-blue-700 focus:outline-none"
        >
          <img
            alt=""
            src="/assets/icons/messaging/plus-circle.svg"
            className="relative h-[26px] w-[26px]"
          />
        </button>
        <button
          type="button"
          className="mx-2 flex h-6 w-6 flex-shrink-0 items-center justify-center text-blue-600 hover:text-blue-700 focus:outline-none"
        >
          <img
            alt=""
            src="/assets/icons/messaging/image.svg"
            className="relative h-[26px] w-[26px]"
          />
        </button>
        <div className="relative flex-grow">
          <MessageInput
            // assets={files}
            message={message}
            onChange={(e: string) => {
              sdkConvo.typing();
              setMessage(e);
            }}
            onEnterKeyPress={async () => {
              await onMessageSend();
            }}
            // onFileRemove={onFileRemove}
          />
          <button
            type="button"
            className="absolute right-0 top-[2px] mr-3 mt-2 flex h-6 w-6 flex-shrink-0 text-gray-800 focus:outline-none"
          >
            <EmojiNormal />
          </button>
        </div>
        <button
          type="button"
          className="mx-2 flex h-6 w-6 flex-shrink-0 text-blue-600 hover:text-blue-700 focus:outline-none"
          onClick={onMessageSend}
          disabled={!message}
        >
          <img
            alt=""
            src="/assets/icons/messaging/send.svg"
            className={`relative h-[26px] w-[26px] ${!message ? "grayscale" : ""}`}
          />
        </button>
      </div>
    </>
  );
}
