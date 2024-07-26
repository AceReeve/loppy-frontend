import React, { Suspense } from "react";
import { type Session } from "next-auth";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import type { GetPaymentStatusResponse } from "@repo/redux-utils/src/endpoints/types/payment";
import DashboardHeader from "@/src/app/dashboard/_components/navigation/dashboard-header";
import DashboardSidebar from "@/src/app/dashboard/_components/navigation/dashboard-sidebar";
import DashboardProvider from "@/src/providers/dashboard-provider";
import { StripeElementsProvider } from "@/src/providers/stripe-elements-provider";
import PaywallProvider from "@/src/providers/paywall-provider";
import Paywall from "@/src/app/dashboard/_components/paywall";
import { auth } from "@/auth.ts";

interface PaymentStatusError {
  error: string;
}

async function getPaymentStatus(
  session: Session,
): Promise<GetPaymentStatusResponse | PaymentStatusError> {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not detected");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/user-info`,
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    },
  );

  if (!response.ok) {
    const res: unknown = await response.json();
    return {
      error: getErrorMessage({ data: res }),
    };
  }

  return response.json() as Promise<GetPaymentStatusResponse>;
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) return;

  const paymentStatus = await getPaymentStatus(session);

  /**
   * 1. Get if user has already purchased a plan
   *    - if NOT PURCHASED yet:
   *       - show plans
   *    - if PURCHASED:
   *       - show dashboard page
   */

  return (
    <Suspense>
      <DashboardProvider session={session}>
        <div className="relative z-0 flex min-h-screen items-stretch bg-background">
          <DashboardSidebar className="relative z-40 h-screen flex-shrink-0 select-none" />
          <div className="relative flex h-screen w-full flex-1 flex-col overflow-hidden rounded-tl-[48px]">
            <DashboardHeader />
            <div className="custom-scrollbar relative flex w-full flex-1 flex-col overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </DashboardProvider>
      {(paymentStatus as PaymentStatusError).error ? (
        <StripeElementsProvider>
          <PaywallProvider>
            <Paywall />
          </PaywallProvider>
        </StripeElementsProvider>
      ) : null}
    </Suspense>
  );
}
