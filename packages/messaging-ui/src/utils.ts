import type {
  Conversation,
  Message,
  Participant,
  Media,
  Client,
  Paginator,
  User,
} from "@twilio/conversations";
import type { ToastProps } from "@repo/ui/components/ui";
import { toast } from "@repo/ui/components/ui";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import type {
  ReduxMessage,
  ReduxParticipant,
} from "@repo/redux-utils/src/types/messaging/messaging";
import moment from "moment";
import { type Dispatch } from "react";
import { updateParticipants } from "@repo/redux-utils/src/slices/messaging/participants-slice.ts";
import { type Session } from "@repo/redux-utils/src";
import { truncate } from "@repo/hooks-and-utils/string-utils";
import { type UnknownAction } from "@reduxjs/toolkit";
import {
  CONVERSATION_PAGE_SIZE,
  PARTICIPANT_MESSAGES,
  USER_PROFILE_MESSAGES,
} from "./constants";

type ParticipantResponse = ReturnType<typeof Conversation.prototype.add>;

export async function addConversation(
  name: string,
  dispatch: Dispatch<UnknownAction>,
  client?: Client,
): Promise<Conversation> {
  if (client === undefined) {
    throw new Error(
      "Client is suddenly undefined, are you sure everything is ok?",
    );
  }

  if (name.length === 0) {
    throw new Error("Conversation name is empty");
  }

  try {
    const conversation = await client
      .createConversation
      // {
      //   uniqueName: name,
      // }
      ();
    await conversation.join();

    const participants = await conversation.getParticipants();
    dispatch(
      updateParticipants({
        participants,
        sid: conversation.sid,
      }),
    );

    return conversation;
  } catch (e) {
    unexpectedErrorNotification(e);
    throw e;
  }
}

export async function addChatParticipant(
  name: string,
  convo?: Conversation,
): Promise<ParticipantResponse> {
  if (convo === undefined) {
    throw new Error(
      "Conversation is suddenly undefined, are you sure everything is ok?",
    );
  }

  if (name.length === 0) {
    throw new Error("Participant name is empty");
  }

  try {
    const result = await convo.add(name);
    // successNotification(PARTICIPANT_MESSAGES.ADDED);
    return result;
  } catch (e) {
    unexpectedErrorNotification(e);
    throw e;
  }
}

export async function addNonChatParticipant(
  number: string,
  proxyNumber: string,
  convo?: Conversation,
): Promise<ParticipantResponse> {
  if (convo === undefined) {
    throw new Error(
      "Conversation is suddenly undefined, are you sure everything is ok?",
    );
  }

  if (number.length === 0 || proxyNumber.length === 0) {
    throw new Error(
      "Both participant number and proxy number must be specified",
    );
  }

  try {
    const result = await convo.addNonChatParticipant(proxyNumber, number);
    // successNotification(PARTICIPANT_MESSAGES.ADDED);

    return result;
  } catch (e) {
    await convo.delete();
    unexpectedErrorNotification(e);
    throw e;
  }
}

export async function readUserProfile(
  identity: string,
  client?: Client,
): Promise<User | undefined> {
  try {
    return await client?.getUser(identity);
  } catch (e) {
    unexpectedErrorNotification(e);
    throw e;
  }
}

export async function updateFriendlyName(
  friendlyName: string,
  user?: User,
): Promise<User | undefined> {
  try {
    const result = await user?.updateFriendlyName(friendlyName);
    successNotification(USER_PROFILE_MESSAGES.FRIENDLY_NAME_UPDATED);

    return result;
  } catch (e) {
    unexpectedErrorNotification(e);
    throw e;
  }
}

export const removeParticipant = async (
  conversation: Conversation,
  participant: Participant,
): Promise<void> => {
  try {
    await conversation.removeParticipant(participant);
    successNotification(PARTICIPANT_MESSAGES.REMOVED);
  } catch (e) {
    unexpectedErrorNotification(e);
    throw e;
  }
};

export const getBlobFile = async (media: Media): Promise<Blob> => {
  try {
    const url = await getFileUrl(media);
    const response = await fetch(url);
    return response.blob();
  } catch (e) {
    unexpectedErrorNotification(e);
    throw e;
  }
};

export const getFileUrl = async (media: Media): Promise<string> => {
  return await media.getContentTemporaryUrl().then();
};

export const getMessages = async (
  conversation: Conversation,
): Promise<Paginator<Message>> =>
  conversation.getMessages(CONVERSATION_PAGE_SIZE);

export function formatMessageTime(
  dateString: Date,
  lastMessage: boolean,
  use24hTimeFormat: boolean,
) {
  const date = new Date(dateString);
  const currentDate = new Date();

  if (lastMessage && currentDate.toDateString() !== date.toDateString()) {
    // If it's not the same day, show date.
    return date.toDateString();
  } else if (currentDate.getTime() - date.getTime() >= 3 * 60 * 60 * 1000) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !use24hTimeFormat,
    });
  }
  // Otherwise, use the TimeAgo library to format the relative time
  return moment(date).fromNow();
}

export function getMessageTime(message: ReduxMessage, on: boolean) {
  const dateCreated = message.dateCreated;

  if (!dateCreated) {
    return "";
  }

  return formatMessageTime(dateCreated, false, on);
}

export function getLastMessageTime(messages: ReduxMessage[], on: boolean) {
  const lastMessageDate = messages[messages.length - 1].dateCreated;

  if (!lastMessageDate) {
    return "";
  }

  return formatMessageTime(lastMessageDate, true, on);
}

export function getFirstMessagePerDate(messages: ReduxMessage[]) {
  // Group messages by dateCreated
  const messagesByDate: Record<string, typeof messages | undefined> = {};

  for (const message of messages) {
    if (message.dateCreated) {
      const dateKey = message.dateCreated.toDateString();
      if (!messagesByDate[dateKey]) {
        messagesByDate[dateKey] = [message];
      } else {
        const existingMessage = messagesByDate[dateKey]?.[0];
        if (
          existingMessage?.dateCreated &&
          message.dateCreated < existingMessage.dateCreated
        ) {
          messagesByDate[dateKey] = [message];
        }
      }
    }
  }

  // Extract sid values from the earliest messages per day
  const earliestSidsPerDay: string[] = [];
  for (const dateKey in messagesByDate) {
    const message = messagesByDate[dateKey];
    if (message) {
      earliestSidsPerDay.push(message[0].sid);
    }
  }

  return earliestSidsPerDay;
}

export function successNotification(
  message: string,
  addNotifications?: ToastProps,
) {
  toast({
    description: message,
    ...addNotifications,
  });
}

export function unexpectedErrorNotification(
  e: unknown,
  addNotifications?: ToastProps,
) {
  toast({
    variant: "destructive",
    description: getErrorMessage(e),
    ...addNotifications,
  });
}

export const getTypingMessage = (typingData: string[]): string =>
  typingData.length > 1
    ? `${typingData.length.toString()} participants are typing...`
    : `${typingData[0]} is typing...`;

export const getConvoParticipantsFormatted = (
  contactsMap: Record<string, string> | undefined,
  participants: ReduxParticipant[],
  session: Session | null,
) => {
  const convoParticipants = participants.filter(
    (p) => p.identity !== session?.user?.email,
  );

  const label =
    convoParticipants
      .map((p) =>
        p.address
          ? contactsMap?.[p.address] ?? p.address
          : p.identity?.split("@")[0],
      )
      .join(", ")
      .toString() || "Empty";

  return { label: truncate(label, 20), participants: convoParticipants };
};
