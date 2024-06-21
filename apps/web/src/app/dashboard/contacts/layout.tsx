import React from "react";
import ContactsProvider from "@/src/providers/contacts-provider";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContactsProvider>{children}</ContactsProvider>
  );
}

export default Layout;
