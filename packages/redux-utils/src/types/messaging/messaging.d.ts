import {
  type JSONValue,
  type Message,
  type Participant,
} from "@twilio/conversations";

export type AddMessagesType = (channelSid: string, messages: Message[]) => void;
export type SetSidType = (sid: string) => void;

export type SetParticipantsType = (
  participants: Participant[],
  sid: string,
) => void;

export type SetUnreadMessagesType = (
  channelSid: string,
  unreadCount: number,
) => void;

export interface ReduxConversation {
  sid: string;
  friendlyName: string | null;
  dateUpdated: Date | null;
  notificationLevel: "default" | "muted";
  lastReadMessageIndex: number | null;
  lastMessage?: {
    index?: number;
    dateCreated?: Date;
  };
}

export interface ReduxMessage {
  sid: string;
  index: number;
  body: string | null;
  author: string | null;
  attributes: JSONValue;
  participantSid: string | null;
  dateCreated: Date | null;
  attachedMedia: ReduxMedia[] | null;
  aggregatedDeliveryReceipt: {
    total: number;
    sent: DeliveryAmount;
    delivered: DeliveryAmount;
    read: DeliveryAmount;
    undelivered: DeliveryAmount;
    failed: DeliveryAmount;
  } | null;
}

export interface ReduxUser {
  identity: string;
  friendlyName: string;
}

export interface ReduxMedia {
  sid: string;
  filename: string | null;
  contentType: string;
  size: number;
  category: "media" | "body" | "history";
}

export interface ReduxParticipant {
  sid: string;
  attributes: JSONValue;
  identity: string | null;
  type: ParticipantType;
  lastReadMessageIndex: number | null;
  address?: string;
}
