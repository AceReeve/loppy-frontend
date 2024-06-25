"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type {
  ReduxConversation,
  ReduxMedia,
  ReduxMessage,
  ReduxParticipant,
} from "@repo/redux-utils/src/types/messaging/messaging";
import type { AppState } from "@repo/redux-utils/src/store.ts";
import {
  getSdkConversationObject,
  getSdkMediaObject,
  getSdkParticipantObject,
} from "@repo/redux-utils/src/utils/messaging/conversations-objects.ts";
import { updateUser } from "@repo/redux-utils/src/slices/messaging/users-slice.ts";
import wrap from "word-wrap";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import { ReplyIcon, SmileIcon } from "lucide-react";
import { More } from "iconsax-react";
import { cn } from "@repo/ui/utils";
import { useDropzone } from "react-dropzone";
import { addAttachments } from "@repo/redux-utils/src/slices/messaging/attachment-slice.ts";
import { saveAs } from "file-saver";
import { DefaultAvatar } from "@repo/ui/components/custom";
import { useMessagesState } from "../../providers/messages-provider.tsx";
import { MAX_FILE_SIZE, MAX_MESSAGE_LINE_WIDTH } from "../../constants.ts";
import { getBlobFile, getFirstMessagePerDate } from "../../utils.ts";
import MessageMedia from "./message-media.tsx";

interface MessageListProps {
  messages: ReduxMessage[];
  conversation: ReduxConversation;
  participants: ReduxParticipant[];
  lastReadIndex: number;
  handleDroppedFiles: (droppedFiles: File[]) => void;
}

