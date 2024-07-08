"use client";

import { usePathname } from "next/navigation";
import { TabsLink, TabsNav } from "@repo/ui/components/ui";
import React from "react";
import { type MenuLinkItem } from "@/src/types/types";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const rootSlug = "/dashboard/settings";

  const links: MenuLinkItem[] = [
    {
      title: "Messaging (Twilio)",
      url: "/messaging",
      id: 0,
    },
    {
      title: "Connected Accounts",
      url: "/connected-account",
      id: 1,
    },
    {
      title: "Notifications",
      url: "/notifications",
      id: 2,
    },
  ];

  return (
    <div className="m-10 rounded-xl bg-card p-10">
      <div className="font-poppins text-4xl font-medium text-gray-800">
        Settings
      </div>
      <TabsNav className="mt-8 w-full">
        {links.map((link) => (
          <TabsLink
            href={rootSlug + link.url}
            active={rootSlug + link.url === pathName}
            key={link.id}
          >
            {link.title}
          </TabsLink>
        ))}
      </TabsNav>
      <div className="mt-6">{children}</div>
    </div>
  );
}
