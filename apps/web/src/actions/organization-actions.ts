"use server";

import type { Session } from "next-auth";
import type { GetOrganizationResponse } from "@repo/redux-utils/src/endpoints/types/organization";
import { type GetAllInboxesResponse } from "@repo/redux-utils/src/endpoints/types/inboxes";

export async function getOrganizationsList(
  session: Session,
): Promise<GetOrganizationResponse[]> {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not detected");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/twilio-messaging/organizations`,
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
      next: {
        tags: ["organization"],
      },
    },
  );

  return response.json() as Promise<GetOrganizationResponse[]>;
}

export async function getInboxes(
  session: Session,
): Promise<GetAllInboxesResponse[]> {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not detected");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/twilio-messaging/inboxes`,
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
      next: {
        tags: ["inbox"],
      },
    },
  );

  return response.json() as Promise<GetAllInboxesResponse[]>;
}

export async function getActiveInbox(
  session: Session,
): Promise<GetAllInboxesResponse | undefined> {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not detected");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/twilio-messaging/get-activated-inbox`,
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
      next: {
        tags: ["inbox"],
      },
    },
  );

  return response.json() as Promise<GetAllInboxesResponse | undefined>;
}
