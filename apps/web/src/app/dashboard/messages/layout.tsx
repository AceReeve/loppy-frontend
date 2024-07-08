import MessagesProvider from "@repo/messaging-ui/messages-provider";
import { auth } from "@/auth.ts";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <MessagesProvider session={session}>{children}</MessagesProvider>
    </div>
  );
}
