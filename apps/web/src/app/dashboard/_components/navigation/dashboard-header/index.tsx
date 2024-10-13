"use client";

import { ArrowCircleDown, Moon } from "iconsax-react";
import { useTheme } from "@repo/ui/hooks";
import React, { useEffect, useState } from "react";
import { SunIcon } from "@heroicons/react/24/outline";
import { DefaultAvatar } from "@repo/ui/components/custom";
import { useGetUserProfileQuery } from "@repo/redux-utils/src/endpoints/user";
import { Button, buttonVariants } from "@repo/ui/components/ui";
import { cn } from "@repo/ui/utils";
import { useDashboardState } from "@/src/providers/dashboard-provider.tsx";
import NotificationsDrawer from "@/src/app/dashboard/_components/navigation/dashboard-header/notifications-drawer.tsx";
import { ProfileMenuDropdown } from "@/src/app/dashboard/_components/navigation/dashboard-header/profile-menu-dropdown.tsx";

export default function DashboardHeader() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // const pathname = usePathname();

  const { session, notificationsOpened, toggleNotifications } =
    useDashboardState();

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
          <div className="flex items-center justify-start">
            {/* Profile */}
            <div
              className={cn(
                buttonVariants({ variant: "outline" }),
                "relative flex items-center gap-3 rounded-full bg-card p-3 hover:bg-white",
              )}
            >
              <div className="absolute -inset-2 rounded-lg" />
              <span className="sr-only">Open user menu</span>
              <div className="pointer-events-none relative flex overflow-hidden rounded-full text-sm focus:ring-4 focus:ring-gray-300">
                <div className="size-10">
                  <DefaultAvatar
                    // image={
                    //   userProfile?.userInfo.profile?.image_1.path ??
                    //   session.user.image ??
                    //   ""
                    // }
                    image={
                      userProfile?.userInfo?.profile?.image_1.path ??
                      session.user.image ??
                      ""
                    }
                    name={session.user.name ?? ""}
                  />
                </div>
              </div>
              <div className="pointer-events-none relative inline-flex flex-col items-start justify-center whitespace-nowrap">
                <div className="font-open-sans text-sm font-bold text-black">
                  {/* Hello {session.user.email?.split("@")[0]}! */}
                  Hello {userProfile?.userInfo?.first_name ?? session.user.name}
                  !
                </div>
                <div className="font-open-sans text-xs  font-normal text-gray-700">
                  {/* Admin{" "} */}
                  {userProfile?.userDetails.role.role_name ?? "Role"}
                </div>
              </div>
              <ProfileMenuDropdown
                open={profileDropdownOpen}
                onOpenChange={setProfileDropdownOpen}
              >
                <Button
                  asChild
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                  }}
                >
                  <button
                    className="relative flex size-10 items-center justify-center rounded-full bg-gray-100"
                    type="button"
                  >
                    <ArrowCircleDown className="relative size-5" />
                  </button>
                </Button>
              </ProfileMenuDropdown>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-11 w-11 rounded-full bg-card p-3"
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
              type="button"
            >
              {mounted ? (
                <>
                  {theme === "dark" ? (
                    <Moon className="size-full text-primary" />
                  ) : (
                    <SunIcon className="size-full text-gray-600" />
                  )}
                </>
              ) : null}
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-3 rounded-full p-3"
            >
              <div className="size-4 rounded-full bg-[#28C66F]" />
              <div className="flex flex-col items-center">
                <div className="font-open-sans text-sm font-bold">
                  ServiceTitan API Connected
                </div>
                <div className="font-open-sans text-xs font-bold text-gray-300">
                  Last Data pulled 5:54pm
                </div>
              </div>
            </Button>
            <NotificationsDrawer
              open={notificationsOpened}
              setOpen={toggleNotifications}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
