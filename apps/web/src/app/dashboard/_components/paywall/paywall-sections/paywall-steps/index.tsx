import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@repo/hooks-and-utils/query-utils";
import { usePaywallState } from "@/src/providers/paywall-provider";
import PaywallUserInformation from "@/src/app/auth/register/register-details/paywall-user-information.tsx";
import PaywallOrderDetails from "../paywall-order-details";
import PaywallPaymentMethod from "./steps/paywall-payment-method";
import PaywallOrderSummary from "./steps/paywall-order-summary";

export default function PaywallSteps() {
  const { stepIndex: currentStepIndex, toStepIndex } = usePaywallState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");
  const steps = [
    {
      label: "User Information",
      id: "user-information",
      component: PaywallUserInformation,
    },
    {
      label: "Payment Method",
      id: "payment-method",
      component: PaywallPaymentMethod,
    },
    {
      label: "Order Summary",
      id: "order-summary",
      component: PaywallOrderSummary,
    },
  ];

  const stepsMap = useMemo(
    () =>
      steps.reduce<Record<string, number>>((acc, current, index) => {
        acc[current.id] = index;
        return acc;
      }, {}),
    [],
  );

  // To enable navigation using url query param
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    const params = { view: "payment", step: steps[currentStepIndex].id };
    router.push(`?${createQueryString(searchParams, params).toString()}`);
  }, [currentStepIndex]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    const step = stepsMap[stepParam ?? steps[0].id];
    if (step < currentStepIndex) {
      toStepIndex(step);
    }
  }, [stepParam]);

  return (
    <div className="relative flex flex-1 flex-col p-8">
      <div className="grid size-full flex-1 grid-cols-12 gap-2 overflow-hidden">
        <div className="col-span-8 size-full rounded-2xl bg-white px-12 py-14 shadow-card">
          {/* Stepper */}
          <div className="flex items-center justify-between gap-20">
            {steps.map((step, index) => (
              <button
                className="flex flex-wrap items-center justify-center gap-4"
                key={step.id}
                disabled={index >= currentStepIndex}
                onClick={() => {
                  index >= currentStepIndex ? null : toStepIndex(index);
                }}
                type="button"
              >
                <div
                  className={`flex size-7 items-center justify-center rounded-full text-white ${index === currentStepIndex ? "bg-primary" : "bg-[#CECECE]"}`}
                >
                  {index + 1}
                </div>
                <div
                  className={`font-nunito text-base leading-none ${index === currentStepIndex ? "font-medium text-primary" : "font-normal text-[#CECECE]"}`}
                >
                  {step.label}
                </div>
              </button>
            ))}
          </div>

          {/* Step Content */}
          <div className="mt-8 font-nunito">
            {steps.map((step, index) => {
              if (index <= currentStepIndex) {
                const StepComponent = step.component;
                return (
                  <div key={step.id} hidden={index !== currentStepIndex}>
                    <StepComponent />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-4 size-full rounded-2xl bg-white px-8 py-14 shadow-card">
          <PaywallOrderDetails />
        </div>
      </div>
    </div>
  );
}
