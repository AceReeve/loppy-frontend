"use server";

import MessagesProvider from "@repo/messaging-ui/messages-provider";
import { Button } from "@repo/ui/components/ui";
import React from "react";
import { auth } from "@/auth.ts";
import { getOrganizationsList } from "@/src/actions/organization-actions.ts";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) return;

  const organizationsList = await getOrganizationsList(session);
  const activeOrganization = organizationsList[0];

  return (
    <div className="flex h-full w-full items-center justify-center">
      {!activeOrganization.twilio_number ? (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-12 lg:px-24 lg:py-24">
          <div className="mb-12 flex w-full flex-col text-center">
            <h1 className="max-w-5xl text-2xl font-bold leading-none text-gray-600">
              Enable Messaging Access
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-gray-500">
              Your organization should purchase a number first to enable
              messaging
            </p>
            <Button asChild className="mt-4">
              <a href="/dashboard/settings/numbers">Buy a number</a>
            </Button>
          </div>
        </div>
      ) : (
        <MessagesProvider session={session} organization={activeOrganization}>
          {children}
        </MessagesProvider>
      )}
    </div>
  );
}
