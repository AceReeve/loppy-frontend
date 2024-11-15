"use server";

import MessagesProvider from "@repo/messaging-ui/messages-provider";
import React from "react";
import { auth } from "@/auth.ts";
import {
  getActiveInbox,
  getInboxes,
  getOrganizationsList,
} from "@/src/actions/organization-actions.ts";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) return;

  const organizationsPromise = getOrganizationsList(session);

  const inboxesListPromise = getInboxes(session);
  const activeInboxPromise = getActiveInbox(session);

  const [organizationsListData, inboxesListData, activeInboxData] =
    await Promise.all([
      organizationsPromise,
      inboxesListPromise,
      activeInboxPromise,
    ]);

  const activeOrganization = organizationsListData.length
    ? organizationsListData[0]
    : null;

  const activeInbox =
    activeInboxData ?? (inboxesListData.length ? inboxesListData[0] : null);

  if (!activeInbox || !activeOrganization) return;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <MessagesProvider
        session={session}
        organization={activeOrganization}
        inbox={activeInbox}
        inboxesList={inboxesListData}
      >
        {children}
      </MessagesProvider>
    </div>
  );
}
