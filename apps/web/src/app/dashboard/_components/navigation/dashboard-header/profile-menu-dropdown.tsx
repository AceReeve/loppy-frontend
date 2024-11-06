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
  toast,
} from "@repo/ui/components/ui";
import React, { Fragment, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useGetAllOrganizationsQuery } from "@repo/redux-utils/src/endpoints/organization.ts";
import { Card } from "iconsax-react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { useGetAccentColorQuery } from "@repo/redux-utils/src/endpoints/dashboard.ts";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useDashboardState } from "@/src/providers/dashboard-provider.tsx";
import IconAccountProfile from "@/src/app/dashboard/_components/navigation/dashboard-header/icons/icon-account-profile.tsx";
import ColorPicker from "@/src/components/color-picker/color-picker.tsx";
import { type ColorPickerSchemaFormValues } from "@/src/components/color-picker/schemas/color-picker-schemas.ts";

interface ProfileMenuItems {
  key: string;
  items: ProfileMenuItem[];
  title?: string;
}

interface ProfileMenuItem {
  title: string;
  customContent?: React.ReactNode;
  url?: string;
  onClick?: () => void;
  children?: ProfileMenuItem[];
  icon?: string | React.ReactNode;
}

interface ProfileMenuDropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  setAccentColor: (
    accentColor: ColorPickerSchemaFormValues,
  ) => Promise<ColorPickerSchemaFormValues>;
}

export function ProfileMenuDropdown({
  open,
  onOpenChange,
  children,
  setAccentColor,
}: ProfileMenuDropdownProps) {
  const { currentOrg } = useDashboardState();
  const { data: organizations } = useGetAllOrganizationsQuery(undefined);
  const { data: accentColor, refetch: refetchAccentColor } =
    useGetAccentColorQuery(undefined);

  const [isLoading, setIsLoading] = useState(false);

  // const setAccentColor = (colorVariableName: string) => {
  //   localStorage.setItem("servihero-accent-color", colorVariableName);
  //   document.documentElement.style.setProperty(
  //     "--color-primary",
  //     accentColorMap[colorVariableName].value,
  //   );
  // };

  async function onColorSelect(colorName: string, customColor?: string) {
    setIsLoading(true);
    try {
      await setAccentColor({ colorName, customColor });
      await refetchAccentColor();
    } catch (err: unknown) {
      toast({
        title: "Can't set accent color",
        description: getErrorMessage(err),
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

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
    {
      title: "Accent Color",
      icon: (
        <div className="flex size-5 items-center justify-center">
          <div className=" size-2 rounded-full bg-primary" />
        </div>
      ),
      children: [
        {
          title: "Color Picker",
          customContent: (
            <ColorPicker
              onColorSelect={onColorSelect}
              defaultData={accentColor}
              isLoading={isLoading}
            />
          ),
        },
      ],
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

  const renderMenuItem = (item: ProfileMenuItem) => {
    return (
      <DropdownMenuItem
        key={item.title}
        onClick={item.onClick}
        asChild={item.url !== undefined || item.customContent !== undefined}
        className="cursor-pointer"
      >
        {item.url ? (
          <Link href={item.url} className="flex gap-3">
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ) : (
          (item.customContent ?? (
            <div className="flex gap-3">
              {item.icon}
              <span>{item.title}</span>
            </div>
          ))
        )}
      </DropdownMenuItem>
    );
  };

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
