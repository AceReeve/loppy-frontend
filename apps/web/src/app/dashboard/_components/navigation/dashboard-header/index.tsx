"use client";

import { useTheme } from "@repo/ui/hooks";
import React, { useEffect, useState } from "react";
import { DefaultAvatar } from "@repo/ui/components/custom";
import { useGetUserProfileQuery } from "@repo/redux-utils/src/endpoints/user";
import { Button, buttonVariants } from "@repo/ui/components/ui";
import { Moon, Sun, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { cn } from "@repo/ui/utils";
import {
  useGetCredentialsQuery,
  useGetServiceTitanSyncStatusQuery,
} from "@repo/redux-utils/src/endpoints/service-titan.ts";
import moment from "moment";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { useDashboardState } from "@/src/providers/dashboard-provider.tsx";
import NotificationsDrawer from "@/src/app/dashboard/_components/navigation/dashboard-header/notifications-drawer.tsx";
import { ProfileMenuDropdown } from "@/src/app/dashboard/_components/navigation/dashboard-header/profile-menu-dropdown.tsx";
import MessagesDrawer from "@/src/app/dashboard/_components/navigation/dashboard-header/messages-drawer.tsx";
import SearchDialog from "@/src/app/dashboard/_components/navigation/dashboard-header/search-dialog.tsx";
import { type ColorPickerSchemaFormValues } from "@/src/components/color-picker/schemas/color-picker-schemas.ts";

interface DashboardHeaderProps {
  setAccentColor: (
    accentColor: ColorPickerSchemaFormValues,
  ) => Promise<ColorPickerSchemaFormValues>;
}

export default function DashboardHeader({
  setAccentColor,
}: DashboardHeaderProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { data: credentialsData, isLoading } =
    useGetCredentialsQuery(undefined);
  const { data: syncStatus } = useGetServiceTitanSyncStatusQuery(undefined);

  const {
    session,
    notificationsOpened,
    toggleNotifications,
    messagesOpened,
    toggleMessages,
    searchOpened,
    toggleSearch,
  } = useDashboardState();

  useEffect(() => {
    setMounted(true);
  }, []);

  // if (pathname === "/dashboard/messages") return null;

  const { data: userProfile } = useGetUserProfileQuery(undefined);

  if (!session) return null;

  return (
    <nav className="relative z-30 w-full">
      <div className="px-3 py-3 lg:px-10">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/settings/integrations"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex min-h-14 items-center gap-3 rounded-full border-none px-4 py-3",
            )}
          >
            {/* eslint-disable-next-line no-nested-ternary -- this is easy to read */}
            {isLoading ? (
              <LoadingSpinner />
            ) : credentialsData ? (
              <div className="size-4 rounded-full bg-[#28C66F]" />
            ) : (
              <TriangleAlert className="size-5 stroke-current text-yellow-500" />
            )}
            <div className="flex flex-col items-center">
              <div className="font-open-sans text-sm font-semibold">
                ServiceTitan API{" "}
                {credentialsData ? "Connected" : "Disconnected"}
              </div>
              {credentialsData ? (
                <div className="font-open-sans text-xs font-bold italic text-gray-400">
                  {syncStatus?.lastSync
                    ? `Synced ${moment(syncStatus.lastSync).calendar()}`
                    : "Requires Sync"}
                </div>
              ) : null}
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-soft">
              <Button
                variant="ghost"
                className="relative rounded-md p-2"
                onClick={() => {
                  setTheme(theme === "light" ? "dark" : "light");
                }}
                type="button"
              >
                {mounted ? (
                  <>
                    {theme === "dark" ? (
                      <Moon className="size-6" />
                    ) : (
                      <Sun className="size-6" />
                    )}
                  </>
                ) : null}
              </Button>

              <SearchDialog open={searchOpened} setOpen={toggleSearch} />
              <MessagesDrawer open={messagesOpened} setOpen={toggleMessages} />
              <NotificationsDrawer
                open={notificationsOpened}
                setOpen={toggleNotifications}
              />
            </div>
            <ProfileMenuDropdown
              open={profileDropdownOpen}
              onOpenChange={setProfileDropdownOpen}
              setAccentColor={setAccentColor}
            >
              <Button
                variant="outline"
                className="relative flex size-20 items-center justify-center rounded-full bg-gray-100 p-1.5"
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
              >
                <DefaultAvatar
                  className="size-full"
                  image={
                    userProfile?.userInfo?.profile?.image_1.path ??
                    session.user.image ??
                    ""
                  }
                  name={session.user.name ?? ""}
                />
                {/*  Online status  */}
                <div className="absolute bottom-2 right-0 flex size-5 items-center justify-center rounded-full bg-white">
                  <div className="relative size-4 rounded-full bg-[#28C66F] p-2" />
                </div>
              </Button>
            </ProfileMenuDropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}
