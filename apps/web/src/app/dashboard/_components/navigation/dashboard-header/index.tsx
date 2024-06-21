"use client";

import { HambergerMenu, Message, Moon, Notification } from "iconsax-react";
import { useTheme } from "@repo/ui/hooks";
import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import { SunIcon, UserCircleIcon } from "@heroicons/react/24/outline";
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
    <nav className="relative z-30 w-full border-b border-black/10 bg-gray-50">
      <div className="px-3 py-3 lg:px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              className="btn-shadowed-white h-11 w-11"
              data-dropdown-toggle="notification-dropdown"
              type="button"
            >
              <HambergerMenu className="size-full text-black" />
            </button>
            <form action="#" className="hidden lg:block lg:pl-3.5" method="GET">
              <label className="sr-only" htmlFor="topbar-search">
                Search
              </label>
              <div className="relative mt-1 w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-500 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  className="shadow-softer block h-11 w-full rounded-lg border-none bg-white p-2.5 px-3.5 py-3 pl-10 text-gray-900 placeholder:text-gray-600/50 sm:text-sm"
                  id="topbar-search"
                  name="email"
                  placeholder="Search anything here"
                  type="text"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="btn-shadowed-white h-11 w-11"
              data-dropdown-toggle="notification-dropdown"
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
              type="button"
            >
              {mounted ? (
                <>
                  {theme === "dark" ? (
                    <Moon className="text-primary size-full" />
                  ) : (
                    <SunIcon className="size-full text-gray-600" />
                  )}
                </>
              ) : null}
            </button>
            <button
              className="btn-shadowed-white h-11 w-11"
              data-dropdown-toggle="notification-dropdown"
              type="button"
            >
              <Message className="size-full text-gray-600" />
            </button>
            <button
              className="btn-shadowed-white h-11 w-11"
              data-dropdown-toggle="notification-dropdown"
              type="button"
            >
              <Notification className="size-full text-gray-600" />
            </button>

            <div className="h-6 w-[1px] bg-[#B3B3B3]/40" />

            {/* Profile */}
            <Menu as="div" className="relative">
              <Menu.Button className="relative ml-3 flex items-center gap-3">
                <div className="hover:shadow-soft absolute -inset-2 rounded-lg hover:bg-black/10" />
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
                  <div className="font-nunito text-base font-bold text-black">
                    {session.user.email?.split("@")[0]}
                  </div>
                  <div className="font-nunito text-xs font-normal text-gray-700 text-opacity-50">
                    Monday, 16 Jul 2023
                  </div>
                </div>
              </Menu.Button>
              <Menu.Items className="bg-card shadow-soft absolute right-0 mt-4 w-56 origin-top-right divide-y divide-black/10 rounded-md ring-1 ring-black/5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`${
                        active ? "bg-primary text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md p-3 text-sm`}
                      href="/dashboard/profile"
                    >
                      <UserCircleIcon
                        aria-hidden="true"
                        className="mr-2 h-5 w-5"
                      />
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md p-3 text-sm`}
                      onClick={() => void signOut({ callbackUrl: "/" })}
                      type="button"
                    >
                      <ArrowLeftStartOnRectangleIcon
                        aria-hidden="true"
                        className="mr-2 h-5 w-5"
                      />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}
