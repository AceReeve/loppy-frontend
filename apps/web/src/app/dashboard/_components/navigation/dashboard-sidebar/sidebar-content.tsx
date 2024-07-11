"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import React from "react";
import { cn } from "@repo/ui/utils";
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

  const menuItemClass = `relative mt-1 flex w-full items-center rounded-full p-2 text-base font-medium bg-gray-100 hover:bg-primary/60 whitespace-nowrap gap-[10px]`;
  const collapsedMenuItemClass = `!size-[50px] items-center justify-center`;

  const activeClass = "pointer-events-none !font-bold";

  const collapsedTitleClass =
    "absolute -bottom-5 text-gray-500 text-xs font-medium font-poppins";
  const titleClass =
    "relative transition-all duration-500 text-gray-900 text-sm text-gray-700";
  const activeTitleClass = "text-white";

  const iconClass = "text-black";
  const activeIconClass = "!text-white";

  const imageIconClass = "relative h-6 w-6 dark:invert dark:hue-rotate-180";
  const activeImageIconClass = "invert hue-rotate-180";

  function getPath(path: string[] | string) {
    if (typeof path === "string") {
      return `/${rootSlug.concat(path)}`;
    }
    return `/${rootSlug.concat(path.join(""))}`;
  }

  function isActive(path: string[] | string) {
    const fullPath = getPath(path);
    // if item is "Home"
    if (path === "") {
      return pathName === fullPath;
    }
    return pathName.startsWith(fullPath);
  }

  const renderMenuIcon = (
    icon: MenuLinkItem["icon"],
    imageIcon: MenuLinkItem["imageIcon"],
    active: boolean,
  ) => (
    <>
      {imageIcon ? (
        <img
          src={imageIcon}
          alt=""
          className={cn(imageIconClass, active && activeImageIconClass)}
        />
      ) : (
        <div className={cn(iconClass, active && activeIconClass)}>{icon}</div>
      )}
    </>
  );
  const renderNavItems = (items: MenuLinkItem[]) =>
    items.map((menuItem) =>
      !menuItem.children?.length ? (
        <li className="relative" key={menuItem.id}>
          <Link
            href={getPath([menuItem.url])}
            className={cn(
              menuItemClass,
              isActive(menuItem.url) && activeClass,
              collapsed && collapsedMenuItemClass,
            )}
          >
            {isActive(menuItem.url) && (
              <span
                className="absolute inset-0 animate-sidebar-select rounded-full bg-primary"
                aria-hidden="true"
              />
            )}

            {renderMenuIcon(
              menuItem.icon,
              menuItem.imageIcon,
              isActive(menuItem.url),
            )}
            <span
              className={cn(
                titleClass,
                isActive(menuItem.url) && activeTitleClass,
                collapsed && collapsedTitleClass,
              )}
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
              {!collapsed && (
                <Disclosure.Button
                  disabled={menuItem.collapsible === false}
                  className={`flex items-center text-left ${menuItemClass} ${menuItem.collapsible === false ? "pointer-events-none" : ""}`}
                >
                  <>
                    {renderMenuIcon(menuItem.icon, menuItem.imageIcon, false)}
                    {menuItem.collapsible === false ? (
                      <span
                        className={`${titleClass} font-montserrat text-sm font-semibold uppercase tracking-wide text-[#fff] text-opacity-50`}
                      >
                        {menuItem.title}
                      </span>
                    ) : (
                      <>
                        <span className={titleClass}>{menuItem.title}</span>
                        <ChevronDownIcon
                          className={`w-4 text-black ${open ? "-rotate-180" : ""}`}
                        />
                      </>
                    )}
                  </>
                </Disclosure.Button>
              )}
              <Disclosure.Panel
                aria-label="submenu"
                static={menuItem.collapsible === false}
              >
                {menuItem.children?.map((subItem) => (
                  <Link
                    key={subItem.id}
                    href={getPath([menuItem.url, subItem.url])}
                    className={`${menuItemClass} ${
                      isActive([menuItem.url, subItem.url]) ? activeClass : ""
                    }`}
                  >
                    {isActive([menuItem.url, subItem.url]) && (
                      <span
                        className="absolute inset-0 animate-sidebar-select rounded-full bg-primary"
                        aria-hidden="true"
                      />
                    )}

                    {renderMenuIcon(
                      subItem.icon,
                      subItem.imageIcon,
                      isActive([menuItem.url, subItem.url]),
                    )}
                    <span
                      className={cn(
                        titleClass,
                        isActive([menuItem.url, subItem.url]) &&
                          activeTitleClass,
                        collapsed && collapsedTitleClass,
                      )}
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
    <nav className="text-white">
      {menus.map((menuItems, index) => (
        <ul
          // eslint-disable-next-line react/no-array-index-key -- allow index for this one
          key={index}
          className={cn(
            "bg-card px-3 pb-10 pt-5",
            index && "mt-6",
            collapsed
              ? "flex flex-col items-center gap-6 rounded-full"
              : "rounded-3xl",
          )}
        >
          {renderNavItems(menuItems)}
        </ul>
      ))}
    </nav>
  );
}
