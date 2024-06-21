import { type Client } from "@twilio/conversations";
import {
  type ReduxConversation,
  type ReduxMessage,
} from "@repo/redux-utils/src/types/messaging/messaging";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSdkConversationObject } from "@repo/redux-utils/src/utils/messaging/conversations-objects.ts";
import { updateCurrentConversation } from "@repo/redux-utils/src/slices/messaging/current-conversation-slice.ts";
import { type AppState } from "@repo/redux-utils/src/store.ts";
import { isMobilePhone, isEmail } from "validator";
import { useMessagesState } from "../../providers/messages-provider.tsx";
import {
  addChatParticipant,
  addConversation,
  addNonChatParticipant,
  unexpectedErrorNotification,
} from "../../utils.ts";
import { MessagesFileInput } from "./messages-file-input.tsx";
import MessageInput from "./message-input.tsx";
import MessageFile from "./message-file.tsx";

interface SendMessageProps {
  convoSid?: string;
  client: Client;
  messages?: ReduxMessage[];
  convo?: ReduxConversation;
  selectedContacts?: string[];
  droppedFiles: File[];
}

export default function MessageInputField(props: SendMessageProps) {
  const { setNewConvoLoading, session } = useMessagesState();
  const [message, setMessage] = useState("");
  const conversations = useSelector((state: AppState) => state.conversations);
  const participants = useSelector((state: AppState) => state.participants);

  const [files, setFiles] = useState<File[]>([]);
  // // needed to clear input type=file
  // const [filesInputKey, setFilesInputKey] = useState<string>("input-key");

  const dispatch = useDispatch();

  useEffect(() => {
    setMessage("");
    // setFiles([]);
    // setFilesInputKey(Date.now().toString());
  }, [props.convo]);

  useEffect(() => {
    const abortController = new AbortController();
    setFiles([...files, ...props.droppedFiles]);
    return () => {
      abortController.abort();
    };
  }, [props.droppedFiles]);

  const sdkConvo = useMemo(() => {
    if (props.convo) {
      return getSdkConversationObject(props.convo);
    }
  }, [props.convo?.sid]);

  const onFileRemove = (file: File) => {
    const existentFiles = files.filter((currentFile) => file !== currentFile);

    setFiles([...existentFiles]);
  };

  const handleNewConvoSend = async () => {
    const { selectedContacts } = props;
    if (!selectedContacts || selectedContacts.length === 0) return;

    setNewConvoLoading(true);

    // Check if conversation already exists
    const existingConvo =
      props.selectedContacts?.length === 1 &&
      conversations.find((convo) => {
        const participantsFiltered = participants[convo.sid].filter(
          (p) => p.identity !== session?.user?.email,
        );
        return (
          participantsFiltered.length === 1 &&
          participantsFiltered[0].address &&
          participantsFiltered[0].address === selectedContacts[0]
        );
      });

    if (existingConvo) {
      setNewConvoLoading(false);
      dispatch(updateCurrentConversation(existingConvo.sid));
      return getSdkConversationObject(existingConvo);
    }

    const { client } = props;

    // start conversation and send message
    try {
      // Check if all addresses are valid
      const validContactsPromise = selectedContacts.map(async (address) => {
        if (isEmail(address)) {
          try {
            await client.getUser(address);
          } catch (e) {
            let error = "Something went wrong";
            if (e instanceof Error) {
              error =
                e.message === "Not Found"
                  ? `User with email ${address} was not found on servihero.`
                  : `${address}: ${e.message}`;
            }
            ``;

            throw new Error(error);
          }
        } else if (isMobilePhone(address)) {
          return address;
        } else throw new Error(`Address '${address}' is not valid`);
      });

      await Promise.all(validContactsPromise);

      // add conversation
      const convo = await addConversation(
        selectedContacts.join(", "),
        dispatch,
        client,
      );

      const promises = selectedContacts.map(async (address) => {
        // If CHAT participant
        if (isEmail(address)) {
          return addChatParticipant(address, convo);
        }

        // If NON-CHAT participant (phone number, whatsapp)
        // TODO: Get actual proxy number
        else if (isMobilePhone(address)) {
          return addNonChatParticipant(
            address.toString(),
            "+18333510035",
            convo,
          );
        }
      });
      await Promise.all(promises);
      dispatch(updateCurrentConversation(convo.sid));
      setNewConvoLoading(false);
      return convo;
    } catch (e) {
      unexpectedErrorNotification(e);
    }

    setNewConvoLoading(false);
  };

  const onMessageSend = async () => {
    if (message.length === 0 && files.length === 0) {
      return;
    }

    let convo;

    if (!props.convo && props.selectedContacts) {
      // if new message
      convo = await handleNewConvoSend();

      if (!convo) return; // if convo has error, don't proceed
    } else if (props.convo) {
      convo = props.convo;
    } else {
      return;
    }

    const foundSdkConvo = getSdkConversationObject(convo);
    const newMessageBuilder = foundSdkConvo.prepareMessage().setBody(message);

    for (const file of files) {
      const fileData = new FormData();
      fileData.set(file.name, file, file.name);

      newMessageBuilder.addMedia(fileData);
    }

    setMessage("");
    setFiles([]);
    const messageIndex = await newMessageBuilder.build().send();

    try {
      await foundSdkConvo.advanceLastReadMessageIndex(messageIndex ?? 0);
    } catch (e) {
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
        <div className="mx-2 flex h-6 w-6 flex-shrink-0 items-center justify-center text-blue-600 hover:text-blue-700 focus:outline-none">
          <MessagesFileInput files={files} setFiles={setFiles} />
        </div>
        <div className="relative flex-grow">
          <MessageInput
            // assets={files}
            message={message}
            onChange={(e: string) => {
              void (async () => {
                await sdkConvo?.typing();
              })();
              setMessage(e);
            }}
            onEnterKeyPress={() => {
              void (async () => {
                await onMessageSend();
              })();
            }}
            // onFileRemove={onFileRemove}
          />
        </div>
        <button
          type="button"
          className="mx-2 flex h-6 w-6 flex-shrink-0 text-blue-600 hover:text-blue-700 focus:outline-none"
          onClick={() => {
            void (async () => {
              await onMessageSend();
            })();
          }}
          disabled={!message && files.length === 0}
        >
          <img
            alt=""
            src="/assets/icons/messaging/send.svg"
            className={`relative h-[26px] w-[26px] ${!message && files.length === 0 ? "grayscale" : ""}`}
          />
        </button>
      </div>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 px-2 pb-2">
          {files.map((file) => (
            <MessageFile
              key={`${file.name}_${file.size.toString()}`}
              media={{ filename: file.name, size: file.size }}
              onRemove={() => {
                onFileRemove(file);
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
