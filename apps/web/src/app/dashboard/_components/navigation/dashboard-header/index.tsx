"use client";

import {
  ArrowCircleDown,
  Logout,
  Moon,
  Notification,
  ProfileCircle,
} from "iconsax-react";
import { useTheme } from "@repo/ui/hooks";
import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { SunIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DefaultAvatar } from "@repo/ui/components/custom";
import { useDashboardState } from "@/src/providers/dashboard-provider.tsx";

export default function DashboardHeader() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const pathname = usePathname();

  const { session } = useDashboardState();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname === "/dashboard/messages") return null;

  if (!session) return null;

  return (
    <nav className="relative z-30 w-full">
      <div className="px-3 py-3 lg:px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            {/* Profile */}
            <div className="relative flex items-center gap-3 rounded-full bg-card p-3">
              <div className="absolute -inset-2 rounded-lg" />
              <span className="sr-only">Open user menu</span>
              <div className="pointer-events-none relative flex overflow-hidden rounded-full text-sm focus:ring-4 focus:ring-gray-300">
                <div className="size-10">
                  <DefaultAvatar
                    image={session.user.image ?? ""}
                    name={session.user.name ?? ""}
                  />
                </div>
              </div>
              <div className="pointer-events-none relative inline-flex flex-col items-start justify-center whitespace-nowrap">
                <div className="font-open-sans text-sm font-bold text-black">
                  Hello {session.user.email?.split("@")[0]}!
                </div>
                <div className="font-open-sans text-xs  font-normal text-gray-700">
                  Admin
                </div>
              </div>
              <Menu as="div" className="relative">
                <Menu.Button className="relative flex size-10 items-center justify-center rounded-full bg-gray-100">
                  <ArrowCircleDown className="relative size-5" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-4 flex origin-top-right gap-1 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${
                          active ? "bg-primary text-white" : "text-gray-900"
                        } group flex items-center justify-end rounded-full bg-card p-3 text-sm`}
                        href="/dashboard/profile"
                      >
                        Profile
                        <ProfileCircle
                          aria-hidden="true"
                          className="ml-2 size-5"
                        />
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-primary text-white" : "text-gray-900"
                        } group flex items-center justify-end rounded-full bg-card p-3 text-sm`}
                        onClick={() => void signOut({ callbackUrl: "/" })}
                        type="button"
                      >
                        Logout
                        <Logout aria-hidden="true" className="ml-2 h-5 w-5" />
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="h-11 w-11 rounded-full bg-card p-3"
              data-dropdown-toggle="notification-dropdown"
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
            </button>

            <div className="flex items-center gap-3 rounded-full bg-card p-3">
              <div className="size-4 rounded-full bg-[#28C66F]" />
              <div className="flex flex-col items-center">
                <div className="font-open-sans text-sm font-bold text-gray-800">
                  ServiceTitan API Connected
                </div>
                <div className="font-open-sans text-xs font-bold text-gray-300">
                  Last Data pulled 5:54pm
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-full bg-card p-3">
              <div className="relative flex size-10 items-center justify-center rounded-full bg-gray-100">
                <Notification className="size-5" />
              </div>
              <div className="font-poppins text-sm font-normal text-gray-800">
                Notification
              </div>
              <div className="flex size-6 flex-col items-center justify-center rounded-full bg-red-500">
                <div className="font-poppins text-xs font-bold text-white">
                  10
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
