import "@repo/ui/styles.css";
import "@repo/tailwind-config/styles.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StoreProvider } from "@repo/redux-utils/src";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@repo/ui/components/ui";
import NextTopLoader from "nextjs-toploader";
import { hexToRgb } from "@repo/hooks-and-utils/color-utils";
import { ThemeProvider } from "@/src/providers/theme-provider";
import { auth } from "@/auth.ts";
import { getAccentColor } from "@/src/actions/dashboard-actions.ts";
import { accentColorMap } from "@/src/components/color-picker/constants/color-picker.const.ts";

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

  const accentColor = await getAccentColor();
  const primaryColor =
    accentColor.colorName === "Custom"
      ? (hexToRgb(accentColor.customColor ?? "")?.toString() ?? "232, 119, 35")
      : (accentColorMap[accentColor.colorName]?.value ?? "232, 119, 35");

  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{
        // @ts-expect-error -- just ignore since this is just a css variable
        "--color-primary": primaryColor,
      }}
    >
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
