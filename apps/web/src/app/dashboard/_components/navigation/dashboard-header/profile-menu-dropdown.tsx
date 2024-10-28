import { LogOut, Settings, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui";
import React, { Fragment } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useGetAllOrganizationsQuery } from "@repo/redux-utils/src/endpoints/organization.ts";
import { Card } from "iconsax-react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { useDashboardState } from "@/src/providers/dashboard-provider.tsx";
import IconAccountProfile from "@/src/app/dashboard/_components/navigation/dashboard-header/icons/icon-account-profile.tsx";

interface ProfileMenuItems {
  key: string;
  items: ProfileMenuItem[];
  title?: string;
}

interface ProfileMenuItem {
  title: string;
  url?: string;
  onClick?: () => void;
  children?: ProfileMenuItem[];
  icon?: string | React.ReactNode;
}

interface ProfileMenuDropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function ProfileMenuDropdown({
  open,
  onOpenChange,
  children,
}: ProfileMenuDropdownProps) {
  const { currentOrg } = useDashboardState();
  const { data: organizations } = useGetAllOrganizationsQuery(undefined);

  const profileMenuItems: ProfileMenuItem[] = [
    {
      title: "Account Profile",
      icon: <IconAccountProfile className="size-5" />,
      url: "/dashboard/settings/personal-settings",
    },
    {
      title: "Billing",
      icon: <Card className="size-6 stroke-current" />,
      url: "/dashboard/settings/billing-overview",
    },
    {
      title: "Users",
      icon: <Users className="size-5" />,
      url: "/dashboard/settings/users",
    },
    {
      title: "Settings",
      icon: <Settings className="size-5" />,
      url: "/dashboard/settings",
    },
  ];

  const organizationMenuItems: ProfileMenuItem[] = [
    {
      title: currentOrg?.organization_name ?? "ServiHero",
      children: organizations
        ? [
            ...organizations.map((organization) => ({
              title: organization.organization_name,
              icon: <CheckIcon className="size-5 text-primary" />,
            })),
            // {
            //   title: "Add New Workspace",
            //   icon: <Plus className="mr-2 size-5" />,
            // },
          ]
        : undefined,
      icon: <CheckIcon className="size-5 text-primary" />,
    },
  ];

  const menuItems: ProfileMenuItems[] = [
    {
      key: "profile",
      items: profileMenuItems,
    },
    {
      key: "organizations",
      title: "Organizations",
      items: organizationMenuItems,
    },
    {
      key: "others",
      items: [
        {
          title: "Log out",
          icon: <LogOut className="size-5" />,
          onClick: () => void signOut({ redirectTo: "/" }),
        },
      ],
    },
  ];

  const renderMenuItem = (item: ProfileMenuItem) => (
    <DropdownMenuItem
      key={item.title}
      onClick={item.onClick}
      asChild={item.url !== undefined}
      className="cursor-pointer"
    >
      {item.url ? (
        <Link href={item.url} className="flex gap-3">
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ) : (
        <div className="flex gap-3">
          {item.icon}
          <span>{item.title}</span>
        </div>
      )}
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {menuItems.map((menuItem, index) => (
          <Fragment key={menuItem.key}>
            {menuItem.title ? (
              <DropdownMenuLabel>{menuItem.title}</DropdownMenuLabel>
            ) : null}
            <DropdownMenuGroup>
              {menuItem.items.map((item) =>
                item.children ? (
                  <DropdownMenuSub key={item.title}>
                    <DropdownMenuSubTrigger className="flex gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {item.children.map((subItem) =>
                          renderMenuItem(subItem),
                        )}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ) : (
                  renderMenuItem(item)
                ),
              )}
            </DropdownMenuGroup>
            {index !== menuItems.length - 1 ? <DropdownMenuSeparator /> : null}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
