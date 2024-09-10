"use server";

import React, { Suspense } from "react";
import { type Session } from "next-auth";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import type { GetPaymentStatusResponse } from "@repo/redux-utils/src/endpoints/types/payment";
import type { GetOrganizationResponse } from "@repo/redux-utils/src/endpoints/types/organization";
import { SubscriptionStatus } from "@repo/redux-utils/src/endpoints/enums/paywall.enums.ts";
import DashboardHeader from "@/src/app/dashboard/_components/navigation/dashboard-header";
import DashboardSidebar from "@/src/app/dashboard/_components/navigation/dashboard-sidebar";
import DashboardProvider from "@/src/providers/dashboard-provider";
import { StripeElementsProvider } from "@/src/providers/stripe-elements-provider";
import PaywallProvider from "@/src/providers/paywall-provider";
import Paywall from "@/src/app/dashboard/_components/paywall";
import { auth } from "@/auth.ts";
import PaywallProcessingPayment from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-processing-payment";
import PaywallTeamSetup from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-steps/steps/paywall-team-setup.tsx";

async function getOrganizationsList(
  session: Session,
): Promise<GetOrganizationResponse[]> {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not detected");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/twilio-messaging/organization`,
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
      next: {
        tags: ["organization"],
      },
    },
  );

  return response.json() as Promise<GetOrganizationResponse[]>;
}

async function getPaymentStatus(
  session: Session,
): Promise<GetPaymentStatusResponse | { error: string }> {
  if (!process.env.NEXT_PUBLIC_API_URL)
    throw new Error("NEXT_PUBLIC_API_URL is not detected");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/payment-status`,
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
      next: {
        revalidate: 3000,
        tags: ["payment-status"],
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
  const organizationsList = await getOrganizationsList(session);

  /**
   * 1. Get if user has already purchased a plan
   *    - if NOT PURCHASED yet:
   *       - show plans
   *    - if PURCHASED:
   *       - show dashboard page
   */

  const renderPaywallComponents = () => {
    // TODO: Implement view if subscriptionStatus is REQUIRES_ACTION, REQUIRES_PAYMENT_METHOD, or REQUIRES_CONFIRMATION

    if (
      !(paymentStatus as { error: string }).error &&
      (paymentStatus as GetPaymentStatusResponse).stripeSubscriptionStatus ===
        SubscriptionStatus.PROCESSING
    ) {
      return (
        <div className="m-auto p-5">
          <PaywallProcessingPayment />
        </div>
      );
    }
    if (
      !(paymentStatus as { error: string }).error &&
      (paymentStatus as GetPaymentStatusResponse).stripeSubscriptionStatus ===
        SubscriptionStatus.ACTIVE &&
      !organizationsList.length
    ) {
      return (
        <div className="relative m-auto flex min-h-[85%] w-full max-w-[1000px] flex-col rounded-[29px] bg-white">
          <PaywallTeamSetup />
        </div>
      );
    }
    return <Paywall />;
  };

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

      {/**
       - If no active subscription (paymentStatus)
       - and no organizations setup, show setup modal
       **/}

      {/* TODO: Ask payment status to have a default status returned instead of error */}
      {(paymentStatus as { error: string }).error ||
      !organizationsList.length ? (
        <StripeElementsProvider>
          <PaywallProvider paymentStatus={paymentStatus}>
            <div className="absolute left-0 top-0 z-10 flex min-h-full min-w-full p-5 pt-[55px]">
              <div className="absolute left-0 top-0 size-full bg-black bg-opacity-40 backdrop-blur-md" />
              {renderPaywallComponents()}
            </div>
          </PaywallProvider>
        </StripeElementsProvider>
      ) : null}
    </Suspense>
  );
}
