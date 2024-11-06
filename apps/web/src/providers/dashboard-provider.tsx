"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { type Session } from "next-auth";
import { type GetOrganizationResponse } from "@repo/redux-utils/src/endpoints/types/organization";

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
