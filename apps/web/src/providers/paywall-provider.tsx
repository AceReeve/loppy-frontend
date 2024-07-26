"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { toast, ToastAction } from "@repo/ui/components/ui";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import type { PaymentPlan } from "@repo/redux-utils/src/endpoints/enums/paywall.enums.ts";
import {
  useCreatePaymentIntentMutation,
  useGetPaymentStatusQuery,
} from "@repo/redux-utils/src/endpoints/payment.ts";
import type { GetPaymentStatusResponse } from "@repo/redux-utils/src/endpoints/types/payment";
import { LoadingOverlay } from "@repo/ui/loading-overlay.tsx";
import { useForm, type UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterDetailsSchema } from "@/src/schemas";
import type { PlanDetails } from "@/src/data/payment-plan-details";

interface ContextType {
  isLoading: boolean;
  viewIndex: number;
  stepIndex: number;
  paymentPlan: PlanDetails | undefined;
  toNextView: () => void;
  toNextStep: () => void;
  toStepIndex: (index: number) => void;
  setViewIndex: (index: number) => void;
  onPlanSelect: (plan: PlanDetails) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
  onPromoCodeSubmit: (e: React.SyntheticEvent) => void;
  clientSecret: string | undefined;
  confirmationToken: string | undefined;
  storage: { plan: PaymentPlan } | undefined;
  setStorage: ({ plan }: { plan: PaymentPlan }) => void;
  paymentStatus: GetPaymentStatusResponse | null | undefined;
  isPaymentProcessing: boolean;
  nextStepEnabled: boolean;
  setNextStepEnabled: (enabled: boolean) => void;
  form: UseFormReturn<z.infer<typeof RegisterDetailsSchema>>;
}

const PaywallContext = createContext<ContextType | null>(null);

export default function PaywallProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const form = useForm<z.infer<typeof RegisterDetailsSchema>>({
    resolver: zodResolver(RegisterDetailsSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      contact_no: "",
      birthday: undefined,
      gender: "",
    },
    mode: "all",
  });

  const [createPaymentIntent, { data: clientSecret, isLoading }] =
    useCreatePaymentIntentMutation();

  const { data: paymentStatus, refetch } = useGetPaymentStatusQuery(undefined);

  const stripe = useStripe();
  const elements = useElements();

  // Record last index visited so that the user can freely move across payment steppers
  const [viewIndex, setViewIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [paymentPlan, setPaymentPlan] = useState<PlanDetails>();
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [nextStepEnabled, setNextStepEnabled] = useState(false);

  const [mounted, setMounted] = useState(false);

  const [confirmationToken, setConfirmationToken] = useState<string>();

  const toNextView = () => {
    setViewIndex(viewIndex + 1);
  };

  const toNextStep = () => {
    toStepIndex(stepIndex + 1);
  };

  const toStepIndex = (index: number) => {
    setStepIndex(index);
  };

  const onPlanSelect = (plan: PlanDetails) => {
    setPaymentPlan(plan);
    elements?.update({
      amount: plan.cost,
    });
    toNextView();
  };

  const onUserInformationSubmit = (_e: React.SyntheticEvent) => {
    elements
      ?.submit()
      .then((res) => {
        if (!res.error) {
          toNextStep();
        }
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };
  const onPaymentMethodSubmit = (_e: React.SyntheticEvent) => {
    elements
      ?.submit()
      .then((res) => {
        if (!res.error) {
          toNextStep();
          stripe
            ?.createConfirmationToken({
              elements,
              params: {
                payment_method_data: {
                  billing_details: {
                    address: {
                      city: form.getValues().city,
                      state: form.getValues().state,
                      line1: form.getValues().address,
                      line2: form.getValues().address2,
                    },
                    name: `${form.getValues().first_name} ${form.getValues().last_name}`,
                    phone: form.getValues().contact_no,
                  },
                },
              },
            })
            .then((confirmTokenResult) => {
              if (confirmTokenResult.error) {
                throw new Error(confirmTokenResult.error.message);
              }
              setConfirmationToken(confirmTokenResult.confirmationToken.id);
            })
            .catch((e: unknown) => {
              toast({
                description: getErrorMessage(e),
              });
            });
        } else {
          throw new Error(res.error.message);
        }
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  const onFinalSubmit = (_e: React.SyntheticEvent) => {
    // TODO: Add loading
    if (!confirmationToken || !paymentPlan?.plan) return;
    createPaymentIntent({
      type: paymentPlan.plan,
      confirmationToken,
    })
      .unwrap()
      .then(async () => {
        await refetchPaymentStatus();
      })
      .catch((e: unknown) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: getErrorMessage(e),
          action: (
            <ToastAction
              altText="Try again"
              onClick={() => {
                onFinalSubmit(_e);
              }}
            >
              Try again
            </ToastAction>
          ),
        });
      });
  };

  async function refetchPaymentStatus() {
    setIsPaymentProcessing(true);
    // TODO: Add retries limit for refetching
    const res = await refetch();
    await new Promise((r) => {
      setTimeout(r, 2000);
    });

    if (res.data) {
      setIsPaymentProcessing(false);
      toast({
        title: "Payment Successful!",
        description: "Thanks for signing up! Let's setup your team.",
      });
    } else {
      await refetchPaymentStatus();
    }
  }

  const onPromoCodeSubmit = (e: React.SyntheticEvent) => {
    // console.log(data);
    e.preventDefault();
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    switch (stepIndex) {
      case 0:
        onUserInformationSubmit(e);
        break;
      case 1:
        onPaymentMethodSubmit(e);
        break;
      case 2:
        onFinalSubmit(e);
        break;
    }
  };

  // Temporary local storage
  const [storage, setStorage] = useState<{
    plan: PaymentPlan;
  }>();

  useEffect(() => {
    if (storage) {
      localStorage.setItem("storage", JSON.stringify(storage));
    }
  }, [storage]);

  useEffect(() => {
    const items = localStorage.getItem("storage");
    if (items) {
      setStorage(JSON.parse(items) as typeof storage);
    }
    setMounted(true);
  }, []);

  return (
    <PaywallContext.Provider
      value={{
        viewIndex,
        stepIndex,
        paymentPlan,
        toStepIndex,
        setViewIndex,
        toNextView,
        toNextStep,
        onPlanSelect,
        onSubmit,
        onPromoCodeSubmit,
        clientSecret: clientSecret?.client_secret,
        confirmationToken,
        isLoading,
        storage,
        setStorage,
        paymentStatus,
        isPaymentProcessing,
        nextStepEnabled,
        setNextStepEnabled,
        form,
      }}
    >
      {isLoading ? <LoadingOverlay /> : null}
      {mounted && !storage?.plan ? children : null}
    </PaywallContext.Provider>
  );
}

export const usePaywallState = () => {
  const context = useContext(PaywallContext);
  if (!context) {
    throw new Error("usePaywallState must be used within a PaywallProvider");
  }
  return context;
};
