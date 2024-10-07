import {
  Check,
  CreditCard,
  LogOut,
  Plus,
  Settings,
  User,
  Users,
} from "lucide-react";
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
  const { data: organizations } = useGetAllOrganizationsQuery(undefined);

  const profileMenuItems: ProfileMenuItem[] = [
    {
      title: "Profile",
      icon: <User className="mr-2 h-4 w-4" />,
      url: "/dashboard/settings/personal-settings",
    },
    {
      title: "Billing",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      url: "/dashboard/settings/billing-overview",
    },
    {
      title: "Users",
      icon: <Users className="mr-2 h-4 w-4" />,
      url: "/dashboard/settings/users",
    },
    {
      title: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      url: "/dashboard/settings",
    },
  ];

  const organizationMenuItems: ProfileMenuItem[] = [
    {
      title: organizations?.[0].organization_name ?? "Servihero",
      children: organizations
        ? [
            ...organizations.map((organization) => ({
              title: organization.organization_name,
              icon: <Check className="mr-2 h-4 w-4" />,
            })),
            {
              title: "Add New Workspace",
              icon: <Plus className="mr-2 h-4 w-4" />,
            },
          ]
        : undefined,
      icon: <Check className="mr-2 h-4 w-4" />,
    },
  ];

  const menuItems: ProfileMenuItems[] = [
    {
      key: "profile",
      title: "Profile",
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
          icon: <LogOut className="mr-2 h-4 w-4" />,
          onClick: () => void signOut({ callbackUrl: "/" }),
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
        <Link href={item.url} className="flex gap-2 font-normal">
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ) : (
        <>
          {item.icon}
          <span>{item.title}</span>
        </>
      )}
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {menuItems.map((menuItem, index) => (
          <Fragment key={menuItem.key}>
            {menuItem.title ? (
              <DropdownMenuLabel>{menuItem.title}</DropdownMenuLabel>
            ) : null}
            <DropdownMenuGroup>
              {menuItem.items.map((item) =>
                item.children ? (
                  <DropdownMenuSub key={item.title}>
                    <DropdownMenuSubTrigger>
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
