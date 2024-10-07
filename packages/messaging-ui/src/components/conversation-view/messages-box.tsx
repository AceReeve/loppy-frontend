import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ReduxConversation,
  ReduxMessage,
  ReduxParticipant,
} from "@repo/redux-utils/src/types/messaging/messaging";
import type { Client, Message, Paginator } from "@twilio/conversations";
import { getSdkConversationObject } from "@repo/redux-utils/src/utils/messaging/conversations-objects.ts";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { useDispatch } from "react-redux";
import { pushMessages } from "@repo/redux-utils/src/slices/messaging/message-list-slice.ts";
import { getMessages } from "../../utils.ts";
import { CONVERSATION_PAGE_SIZE } from "../../constants.ts";
import MessagesList from "./messages-list.tsx";

interface MessageProps {
  convoSid: string;
  client?: Client;
  convo: ReduxConversation;
  messages: ReduxMessage[];
  participants: ReduxParticipant[];
  lastReadIndex: number;
  handleDroppedFiles: (droppedFiles: File[]) => void;
}

export default function MessagesBox(props: MessageProps) {
  const {
    messages,
    convo,
    lastReadIndex,
    // use24hTimeFormat,
    handleDroppedFiles,
  } = props;

  const [hasMore, setHasMore] = useState(
    messages.length === CONVERSATION_PAGE_SIZE,
  );
  const [loading, setLoading] = useState(false);
  const [height, setHeight] = useState(0);
  const [paginator, setPaginator] = useState<Paginator<Message> | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const sdkConvo = useMemo(() => getSdkConversationObject(convo), [convo.sid]);

  useLayoutEffect(() => {
    const currentHeight = listRef.current?.clientHeight;
    if (currentHeight && currentHeight > height && loading) {
      // for preventing immediate downloading of the next messages page
      setTimeout(() => {
        setHeight(currentHeight);
        setLoading(false);
      }, 2000);
    }
  }, [listRef.current?.clientHeight]);

  useEffect(() => {
    void getMessages(sdkConvo).then((p) => {
      setHasMore(p.hasPrevPage);
      setPaginator(p);
    });
  }, [convo]);

  useEffect(() => {
    if (messages.length && messages[messages.length - 1].index !== -1) {
      void sdkConvo.advanceLastReadMessageIndex(
        messages[messages.length - 1].index,
      );
    }
  }, [messages, convo]);

  const lastConversationReadIndex = useMemo(
    () =>
      messages.length &&
      messages[messages.length - 1].author !== localStorage.getItem("username")
        ? lastReadIndex
        : -1,
    [lastReadIndex, messages],
  );

  const fetchMore = async () => {
    if (!paginator) {
      return;
    }

    const result = await paginator.prevPage();
    const moreMessages = result.items;

    setLoading(true);
    setPaginator(result);
    setHasMore(result.hasPrevPage);
    dispatch(
      pushMessages({
        channelSid: convo.sid,
        messages: moreMessages,
      }),
    );
  };

  return (
    <div
      className="custom-scrollbar-neutral chat-body flex-1 overflow-y-scroll bg-gray-100"
      id="scrollable"
      key={convo.sid}
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        width: "100%",
        overflowY: "auto",
        paddingLeft: 16,
        height: "100%",
      }}
    >
      <InfiniteScroll
        dataLength={messages.length}
        hasMore={!loading && hasMore}
        inverse
        loader={<LoadingSpinner />}
        next={fetchMore}
        scrollThreshold="20px"
        scrollableTarget="scrollable"
        style={{
          display: "flex",
          overflow: "hidden",
          flexDirection: "column-reverse",
          paddingBottom: 20,
          minHeight: "600px",
        }}
      >
        <div ref={listRef}>
          <MessagesList
            conversation={convo}
            handleDroppedFiles={handleDroppedFiles}
            lastReadIndex={lastConversationReadIndex}
            messages={messages}
            participants={props.participants}
          />
        </div>
      </InfiniteScroll>
    </div>
  );
}
