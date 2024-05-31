"use client";
import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ReduxConversation,
  ReduxMedia,
  ReduxMessage,
  ReduxParticipant,
} from "@repo/redux-utils/src/types/messaging/messaging";
import { useMessagesState } from "@/src/providers/messages-provider.tsx";
import { AppState } from "@repo/redux-utils/src/store.ts";
import {
  getSdkConversationObject,
  getSdkParticipantObject,
} from "@repo/redux-utils/src/utils/messaging/conversations-objects.ts";
import { updateUser } from "@repo/redux-utils/src/slices/messaging/users-slice.ts";
import { MAX_MESSAGE_LINE_WIDTH } from "@/src/constants.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui";
import wrap from "word-wrap";
import { getFirstMessagePerDate, getMessageTime } from "@/src/utils.ts";

interface MessageListProps {
  messages: ReduxMessage[];
  conversation: ReduxConversation;
  participants: ReduxParticipant[];
  lastReadIndex: number;
  // handleDroppedFiles: (droppedFiles: File[]) => void;
}

function MetaItemWithMargin({ children }: { children: ReactNode }) {
  return <div className="mt-2 flex flex-row justify-start">{children}</div>;
}

export default function MessagesList(props: MessageListProps) {
  const {
    messages,
    conversation,
    lastReadIndex,
    // handleDroppedFiles,
  } = props;
  const { session } = useMessagesState();

  // const theme = useTheme();
  const myRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  // const conversationAttachments = useSelector(
  //   (state: AppState) => state.attachments[conversation.sid],
  // );

  const users = useSelector((state: AppState) => state.users);

  // const [imagePreview, setImagePreview] = useState<{
  //   message: ReduxMessage;
  //   file: Blob;
  //   sid: string;
  // } | null>(null);

  const [horizonMessageCount, setHorizonMessageCount] = useState<number>(0);
  // const [showHorizonIndex, setShowHorizonIndex] = useState<number>(0);
  const [scrolledToHorizon, setScrollToHorizon] = useState(false);
  const [firstMessagePerDay, setFirstMessagePerDay] = useState<string[]>([]);
  // const [files, setFiles] = useState<File[]>([]);

  const today = new Date().toDateString();

  // const onDrop = useCallback((acceptedFiles: File[]) => {
  //   setFiles(acceptedFiles);
  // }, []);
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  //   noClick: true,
  //   noKeyboard: true,
  //   maxSize: MAX_FILE_SIZE,
  //   accept: {
  //     "image/*": [".png", ".jpeg", ".jpg", ".gif"],
  //   },
  // });

  useEffect(() => {
    if (scrolledToHorizon || !myRef.current) {
      return;
    }
    myRef.current.scrollIntoView({
      behavior: "smooth",
    });
    setScrollToHorizon(true);
  });

  useEffect(() => {
    if (lastReadIndex === -1 || horizonMessageCount) {
      return;
    }
    // const showIndex = 0;
    getSdkConversationObject(conversation)
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
      if (participant && participant.identity) {
        if (!users[participant.identity]) {
          const sdkParticipant = getSdkParticipantObject(participant);
          sdkParticipant.getUser().then((sdkUser) => {
            dispatch(updateUser(sdkUser));
          });
        }
      }
      setFirstMessagePerDay(getFirstMessagePerDate(messages));
    });
  }, [messages]);

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   handleDroppedFiles(files);
  //   return () => {
  //     abortController.abort();
  //   };
  // }, [files]);

  // function setTopPadding(index: number) {
  //   if (
  //     props.messages[index] !== undefined &&
  //     props.messages[index - 1] !== undefined &&
  //     props.messages[index].author === props.messages[index - 1].author
  //   ) {
  //     return theme.space.space20;
  //   }
  //   return theme.space.space50;
  // }

  // const onDownloadAttachments = async (message: ReduxMessage) => {
  //   const attachedMedia = message.attachedMedia?.map(getSdkMediaObject);
  //   if (message.index === -1) {
  //     return undefined;
  //   }
  //   if (!attachedMedia?.length) {
  //     return new Error("No media attached");
  //   }
  //
  //   for (const media of attachedMedia) {
  //     const blob = await getBlobFile(media, addNotifications);
  //     addAttachment(props.conversation.sid, message.sid, media.sid, blob);
  //   }
  //
  //   return;
  // };
  //
  // const onFileOpen = (file: Blob, { filename }: ReduxMedia) => {
  //   saveAs(file, filename ?? "");
  // };

  const participantsBySid = new Map(props.participants.map((p) => [p.sid, p]));

  const getAuthorFriendlyName = (message: ReduxMessage) => {
    const author = message.author ?? "";
    if (message.participantSid === null) return author;

    const participant = participantsBySid.get(message.participantSid);
    if (participant === null || participant.identity === null) return author;

    const user = users[participant.identity];
    return user?.friendlyName || author;
  };

  if (messages === undefined) {
    return <div className="empty" />;
  }
  return (
    <>
      {messages.map((message) => {
        const messageImages: ReduxMedia[] = [];
        const messageFiles: ReduxMedia[] = [];
        const currentDateCreated = message.dateCreated ?? null;
        (message.attachedMedia || []).forEach((file) => {
          const { contentType } = file;
          if (contentType.includes("image")) {
            messageImages.push(file);
            return;
          }
          messageFiles.push(file);
        });
        const attributes = message.attributes;

        const wrappedBody = wrap(message.body ?? "", {
          width: MAX_MESSAGE_LINE_WIDTH,
          indent: "",
          cut: true,
        });

        const isOutbound = message.author === session?.user?.email;
        let metaItems = [
          // <ChatMessageMetaItem key={0}>
          //   <Reactions
          //     reactions={attributes.reactions}
          //     onReactionsChanged={(reactions) => {
          //       getSdkMessageObject(message).updateAttributes({
          //         ...attributes,
          //         reactions,
          //       });
          //     }}
          //   />
          // </ChatMessageMetaItem>,
          // <MetaItemWithMargin key={1}>
          //   <MessageStatus
          //     message={message}
          //     channelParticipants={props.participants}
          //   />
          // </MetaItemWithMargin>,
          <MetaItemWithMargin key={2}>
            {isOutbound
              ? `${getAuthorFriendlyName(message)}・${getMessageTime(
                  message,
                  true,
                )}`
              : `${getMessageTime(
                  message,
                  true,
                )}・${getAuthorFriendlyName(message)}`}
          </MetaItemWithMargin>,
        ];

        if (isOutbound) {
          metaItems = metaItems.reverse();
        }

        return (
          <div key={message.sid} className="mt-1">
            {currentDateCreated && firstMessagePerDay.includes(message.sid) && (
              <p className="p-4 text-center text-sm text-gray-500">
                {" "}
                {currentDateCreated.toDateString() === today
                  ? "Today"
                  : currentDateCreated.toDateString()}
              </p>
            )}
            <div
              className={`flex flex-row ${isOutbound ? "justify-end" : "justify-start"}`}
              key={`${message.sid}.message`}
            >
              <div className="messages grid grid-flow-row gap-2 text-sm text-gray-800">
                <div
                  className={`group flex ${isOutbound ? "flex-row-reverse" : "flex-row"} items-center`}
                >
                  {!isOutbound && (
                    <div className={`relative mr-4 flex h-8 w-8 flex-shrink-0`}>
                      {/*<img*/}
                      {/*  className="h-full w-full rounded-full object-cover shadow-md"*/}
                      {/*  src="/assets/images/abe-lincoln.jpeg"*/}
                      {/*  alt=""*/}
                      {/*/>*/}
                      <Avatar className="size-8">
                        <AvatarImage
                          className="object-cover"
                          src="/assets/images/abe-lincoln.jpeg"
                        />
                        <AvatarFallback>EX</AvatarFallback>
                      </Avatar>
                    </div>
                  )}

                  <p
                    className={`max-w-xs rounded-lg ${isOutbound ? "bg-sky-200 dark:bg-blue-800" : "bg-white"} px-4 py-2 lg:max-w-md`}
                  >
                    {wrappedBody}
                    {/*<MessageMedia*/}
                    {/*  key={message.sid}*/}
                    {/*  attachments={conversationAttachments?.[message.sid]}*/}
                    {/*  onDownload={async () =>*/}
                    {/*    await onDownloadAttachments(message)*/}
                    {/*  }*/}
                    {/*  images={messageImages}*/}
                    {/*  files={messageFiles}*/}
                    {/*  sending={message.index === -1}*/}
                    {/*  onOpen={(*/}
                    {/*    mediaSid: string,*/}
                    {/*    image?: ReduxMedia,*/}
                    {/*    file?: ReduxMedia,*/}
                    {/*  ) => {*/}
                    {/*    if (file) {*/}
                    {/*      onFileOpen(*/}
                    {/*        conversationAttachments?.[message.sid][mediaSid],*/}
                    {/*        file,*/}
                    {/*      );*/}
                    {/*      return;*/}
                    {/*    }*/}
                    {/*    if (image) {*/}
                    {/*      setImagePreview({*/}
                    {/*        message,*/}
                    {/*        file: conversationAttachments?.[message.sid][*/}
                    {/*          mediaSid*/}
                    {/*        ],*/}
                    {/*        sid: mediaSid,*/}
                    {/*      });*/}
                    {/*    }*/}
                    {/*  }}*/}
                    {/*/>*/}
                  </p>
                  <button
                    type="button"
                    className="mx-2 flex hidden h-8 w-8 flex-shrink-0 rounded-full bg-white p-2 text-gray-500 group-hover:block hover:bg-gray-200 hover:text-gray-900 focus:outline-none"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="h-full w-full fill-current"
                    >
                      <path
                        d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
	 M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
	C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="mx-2 flex hidden h-8 w-8 flex-shrink-0 rounded-full bg-white p-2 text-gray-500 group-hover:block hover:bg-gray-200 hover:text-gray-900 focus:outline-none"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="h-full w-full fill-current"
                    >
                      <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="mx-2 flex hidden h-8 w-8 flex-shrink-0 rounded-full bg-white p-2 text-gray-500 group-hover:block hover:bg-gray-200 hover:text-gray-900 focus:outline-none"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-full w-full fill-current"
                    >
                      <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              {/*<div aria-label={`said by ${getAuthorFriendlyName(message)}`}>*/}
              {/*  {metaItems}*/}
              {/*</div>*/}
            </div>
          </div>
          // todo: delete only when full functionality is transferred over
          // <div key={message.sid + "message"}>
          //   {lastReadIndex !== -1 &&
          //   horizonMessageCount &&
          //   showHorizonIndex === message.index ? (
          //     <Horizon ref={myRef} messageCount={horizonMessageCount} />
          //   ) : null}
          //   <MessageView
          //     reactions={attributes["reactions"]}
          //     text={wrappedBody}
          //     media={
          //       message.attachedMedia?.length ? (
          //         <MessageMedia
          //           key={message.sid}
          //           attachments={conversationAttachments?.[message.sid]}
          //           onDownload={async () =>
          //             await onDownloadAttachments(message)
          //           }
          //           images={messageImages}
          //           files={messageFiles}
          //           sending={message.index === -1}
          //           onOpen={(
          //             mediaSid: string,
          //             image?: ReduxMedia,
          //             file?: ReduxMedia
          //           ) => {
          //             if (file) {
          //               onFileOpen(
          //                 conversationAttachments?.[message.sid][mediaSid],
          //                 file
          //               );
          //               return;
          //             }
          //             if (image) {
          //               setImagePreview({
          //                 message,
          //                 file: conversationAttachments?.[message.sid][
          //                   mediaSid
          //                 ],
          //                 sid: mediaSid,
          //               });
          //             }
          //           }}
          //         />
          //       ) : null
          //     }
          //     author={message.author ?? ""}
          //     getStatus={getMessageStatus(message, props.participants)}
          //     onDeleteMessage={async () => {
          //       try {
          //         await getSdkMessageObject(message).remove();
          //         successNotification({
          //           message: "Message deleted.",
          //           addNotifications,
          //         });
          //       } catch (e) {
          //         unexpectedErrorNotification(e.message, addNotifications);
          //       }
          //     }}
          //     topPadding={setTopPadding(index)}
          //     lastMessageBottomPadding={index === messagesLength - 1 ? 16 : 0}
          //     sameAuthorAsPrev={setTopPadding(index) !== theme.space.space20}
          //     messageTime={getMessageTime(message)}
          //     updateAttributes={(attribute) =>
          //       getSdkMessageObject(message).updateAttributes({
          //         ...attributes,
          //         ...attribute,
          //       })
          //     }
          //   />
          // </div>
        );
      })}
      {/*{imagePreview*/}
      {/*  ? (function () {*/}
      {/*      const dateString = imagePreview?.message.dateCreated;*/}
      {/*      const date = dateString ? new Date(dateString) : "";*/}
      {/*      return (*/}
      {/*        <ImagePreviewModal*/}
      {/*          image={imagePreview.file}*/}
      {/*          isOpen={!!imagePreview}*/}
      {/*          author={*/}
      {/*            imagePreview*/}
      {/*              ? getAuthorFriendlyName(imagePreview.message)*/}
      {/*              : ""*/}
      {/*          }*/}
      {/*          date={*/}
      {/*            date*/}
      {/*              ? date.toDateString() +*/}
      {/*                ", " +*/}
      {/*                date.getHours() +*/}
      {/*                ":" +*/}
      {/*                (date.getMinutes() < 10 ? "0" : "") +*/}
      {/*                date.getMinutes()*/}
      {/*              : ""*/}
      {/*          }*/}
      {/*          handleClose={() => setImagePreview(null)}*/}
      {/*          onDownload={() => {*/}
      {/*            saveAs(*/}
      {/*              imagePreview.file,*/}
      {/*              imagePreview.message.attachedMedia?.find(*/}
      {/*                ({ sid }) => sid === imagePreview.sid,*/}
      {/*              )?.filename ?? "",*/}
      {/*            );*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      );*/}
      {/*    })()*/}
      {/*  : null}*/}
    </>
  );
}
