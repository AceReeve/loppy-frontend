"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Disclosure, Transition } from "@headlessui/react";
import { useDashboardState } from "@/src/providers/dashboard-provider";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import Image from "next/image";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  Dialog,
  DialogTrigger,
  DialogContent,
  Avatar,
  AvatarFallback,
} from "@repo/ui/components/ui";
import React from "react";
import WorkspaceButton from "@/src/app/dashboard/_components/navigation/dashboard-sidebar/dashboard-sidebar-workspace";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/components/ui";

type Props = {
  menuItems: MenuItem;
};

export default function SidebarContent(props: Props) {
  const { sidebarCollapsed: collapsed } = useDashboardState();

  const pathName = usePathname();
  const currentParentPath = "/" + pathName?.split("/")[2];
  const menus = props.menuItems.items;
  const rootSlug = props.menuItems.slug;
  // const role = props.session?.user?.data?.role;
  const role = null;

  const menuItemClass = `relative mt-1 flex w-full items-center rounded-[11px] p-2 text-base font-medium hover:bg-secondary-light whitespace-nowrap gap-[10px]`;
  const activeClass = "pointer-events-none !font-bold";
  const collapsedTitleClass = "!w-0 hidden";
  const titleClass =
    "relative overflow-hidden transition-all duration-500 w-full";

  // if visibility is set, then check if role is included
  // otherwise, just show it (true)
  const hasAccess = (item: MenuLinkItem) =>
    (item.visibility ?? []).length > 0
      ? role && isRoleIncluded(role, item.visibility!)
      : true;

  function isRoleIncluded(role: string, visibility: any[]) {
    const searchString = role.toLowerCase();

    for (const obj of visibility) {
      const name = obj.name.toLowerCase();
      if (name.includes(searchString)) {
        return true;
      }
    }
    return false;
  }

  function getPath(path: string[] | string) {
    if (typeof path === "string") {
      return "/" + rootSlug.concat(path);
    }
    return "/" + rootSlug.concat(path.join(""));
  }

  function isActive(path: string[] | string) {
    return getPath(path) === pathName;
  }

  const renderMenuIcon = (icon: MenuLinkItem["icon"]) => (
    <>
      {icon && typeof icon === "string" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={icon} alt="" className="relative h-6 w-6" />
      ) : (
        icon
      )}
    </>
  );

  const navItems = menus.map((menuItem) =>
    hasAccess(menuItem) ? (
      (menuItem.children ?? []).length === 0 ? (
        <li className="relative" key={menuItem.id}>
          <Link
            href={getPath([menuItem.url])}
            className={`${menuItemClass} ${
              isActive(menuItem.url) ? `${activeClass}` : ""
            }`}
          >
            {isActive(menuItem.url) && (
              <span
                className="absolute inset-0 animate-sidebar-select rounded-[11px] bg-primary"
                aria-hidden="true"
              ></span>
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
          defaultOpen={currentParentPath == menuItem.url}
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
                    className={`${titleClass} mt-5 font-montserrat text-sm font-semibold uppercase tracking-wide text-[#fff] text-opacity-50 ${collapsed ? collapsedTitleClass : ""}`}
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
                      isActive([menuItem.url, subItem.url])
                        ? `${activeClass}`
                        : ""
                    }`}
                  >
                    {isActive([menuItem.url, subItem.url]) && (
                      <span
                        className="absolute inset-0 animate-sidebar-select rounded-[11px] bg-primary"
                        aria-hidden="true"
                      ></span>
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
      )
    ) : (
      <></>
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
              <ArrowUp2 />
              <ArrowDown2 />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="block min-w-[600px] w-[1000px] max-w-[1000px] h-min-[600px] h-auto max-h-[900px] px-16 py-5 overflow-y-auto bg-[#2E1249] rounded-3xl">
          <div className=" h-auto flex justify-between w-full content-center">
            <p className="font-nunito text-[48px] font-bold content-center text-white">
              Workspaces
            </p>
            <div className="items-center flex w-auto gap-2">
              <Button className=" text-xl">Create</Button>
              <div className="relative w-70 ">
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
                  className="block h-10 w-full rounded-lg border-none bg-white p-2.5 px-20 py-3 pl-10 text-gray-900 shadow-none placeholder:text-gray-600/50 sm:text-sm"
                  placeholder="Search Workspace"
                />
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-white" />
          <div className="grid-cols-2 gap-x-20 grid gap-y-4 my-5 ">
            {Array.from({ length: 4 }).map((_item, index) => (
              <WorkspaceButton key={index} />
            ))}
          </div>
          <p className="text-white font-semibold tracking-wider ml-5 h-8">
            RECENT
          </p>
          <div className="h-[1px] w-full bg-white" />
          <div className="grid-cols-2 gap-x-20 grid gap-y-4 my-5 ">
            {Array.from({ length: 4 }).map((_item, index) => (
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
