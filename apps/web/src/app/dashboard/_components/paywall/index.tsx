"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@repo/hooks-and-utils/query-utils";
import { SubscriptionStatus } from "@repo/redux-utils/src/endpoints/enums/paywall.enums";
import { useGetOrganizationsQuery } from "@repo/redux-utils/src/endpoints/organization.ts";
import PaywallPlanSelection from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-steps/steps/paywall-plan-selection";
import { usePaywallState } from "@/src/providers/paywall-provider";
import PaywallSteps from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-steps";
import PaywallTeamSetup from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-steps/steps/paywall-team-setup";
import PaywallProcessingPayment from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-processing-payment";

export default function Paywall() {
  const router = useRouter();

  const { data: organizations } = useGetOrganizationsQuery(undefined);
  const searchParams = useSearchParams();
  const { viewIndex, setViewIndex, paymentStatus, isPaymentProcessing } =
    usePaywallState();
  const viewParam = searchParams.get("view");

  const views = [
    {
      label: "Plan Selection",
      id: "plan-selection",
      component: PaywallPlanSelection,
    },
    {
      label: "Payment",
      id: "payment",
      component: PaywallSteps,
    },
    {
      label: "Team Setup",
      id: "team-setup",
      component: PaywallTeamSetup,
    },
  ];

  const viewsMap = useMemo(
    () =>
      views.reduce<Record<string, number>>((acc, current, index) => {
        acc[current.id] = index;
        return acc;
      }, {}),
    [],
  );

  const Components = views[viewIndex].component;

  // To enable navigation using url query param
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    const params = { view: views[viewIndex].id };
    router.push(`?${createQueryString(searchParams, params).toString()}`);
  }, [viewIndex]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    const view = viewsMap[viewParam ?? views[0].id];
    if (view < viewIndex) {
      setViewIndex(view);
    }
  }, [viewParam]);

  const renderComponent = () => {
    // TODO: Implement view if subscriptionStatus is REQUIRES_ACTION, REQUIRES_PAYMENT_METHOD, or REQUIRES_CONFIRMATION

    if (
      isPaymentProcessing ||
      paymentStatus?.stripeSubscriptionStatus === SubscriptionStatus.PROCESSING
    ) {
      return (
        <div className="m-auto p-5">
          <PaywallProcessingPayment />
        </div>
      );
    }
    if (paymentStatus?.stripeSubscriptionStatus === SubscriptionStatus.ACTIVE) {
      return (
        <div className="relative m-auto flex min-h-[85%] w-full max-w-[1000px] flex-col rounded-[29px] bg-white">
          <PaywallTeamSetup />
        </div>
      );
    }
    return (
      <div className="relative m-auto flex w-full max-w-[1283px] flex-col rounded-[29px] bg-gray-100">
        <Components />
      </div>
    );
  };

  return organizations?.length ? null : (
    <div className="absolute left-0 top-0 z-10 flex min-h-full min-w-full p-5 pt-[55px]">
      <div className="absolute left-0 top-0 size-full bg-black bg-opacity-40 backdrop-blur-md" />
      {renderComponent()}
    </div>
  );
}
