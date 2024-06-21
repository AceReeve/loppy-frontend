"use client";

import React, { createContext, useContext } from "react";

interface ContextType {}

const ContactsContext = createContext<ContextType | null>(null);

export default function ContactsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContactsContext.Provider value={{}}>{children}</ContactsContext.Provider>
  );
}

export const useContactsState = () => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContactsState must be used within a ContactsProvider");
  }
  return context;
};
