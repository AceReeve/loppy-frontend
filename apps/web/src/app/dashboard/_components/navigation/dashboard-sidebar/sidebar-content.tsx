"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@repo/ui/components/ui";
import React from "react";
import WorkspaceButton from "@/src/app/dashboard/_components/navigation/dashboard-sidebar/dashboard-sidebar-workspace";
import { useDashboardState } from "@/src/providers/dashboard-provider";
import { type MenuItem, type MenuLinkItem } from "@/src/types/types";

interface SidebarContentProps {
  menuItems: MenuItem;
}

export default function SidebarContent(props: SidebarContentProps) {
  const { sidebarCollapsed: collapsed } = useDashboardState();

  const pathName = usePathname();
  const currentParentPath = `/${pathName.split("/")[2]}`;
  const menus = props.menuItems.items;
  const rootSlug = props.menuItems.slug;

  const menuItemClass = `relative mt-1 flex w-full items-center rounded-[11px] p-2 text-base font-medium hover:bg-secondary-light whitespace-nowrap gap-[10px]`;
  const activeClass = "pointer-events-none !font-bold";
  const collapsedTitleClass = "!w-0 hidden";
  const titleClass =
    "relative overflow-hidden transition-all duration-500 w-full";

  function getPath(path: string[] | string) {
    if (typeof path === "string") {
      return `/${rootSlug.concat(path)}`;
    }
    return `/${rootSlug.concat(path.join(""))}`;
  }

  function isActive(path: string[] | string) {
    return getPath(path) === pathName;
  }

  const renderMenuIcon = (icon: MenuLinkItem["icon"]) => (
    <>
      {icon && typeof icon === "string" ? (
        <img src={icon} alt="" className="relative h-6 w-6" />
      ) : (
        icon
      )}
    </>
  );

  const navItems = menus.map((menuItem) =>
    (menuItem.children ?? []).length === 0 ? (
      <li className="relative" key={menuItem.id}>
        <Link
          href={getPath([menuItem.url])}
          className={`${menuItemClass} ${
            isActive(menuItem.url) ? activeClass : ""
          }`}
        >
          {isActive(menuItem.url) && (
            <span
              className="animate-sidebar-select bg-primary absolute inset-0 rounded-[11px]"
              aria-hidden="true"
            />
          )}
          {renderMenuIcon(menuItem.icon)}
          <span
            className={`${titleClass} ${collapsed ? collapsedTitleClass : ""}`}
          >
            {menuItem.title}
          </span>
        </Link>
      </li>
    ) : (
      /** With children **/
      <Disclosure
        key={menuItem.id}
        defaultOpen={currentParentPath === menuItem.url}
      >
        {({ open }) => (
          <>
            <Disclosure.Button
              disabled={menuItem.collapsible === false}
              className={`flex items-center justify-between text-left ${menuItemClass} ${menuItem.collapsible === false ? "pointer-events-none" : ""}`}
            >
              {renderMenuIcon(menuItem.icon)}
              {menuItem.collapsible === false ? (
                <span
                  className={`${titleClass} font-montserrat mt-5 text-sm font-semibold uppercase tracking-wide text-[#fff] text-opacity-50 ${collapsed ? collapsedTitleClass : ""}`}
                >
                  {menuItem.title}
                </span>
              ) : (
                <>
                  <span>{menuItem.title}</span>
                  <ChevronDownIcon
                    className={`w-4 ${open ? "-rotate-180" : ""}`}
                  />
                </>
              )}
            </Disclosure.Button>
            <Disclosure.Panel
              className="ml-4"
              aria-label="submenu"
              static={menuItem.collapsible === false}
            >
              {(menuItem.children ?? []).map((subItem) => (
                <Link
                  key={subItem.id}
                  href={getPath([menuItem.url, subItem.url])}
                  className={`${menuItemClass} ${
                    isActive([menuItem.url, subItem.url]) ? activeClass : ""
                  }`}
                >
                  {isActive([menuItem.url, subItem.url]) && (
                    <span
                      className="animate-sidebar-select bg-primary absolute inset-0 rounded-[11px]"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`${titleClass} ${collapsed ? collapsedTitleClass : ""}`}
                  >
                    {subItem.title}
                  </span>
                </Link>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    ),
  );

  return (
    <>
      {/*     <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
                variant="outline"
                className="inline-flex h-[47px] w-full items-center justify-start gap-2 rounded-lg bg-card px-3 py-3.5 shadow"
            >
              <Image
                  src="/assets/images/logo.png"
                  alt=""
                  width={138}
                  height={141}
                  className="size-[25px]"
              />
              <div
                  className={`shrink grow basis-0 whitespace-nowrap font-nunito text-base font-bold text-gray-800`}
              >
                Service Hero
              </div>
              <div className="relative flex h-[18px] w-[18px] flex-col">
                <ArrowUp2/>
                <ArrowDown2/>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
              className="left-[110px] -top-[51px] absolute min-h-[400px] max-h-[425px] w-[425px] px-2 py-1 overflow-y-auto ">
            <DropdownMenuLabel>
              <div
                  className="top-3 -left-2 absolute h-0 w-0 border-[10px] border-red-950 border-solid border-l-transparent border-b-transparent -rotate-[135deg]"></div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
                  <svg
                      className="h-5 w-5 text-gray-500 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                    type="text"
                    name="email"
                    id="topbar-search"
                    className="block h-10 w-full rounded-lg border-none bg-white p-2.5 px-3.5 py-3 pl-10 text-gray-900 shadow-none placeholder:text-gray-600/50 sm:text-sm"
                    placeholder="Search for a sub-account"
                />
              </div>
            </DropdownMenuLabel>

            <DropdownMenuItem className="text-blue-400 font-bold cursor-pointer">
              Switch to Agency View
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <div className="px-2 py-4">
              <DropdownMenuLabel
                  className="shrink grow basis-0 whitespace-nowrap font-nunito font-bold text-gray-800 text-sm">
                RECENT
              </DropdownMenuLabel>
              <DropdownMenuGroup className="grid item-start gap-2">
                {Array.from({length: 3}).map((_item, index) => (
                    <DropdownMenuItem
                        key={index}
                        className="border-gray-200 border-solid border-2 cursor-pointer py-2 px-3 inline-flex items-start gap-2 content-center w-full "
                    >
                      <div className="rounded-full h-10 w-10 size-full bg-blue-700 my-auto"></div>
                      <div className="inline">
                        <p className="shrink grow basis-0 whitespace-nowrap font-nunito text-base text-gray-800">
                          Hero Heating & Air - Demo Account
                        </p>
                        <p className="shrink grow basis-0 whitespace-nowrap font-nunito text-sm text-gray-800">
                          10982 South Gracie, South Jordan, UT
                        </p>
                      </div>
                    </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuLabel
                  className="mt-3 shrink grow basis-0 whitespace-nowrap font-nunito font-bold text-gray-800 text-sm">
                ALL ACCOUNTS
              </DropdownMenuLabel>
              <DropdownMenuGroup className="grid item-start gap-2">
                {Array.from({length: 3}).map((_item, index) => (
                    <DropdownMenuItem
                        key={index}
                        className="border-gray-200 border-solid border-2 cursor-pointer py-2 px-3 inline-flex items-start gap-2 content-center w-full "
                    >
                      <div className="rounded-full h-10 w-10 size-full bg-blue-700 my-auto"></div>
                      <div className="inline">
                        <p className="shrink grow basis-0 whitespace-nowrap font-nunito text-base text-gray-800">
                          Hero Heating & Air - Demo Account
                        </p>
                        <p className="shrink grow basis-0 whitespace-nowrap font-nunito text-sm text-gray-800">
                          10982 South Gracie, South Jordan, UT
                        </p>
                      </div>
                    </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
*/}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-card inline-flex h-[47px] w-full items-center justify-start gap-2 rounded-lg px-3 py-3.5 shadow"
          >
            <Image
              src="/assets/images/logo.png"
              alt=""
              width={138}
              height={141}
              className="size-[25px]"
            />
            <div className="font-nunito shrink grow basis-0 whitespace-nowrap text-base font-bold text-gray-800">
              Service Hero
            </div>
            <div className="relative flex h-[18px] w-[18px] flex-col">
              <ArrowUp2 />
              <ArrowDown2 />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="h-min-[600px] block h-auto max-h-[900px] w-[1000px] min-w-[600px] max-w-[1000px] overflow-y-auto rounded-3xl bg-[#2E1249] px-16 py-5">
          <div className=" flex h-auto w-full content-center justify-between">
            <p className="font-nunito content-center text-[48px] font-bold text-white">
              Workspaces
            </p>
            <div className="flex w-auto items-center gap-2">
              <Button className=" text-xl">Create</Button>
              <div className="w-70 relative ">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
                  <svg
                    className="h-5 w-5 text-gray-500 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="email"
                  id="topbar-search"
                  className="block h-10 w-full rounded-lg border-none bg-white p-2.5 px-20 py-3 pl-10 text-gray-900 shadow-none placeholder:text-gray-600/50 sm:text-sm"
                  placeholder="Search Workspace"
                />
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-white" />
          <div className="my-5 grid grid-cols-2 gap-x-20 gap-y-4 ">
            {Array.from({ length: 4 }, (_, i) => i + 1).map((item) => (
              <WorkspaceButton key={item} />
            ))}
          </div>
          <p className="ml-5 h-8 font-semibold tracking-wider text-white">
            RECENT
          </p>
          <div className="h-[1px] w-full bg-white" />
          <div className="my-5 grid grid-cols-2 gap-x-20 gap-y-4 ">
            {Array.from({ length: 4 }, (_, i) => i + 1).map((index) => (
              <WorkspaceButton key={index} />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <nav className="mt-6 text-[#fff]">
        <ul>{navItems}</ul>
      </nav>
    </>
  );
}
