import MessagesProvider from "@/src/providers/messages-provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MessagesProvider>{children}</MessagesProvider>;
}
