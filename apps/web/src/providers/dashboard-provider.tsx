"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { type Session } from "next-auth";
import { type GetOrganizationResponse } from "@repo/redux-utils/src/endpoints/types/organization";

interface ContextType {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  session: Session | null;
  currentOrg: GetOrganizationResponse;
}

const DashboardContext = createContext<ContextType | null>(null);

export default function DashboardProvider({
  children,
  session,
  currentOrg,
}: {
  children: React.ReactNode;
  session: Session | null;
  currentOrg: GetOrganizationResponse;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // Toggle sidebar and preserve state to local storage
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => {
      localStorage.setItem("sidebar-collapsed", (!prev).toString());
      return !prev;
    });
  }, []);

  // Set initial value of sidebar collapse with local storage
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setSidebarCollapsed(localStorage.getItem("sidebar-collapsed") === "true");
  //   }
  // }, []);

  return (
    <DashboardContext.Provider
      value={{ sidebarCollapsed, toggleSidebar, session, currentOrg }}
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
