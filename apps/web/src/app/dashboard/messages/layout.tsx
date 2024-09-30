"use server";

import MessagesProvider from "@repo/messaging-ui/messages-provider";
import React from "react";
import { auth } from "@/auth.ts";
import {
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

  const organizationsList = await getOrganizationsList(session);
  const activeOrganization = organizationsList.length
    ? organizationsList[0]
    : null;

  if (!activeOrganization) return;

  const inboxesList = await getInboxes(activeOrganization._id, session);
  const activeInbox = inboxesList.length ? inboxesList[0] : null;

  if (!activeInbox) return;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <MessagesProvider
        session={session}
        organization={activeOrganization}
        inbox={activeInbox}
      >
        {children}
      </MessagesProvider>
    </div>
  );
}
