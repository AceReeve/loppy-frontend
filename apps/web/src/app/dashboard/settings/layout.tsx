"use client";

import { usePathname } from "next/navigation";
import { VerticalMenu, VerticalMenuLink } from "@repo/ui/components/ui";
import React from "react";
import { cn } from "@repo/ui/utils";
import { type MenuLinkItem } from "@/src/types/types";
import IconOrganizationSettings from "@/src/app/dashboard/settings/icons/icon-organization-settings.tsx";
import IconUsers from "@/src/app/dashboard/settings/icons/icon-users.tsx";
import IconTeams from "@/src/app/dashboard/settings/icons/icon-teams.tsx";
import IconNumbers from "@/src/app/dashboard/settings/icons/icon-numbers.tsx";
import IconInboxes from "@/src/app/dashboard/settings/icons/icon-inboxes.tsx";
import IconIntegrations from "@/src/app/dashboard/settings/icons/icon-integrations.tsx";
import IconCompliance from "@/src/app/dashboard/settings/icons/icon-compliance.tsx";
import IconPersonalSettings from "@/src/app/dashboard/settings/icons/icon-personal-settings.tsx";
import IconReferrals from "@/src/app/dashboard/settings/icons/icon-referrals.tsx";
import IconBillingOverview from "@/src/app/dashboard/settings/icons/icon-billing-overview.tsx";
import IconCreditUsage from "@/src/app/dashboard/settings/icons/icon-credit-usage.tsx";
import IconOAuthApplications from "@/src/app/dashboard/settings/icons/icon-oauth-applications.tsx";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const rootSlug = "/dashboard/settings";
  const iconClass = "size-5 fill-gray-500";
  const activeIconClass = "fill-primary";

  const menuItems: MenuLinkItem[] = [
    {
      title: "Organization",
      id: 0,
      url: "",
      children: [
        {
          title: "Organization Settings",
          icon: <IconOrganizationSettings />,
          url: "/organization-settings",
          id: 0,
        },
        {
          title: "Users",
          icon: <IconUsers />,
          url: "/users",
          id: 1,
        },
        {
          title: "Teams",
          icon: <IconTeams />,
          url: "/teams",
          id: 2,
        },
        {
          title: "Inboxes",
          icon: <IconInboxes />,
          url: "/inboxes",
          id: 3,
        },
        {
          title: "Numbers",
          icon: <IconNumbers />,
          url: "/numbers",
          id: 4,
        },
        {
          title: "Integrations",
          icon: <IconIntegrations />,
          url: "/integrations",
          id: 5,
        },
        {
          title: "Compliance",
          icon: <IconCompliance />,
          url: "/compliance",
          id: 6,
        },
      ],
    },
    {
      title: "Personal",
      id: 1,
      url: "",
      children: [
        {
          title: "Personal Settings",
          icon: <IconPersonalSettings />,
          url: "/personal-settings",
          id: 7,
        },
        {
          title: "Referrals",
          icon: <IconReferrals />,
          url: "/referrals",
          id: 8,
        },
      ],
    },
    {
      title: "Billing",
      id: 2,
      url: "",
      children: [
        {
          title: "Billing Overview",
          icon: <IconBillingOverview />,
          url: "/billing-overview",
          id: 9,
        },
        {
          title: "Credit Usage",
          icon: <IconCreditUsage />,
          url: "/credit-usage",
          id: 10,
        },
      ],
    },
    {
      title: "Developer Settings",
      id: 3,
      url: "",
      children: [
        {
          title: "OAuth Applications",
          icon: <IconOAuthApplications />,
          url: "/oauth-applications",
          id: 11,
        },
        {
          title: "Public API Tokens",
          icon: <IconOAuthApplications />,
          url: "/public-api-tokens",
          id: 12,
        },
        {
          title: "Authorized Apps",
          icon: <IconOAuthApplications />,
          url: "/authorized-apps",
          id: 13,
        },
      ],
    },
  ];

  const renderMenuIcon = (
    icon: MenuLinkItem["icon"],
    imageIcon: MenuLinkItem["imageIcon"],
    active: boolean,
  ) => <div className={cn(iconClass, active && activeIconClass)}>{icon}</div>;

  return (
    <div className="relative mr-10 mt-10 flex gap-3">
      <div className="flex flex-col gap-2">
        <VerticalMenu>
          {menuItems.map((menu) => (
            <div
              key={menu.id}
              className="flex w-full flex-col border-b border-gray-200 py-2 last-of-type:border-b-0"
            >
              <div className="mx-6 w-full py-3 font-poppins text-xs font-normal uppercase tracking-tight text-gray-400 dark:text-primary">
                {menu.title}
              </div>
              {menu.children?.map((menuItem) => (
                <VerticalMenuLink
                  href={rootSlug + menuItem.url}
                  active={rootSlug + menuItem.url === pathName}
                  key={menuItem.id}
                >
                  {renderMenuIcon(
                    menuItem.icon,
                    menuItem.imageIcon,
                    rootSlug + menuItem.url === pathName,
                  )}
                  {menuItem.title}
                </VerticalMenuLink>
              ))}
            </div>
          ))}
        </VerticalMenu>
      </div>

      <div className="relative w-full rounded-3xl bg-card">{children}</div>
    </div>
  );
}
