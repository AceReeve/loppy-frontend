import "@repo/ui/styles.css";
import "@repo/tailwind-config/styles.css";
// import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StoreProvider } from "@repo/redux-utils/src";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@repo/ui/components/ui";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/src/providers/theme-provider";
import { auth } from "@/auth.ts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Servihero",
  description: "Your Service Sidekick",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader color="rgb(var(--color-primary))" showSpinner={false} />
        <SessionProvider session={session}>
          <StoreProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              {children}
            </ThemeProvider>
          </StoreProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
