"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@repo/hooks-and-utils/query-utils";
import { PaymentStatus } from "@repo/redux-utils/src/endpoints/enums/paywall.enums";
import PaywallPlanSelection from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-steps/steps/paywall-plan-selection";
import { usePaywallState } from "@/src/providers/paywall-provider";
import PaywallSteps from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-steps";
import PaywallTeamSetup from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-steps/steps/paywall-team-setup";
import PaywallProcessingPayment from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-processing-payment";
import Registration from "@/src/app/dashboard/_components/registration";

export default function Paywall() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { viewIndex, setViewIndex, paymentStatus, isPaymentProcessing } =
    usePaywallState();
  const viewParam = searchParams.get("view");

  const views = [
    {
      label: "Registration Details",
      id: "registration-details",
      component: Registration,
    },
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
    // {
    //   label: "Team Setup",
    //   component: PaywallPaymentMethod,
    // },
  ];

  const viewsMap = useMemo(
    () =>
      views.reduce<Record<string, any>>((acc, current, index) => {
        acc[current.id] = { ...current, index };
        return acc;
      }, {}),
    [],
  );

  const Components = views[viewIndex].component;
  const TeamSetupComponent = views[2].component;

  // To enable navigation using url query param
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    const params = { view: views[viewIndex].id };
    router.push(`?${createQueryString(searchParams, params)}`);
  }, [viewIndex]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    const view = viewsMap[viewParam || views[0].id];
    if (view.index < viewIndex) {
      setViewIndex(view.index);
    }
  }, [viewParam]);

  const renderComponent = () => {
    // TODO: Implement view if subscriptionStatus is REQUIRES_ACTION, REQUIRES_PAYMENT_METHOD, or REQUIRES_CONFIRMATION

    if (
      isPaymentProcessing ||
      paymentStatus?.stripeSubscriptionStatus === PaymentStatus.PROCESSING
    ) {
      return (
        <div className="m-auto p-5">
          <PaywallProcessingPayment />
        </div>
      );
    }
    if (paymentStatus?.stripeSubscriptionStatus === PaymentStatus.SUCCEEDED) {
      return (
        <div className="relative m-auto flex min-h-[85%] w-full max-w-[1283px] flex-col rounded-[29px] border border-neutral-300 bg-gradient-to-b from-indigo-950 to-purple-950">
          <TeamSetupComponent />
        </div>
      );
    }
    return (
      <div className="relative m-auto flex min-h-[85%] w-full max-w-[1283px] flex-col rounded-[29px] border border-neutral-300 bg-gradient-to-b from-indigo-950 to-purple-950">
        <Components />
      </div>
    );
  };

  return (
    <div className="absolute left-0 top-0 z-10 flex size-full">
      <div className="absolute left-0 top-0 size-full bg-black bg-opacity-40 backdrop-blur-md" />
      {renderComponent()}
    </div>
  );
}
