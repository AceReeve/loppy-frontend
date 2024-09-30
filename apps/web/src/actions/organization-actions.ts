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
  organizationId: string,
  session: Session,
): Promise<GetAllInboxesResponse[]> {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not detected");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/twilio-messaging/inboxes/${organizationId}`,
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
      next: {
        tags: ["organization"],
      },
    },
  );

  return response.json() as Promise<GetAllInboxesResponse[]>;
}
