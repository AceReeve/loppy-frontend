import React, { Suspense } from "react";
import DashboardHeader from "@/src/app/dashboard/_components/navigation/dashboard-header";
import DashboardSidebar from "@/src/app/dashboard/_components/navigation/dashboard-sidebar";
import DashboardProvider from "@/src/providers/dashboard-provider";
import { StripeElementsProvider } from "@/src/providers/stripe-elements-provider";
import PaywallProvider from "@/src/providers/paywall-provider";
import Paywall from "@/src/app/dashboard/_components/paywall";
import { auth } from "@/auth.ts";
import Registration from "@/src/app/dashboard/_components/registration";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <Suspense>
      <DashboardProvider session={session}>
        <div className="relative z-0 flex min-h-screen items-stretch bg-secondary">
          <DashboardSidebar className="custom-scrollbar relative z-40  h-auto max-h-screen min-h-screen flex-shrink-0 select-none overflow-y-auto bg-secondary" />
          <div className="relative flex h-screen w-full flex-1 flex-col overflow-hidden rounded-tl-[48px]">
            <DashboardHeader />
            <div className="custom-scrollbar relative flex w-full flex-1 flex-col overflow-y-auto bg-gray-50">
              {children}
            </div>
          </div>
        </div>
        <StripeElementsProvider>
          <PaywallProvider>
            <Paywall />
          </PaywallProvider>
        </StripeElementsProvider>
      </DashboardProvider>
    </Suspense>
  );
}
