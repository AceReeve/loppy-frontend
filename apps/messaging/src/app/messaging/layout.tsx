import MessagesProvider from "@repo/messaging-ui/messages-provider";
import { auth } from "@/auth.ts";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <MessagesProvider session={session}>{children}</MessagesProvider>
    </div>
  );
}
