import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@repo/hooks-and-utils/query-utils";
import { usePaywallState } from "@/src/providers/paywall-provider";
import PaywallUserInformation from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-steps/steps/paywall-user-information";
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
      steps.reduce<Record<string, any>>(
        (acc, current, index) => {
          acc[current.id] = { ...current, index };
          return acc;
        },
        {},
      ),
    [],
  );

  // To enable navigation using url query param
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    const params = { view: "payment", step: steps[currentStepIndex].id };
    router.push(`?${createQueryString(searchParams, params)}`);
  }, [currentStepIndex]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    const step = stepsMap[stepParam || steps[0].id];
    if (step.index < currentStepIndex) {
      toStepIndex(step.index);
    }
  }, [stepParam]);

  return (
    <div className="relative flex flex-1 flex-col p-8">
      <div className="grid size-full flex-1 grid-cols-12 overflow-hidden rounded-[15px] bg-white">
        <div className="col-span-8 size-full border-r border-[#E7E7E7] bg-white px-12 py-14">
          {/* Stepper */}
          <div className="flex items-center justify-between gap-20">
            {steps.map((step, index) => (
              <button
                className="flex items-center"
                key={index}
                disabled={index >= currentStepIndex}
                onClick={() => {
                  index >= currentStepIndex ? null : toStepIndex(index);
                }}
                type="button"
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-white ${index === currentStepIndex ? "bg-primary" : "bg-[#CECECE]"}`}
                >
                  {index + 1}
                </div>
                <div
                  className={`font-nunito ml-2 text-base leading-none ${index === currentStepIndex ? "text-primary font-medium" : "font-normal text-[#CECECE]"}`}
                >
                  {step.label}
                </div>
              </button>
            ))}
          </div>

          {/* Step Content */}
          <form autoComplete="on" className="font-nunito mt-8">
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
          </form>
        </div>

        {/* Sidebar */}
        <div className="col-span-4 size-full bg-white px-8 py-14">
          <PaywallOrderDetails />
        </div>
      </div>
    </div>
  );
}
