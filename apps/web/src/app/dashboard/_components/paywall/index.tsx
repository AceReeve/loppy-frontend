"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@repo/hooks-and-utils/query-utils";
import PaywallPlanSelection from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-steps/steps/paywall-plan-selection";
import { usePaywallState } from "@/src/providers/paywall-provider";
import PaywallSteps from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-steps";
import PaywallProcessingPayment from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-processing-payment";

export default function Paywall() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const { viewIndex, setViewIndex, isPaymentProcessing } = usePaywallState();
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

    if (isPaymentProcessing) {
      return (
        <div className="m-auto p-5">
          <PaywallProcessingPayment />
        </div>
      );
    }
    return (
      <div className="relative m-auto flex w-full max-w-[1283px] flex-col rounded-[29px] bg-gray-100">
        <Components />
      </div>
    );
  };

  return renderComponent();
}