export default function MessagesList(props: MessageListProps) {
  const { messages, conversation, lastReadIndex, handleDroppedFiles } = props;
  const { session, showReactionPicker, onReactionClick } = useMessagesState();
  const [activeMessageId, setActiveMessageId] = useState("");
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const myRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const users = useSelector((state: AppState) => state.users);
  const conversationAttachments = useSelector(
    (state: AppState) => state.attachment[conversation.sid],
  );

  // TODO: Add image preview
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- will be implemented soon
  const [imagePreview, setImagePreview] = useState<{
    message: ReduxMessage;
    file: Blob;
    sid: string;
  } | null>(null);

  const [horizonMessageCount, setHorizonMessageCount] = useState<number>(0);
  // const [showHorizonIndex, setShowHorizonIndex] = useState<number>(0);
  const [scrolledToHorizon, setScrolledToHorizon] = useState(false);
  const [firstMessagePerDay, setFirstMessagePerDay] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const today = new Date().toDateString();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    maxSize: MAX_FILE_SIZE,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".gif"],
    },
  });

  useEffect(() => {
    if (scrolledToHorizon || !myRef.current) {
      return;
    }
    myRef.current.scrollIntoView({
      behavior: "smooth",
    });
    setScrolledToHorizon(true);
  }, []);

  useEffect(() => {
    if (lastReadIndex === -1 || horizonMessageCount) {
      return;
    }
    // const showIndex = 0;
    void getSdkConversationObject(conversation)
      .getUnreadMessagesCount()
      .then((count) => {
        setHorizonMessageCount(count ?? 0);
        // setShowHorizonIndex(showIndex);
      });
  }, [messages, lastReadIndex]);

  // Updates the user list based on message authors to be able to get friendly names
  useEffect(() => {
    messages.forEach((message) => {
      const participant = message.participantSid
        ? participantsBySid.get(message.participantSid)
        : null;
      if (participant?.identity) {
        if (!users[participant.identity]) {
          const sdkParticipant = getSdkParticipantObject(participant);
          void sdkParticipant.getUser().then((sdkUser) => {
            dispatch(updateUser(sdkUser));
          });
        }
      }
      setFirstMessagePerDay(getFirstMessagePerDate(messages));
    });
  }, [messages]);

  useEffect(() => {
    const abortController = new AbortController();
    handleDroppedFiles(files);
    return () => {
      abortController.abort();
    };
  }, [files]);

  const onDownloadAttachments = async (message: ReduxMessage) => {
    const attachedMedia = message.attachedMedia?.map(getSdkMediaObject);
    if (message.index === -1) {
      return undefined;
    }
    if (!attachedMedia?.length) {
      return new Error("No media attached");
    }

    const promises = attachedMedia.map(async (media) => {
      const blob = await getBlobFile(media);
      dispatch(
        addAttachments({
          channelSid: props.conversation.sid,
          messageSid: message.sid,
          mediaSid: media.sid,
          attachment: blob,
        }),
      );
    });
    await Promise.all(promises);
  };

  const onFileOpen = (file: Blob, { filename }: ReduxMedia) => {
    saveAs(file, filename ?? "");
  };

  const participantsBySid = new Map(props.participants.map((p) => [p.sid, p]));

  const contextMenuItems = [
    {
      key: "more",
      icon: <More />,
      onClick: () => null,
    },
    {
      key: "reply",
      icon: <ReplyIcon />,
      onClick: () => null,
    },
    {
      key: "react-message",
      icon: <SmileIcon />,
      onClick: (
        e: React.MouseEvent<HTMLButtonElement>,
        message: ReduxMessage,
      ) => {
        setActiveMessageId(message.sid);
        showReactionPicker({
          event: e,
          message,
        });
      },
    },
  ];

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      activeMessageId &&
      refs.current[activeMessageId] &&
      !refs.current[activeMessageId]?.contains(event.target as Node)
    ) {
      setActiveMessageId("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [activeMessageId]);

  const renderContextMenu = (message: ReduxMessage) => {
    return (
      <>
        {contextMenuItems.map((item) => (
          <button
            className={cn(
              "mx-0.5 h-8 w-8 flex-shrink-0 items-center rounded-full p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:outline-none group-hover:flex",
              message.sid !== activeMessageId ? "hidden" : "flex",
            )}
            key={item.key}
            onClick={(e) => {
              item.onClick(e, message);
            }}
            type="button"
          >
            {item.icon}
          </button>
        ))}
      </>
    );
  };

  return (
    <div className="relative" {...getRootProps()}>
      <input {...getInputProps()} />
      {messages.map((message) => {
        const messageImages: ReduxMedia[] = [];
        const messageFiles: ReduxMedia[] = [];
        const currentDateCreated = message.dateCreated ?? null;
        (message.attachedMedia ?? []).forEach((file) => {
          const { contentType } = file;
          if (contentType.includes("image")) {
            messageImages.push(file);
            return;
          }
          messageFiles.push(file);
        });
        const attributes = message.attributes as Record<
          string,
          string | undefined
        >;
        const reactions = attributes.reactions as
          | Record<string, string[] | undefined>
          | undefined;

        const reactionsCount = reactions
          ? Object.values(reactions).reduce(
              (acc, current) => acc + (current ?? []).length,
              0,
            )
          : 0;

        const wrappedBody = wrap(message.body ?? "", {
          width: MAX_MESSAGE_LINE_WIDTH,
          indent: "",
          cut: true,
        });

        const isOutbound = message.author === session?.user?.email;

        return (
          <div
            className={`group mt-1 ${reactionsCount ? "mb-6" : ""}`}
            key={message.sid}
          >
            {currentDateCreated && firstMessagePerDay.includes(message.sid) ? (
              <p className="p-4 text-center text-sm text-gray-500">
                {" "}
                {currentDateCreated.toDateString() === today
                  ? "Today"
                  : currentDateCreated.toDateString()}
              </p>
            ) : null}
            <div
              className={`flex flex-row ${isOutbound ? "justify-end" : "justify-start"}`}
              key={`${message.sid}.message`}
            >
              <div className="messages grid grid-flow-row gap-2 text-sm text-gray-800">
                <div
                  className={`relative flex ${isOutbound ? "flex-row-reverse" : "flex-row"} items-center`}
                  ref={(el) => (refs.current[message.sid] = el)}
                >
                  {!isOutbound && (
                    <div className="relative mr-4 flex h-8 w-8 flex-shrink-0">
                      <DefaultAvatar
                        image=""
                        name={conversation.friendlyName ?? ""}
                      />
                    </div>
                  )}

                  <div
                    className={`relative ml-2 max-w-xs rounded-lg ${isOutbound ? "bg-sky-200 dark:bg-blue-800" : "bg-white"} px-4 py-2 lg:max-w-md`}
                  >
                    {wrappedBody}
                    <MessageMedia
                      attachments={conversationAttachments?.[message.sid]}
                      files={messageFiles}
                      images={messageImages}
                      key={message.sid}
                      onDownload={async () =>
                        await onDownloadAttachments(message)
                      }
                      onOpen={(
                        mediaSid: string,
                        image?: ReduxMedia,
                        file?: ReduxMedia,
                      ) => {
                        if (file) {
                          onFileOpen(
                            conversationAttachments[message.sid][mediaSid],
                            file,
                          );
                          return;
                        }
                        if (image) {
                          setImagePreview({
                            message,
                            file: conversationAttachments[message.sid][
                              mediaSid
                            ],
                            sid: mediaSid,
                          });
                        }
                      }}
                      sending={message.index === -1}
                    />

                    <div
                      className={`absolute -bottom-[16px] flex gap-0.5 ${isOutbound ? "right-0" : "left-0"}`}
                    >
                      {reactions
                        ? Object.entries(reactions).map(([key, value]) => {
                            if (!value || value.length === 0) return null;
                            return (
                              <button
                                className="bg-card flex gap-0.5 rounded-lg border-gray-200 p-1 hover:bg-gray-100"
                                key={key}
                                onClick={() => {
                                  onReactionClick(key, message);
                                }}
                                type="button"
                              >
                                <Emoji
                                  emojiStyle={EmojiStyle.FACEBOOK}
                                  size={15}
                                  unified={key}
                                />
                                <p className="font-source-code-pro text-xs">
                                  {value.length}
                                </p>
                              </button>
                            );
                          })
                        : null}
                    </div>
                  </div>
                  {renderContextMenu(message)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
