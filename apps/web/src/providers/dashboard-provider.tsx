"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { type Session } from "next-auth";
import { type GetOrganizationResponse } from "@repo/redux-utils/src/endpoints/types/organization";

export interface ColorPaletteProps {
  color: string;
  title: string;
  value: string;
}

export const accentColors: ColorPaletteProps[] = [
  { color: "bg-slate-500", title: "Slate", value: "100, 116, 139" },
  { color: "bg-gray-500", title: "Gray", value: "107, 114, 128" },
  { color: "bg-zinc-500", title: "Zinc", value: "113, 113, 122" },
  { color: "bg-neutral-500", title: "Neutral", value: "115, 115, 115" },
  { color: "bg-stone-500", title: "Stone", value: "120, 113, 108" },
  { color: "bg-red-500", title: "Red", value: "239, 68, 68" },
  { color: "bg-orange-500", title: "Orange", value: "232, 119, 35" },
  { color: "bg-amber-500", title: "Amber", value: "245, 158, 11" },
  { color: "bg-yellow-500", title: "Yellow", value: "234, 179, 8" },
  { color: "bg-lime-500", title: "Lime", value: "132, 204, 22" },
  { color: "bg-green-500", title: "Green", value: "34, 197, 94" },
  { color: "bg-emerald-500", title: "Emerald", value: "16, 185, 129" },
  { color: "bg-teal-500", title: "Teal", value: "20, 184, 166" },
  { color: "bg-cyan-500", title: "Cyan", value: "6, 182, 212" },
  { color: "bg-sky-500", title: "Sky", value: "14, 165, 233" },
  { color: "bg-blue-500", title: "Blue", value: "59, 130, 246" },
  { color: "bg-indigo-500", title: "Indigo", value: "99, 102, 241" },
  { color: "bg-violet-500", title: "Violet", value: "139, 92, 246" },
  { color: "bg-purple-500", title: "Purple", value: "168, 85, 247" },
  { color: "bg-fuchsia-500", title: "Fuchsia", value: "217, 70, 239" },
  { color: "bg-pink-500", title: "Pink", value: "236, 72, 153" },
  { color: "bg-rose-500", title: "Rose", value: "244, 63, 94" },
];

export const accentColorMap = accentColors.reduce<
  Record<string, ColorPaletteProps>
>((acc, current) => {
  acc[current.color] = current;
  return acc;
}, {});

interface ContextType {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  messagesOpened: boolean;
  searchOpened: boolean;
  notificationsOpened: boolean;
  toggleMessages: (isOpened?: boolean) => void;
  toggleNotifications: (isOpened?: boolean) => void;
  toggleSearch: (isOpened?: boolean) => void;
  session: Session | null;
  currentOrg: GetOrganizationResponse | undefined;
}

const DashboardContext = createContext<ContextType | null>(null);

export default function DashboardProvider({
  children,
  session,
  currentOrg,
}: {
  children: React.ReactNode;
  session: Session | null;
  currentOrg: GetOrganizationResponse | undefined;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [notificationsOpened, setNotificationsOpened] = useState(false);
  const [messagesOpened, setMessagesOpened] = useState(false);
  const [searchOpened, setSearchOpened] = useState(false);

  // set accent color
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const accentColor = localStorage.getItem("servihero-accent-color");
      if (accentColor) {
        document.documentElement.style.setProperty(
          "--color-primary",
          accentColorMap[accentColor].value,
        );
      }
    }
  }, []);

  // Toggle sidebar and preserve state to local storage
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => {
      localStorage.setItem("sidebar-collapsed", (!prev).toString());
      return !prev;
    });
  }, []);

  const toggleNotifications = useCallback((isOpened?: boolean) => {
    if (isOpened === undefined) {
      setNotificationsOpened((prev) => !prev);
    } else {
      setNotificationsOpened(isOpened);
    }
  }, []);

  const toggleMessages = useCallback((isOpened?: boolean) => {
    if (isOpened === undefined) {
      setMessagesOpened((prev) => !prev);
    } else {
      setMessagesOpened(isOpened);
    }
  }, []);

  const toggleSearch = useCallback((isOpened?: boolean) => {
    if (isOpened === undefined) {
      setSearchOpened((prev) => !prev);
    } else {
      setSearchOpened(isOpened);
    }
  }, []);

  // Set initial value of sidebar collapse with local storage
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setSidebarCollapsed(localStorage.getItem("sidebar-collapsed") === "true");
  //   }
  // }, []);

  return (
    <DashboardContext.Provider
      value={{
        currentOrg,
        messagesOpened,
        notificationsOpened,
        session,
        sidebarCollapsed,
        searchOpened,
        toggleMessages,
        toggleNotifications,
        toggleSearch,
        toggleSidebar,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboardState = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardState must be used within a DashboardProvider",
    );
  }
  return context;
};
