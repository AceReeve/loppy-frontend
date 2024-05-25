"use client";

import React, { createContext, useContext } from "react";

type ContextType = {};

const MessagesProviderContext = createContext<ContextType | null>(null);

export default function MessagesProviderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MessagesProviderContext.Provider value={{}}>
      {children}
    </MessagesProviderContext.Provider>
  );
}

export const useMessagesProviderState = () => {
  const context = useContext(MessagesProviderContext);
  if (!context) {
    throw new Error(
      "useMessagesProviderState must be used within a MessagesProviderProvider",
    );
  }
  return context;
};
