"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Session } from "next-auth";

type ContextType = {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  session: Session | null;
};

const DashboardContext = createContext<ContextType | null>(null);

export default function DashboardProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Toggle sidebar and preserve state to local storage
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => {
      localStorage.setItem("sidebar-collapsed", (!prev).toString());
      return !prev;
    });
  }, []);

  // Set initial value of sidebar collapse with local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSidebarCollapsed(localStorage.getItem("sidebar-collapsed") === "true");
    }
  }, []);

  return (
    <DashboardContext.Provider
      value={{ sidebarCollapsed, toggleSidebar, session }}
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
