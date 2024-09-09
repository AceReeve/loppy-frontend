/* eslint-disable camelcase -- disable temporarily */

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "@repo/ui/components/ui";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useCreateSubscriptionMutation } from "@repo/redux-utils/src/endpoints/payment.ts";
import { LoadingOverlay } from "@repo/ui/loading-overlay.tsx";
import { useForm, type UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetUserInfoQuery,
  useSaveUserInfoMutation,
} from "@repo/redux-utils/src/endpoints/user.ts";
import { SubscriptionStatus } from "@repo/redux-utils/src/endpoints/enums/paywall.enums.ts";
import { type GetPaymentStatusResponse } from "@repo/redux-utils/src/endpoints/types/payment";
import { RegisterDetailsSchema } from "@/src/schemas";
import type { PlanDetails } from "@/src/data/payment-plan-details";
import { revalidatePaymentStatus } from "@/src/actions/paywall-actions.ts";

interface ContextType {
  viewIndex: number;
  stepIndex: number;
  paymentPlan: PlanDetails | undefined;
  toNextView: () => void;
  toNextStep: () => void;
  toPrevStep: () => void;
  toStepIndex: (index: number) => void;
  setViewIndex: (index: number) => void;
  onPlanSelect: (plan: PlanDetails) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
  onPromoCodeSubmit: (e: React.SyntheticEvent) => void;
  clientSecret: string | undefined;
  confirmationToken: string | undefined;
  isPaymentProcessing: boolean;
  nextStepEnabled: boolean;
  setNextStepEnabled: (enabled: boolean) => void;
  form: UseFormReturn<z.infer<typeof RegisterDetailsSchema>>;
}

const PaywallContext = createContext<ContextType | null>(null);

export default function PaywallProvider({
  paymentStatus,
  children,
}: {
  paymentStatus: GetPaymentStatusResponse | { error: string };
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

  const [
    createSubscription,
    { data: clientSecret, isLoading: isLoadingCreateSubscription },
  ] = useCreateSubscriptionMutation();
  const [saveUserInfo, { isLoading: isLoadingSaveUserInfo }] =
    useSaveUserInfoMutation();
  const { data: userInfoData, isLoading: isLoadingUserInfo } =
    useGetUserInfoQuery(undefined);

  const isLoading =
    isLoadingCreateSubscription || isLoadingSaveUserInfo || isLoadingUserInfo;

  const stripe = useStripe();
  const elements = useElements();

  // Record last index visited so that the user can freely move across payment steppers
  const [viewIndex, setViewIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [paymentPlan, setPaymentPlan] = useState<PlanDetails>();
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [nextStepEnabled, setNextStepEnabled] = useState(false);

  const [confirmationToken, setConfirmationToken] = useState<string>();

  useEffect(() => {
    if (userInfoData?.userInfo) {
      const {
        first_name,
        last_name,
        address,
        zipCode,
        city,
        state,
        birthday,
        contact_no,
        gender,
      } = userInfoData.userInfo;

      form.reset({
        first_name,
        last_name,
        address,
        zipCode: zipCode?.toString(),
        city,
        state,
        birthday: birthday ? new Date(birthday) : undefined,
        contact_no: contact_no?.toString(),
        gender,
      });
    }
  }, [userInfoData]);

  const toNextView = () => {
    setViewIndex(viewIndex + 1);
  };

  const toNextStep = () => {
    toStepIndex(stepIndex + 1);
  };

  const toPrevStep = () => {
    toStepIndex(stepIndex - 1);
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
        const {
          first_name,
          last_name,
          address,
          zipCode,
          city,
          state,
          birthday,
          contact_no,
          gender,
        } = form.getValues();
        if (!res.error) {
          saveUserInfo({
            first_name,
            last_name,
            address,
            zipCode: Number(zipCode),
            city,
            state,
            contact_no: Number(contact_no),
            gender,
            birthday: birthday?.toISOString() ?? "",
            company: "",
          })
            .unwrap()
            .then(() => {
              toNextStep();
            })
            .catch((err: unknown) => {
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: getErrorMessage(err),
              });
            });
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
                variant: "destructive",
              });
            });
        } else {
          throw new Error(res.error.message);
        }
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
          variant: "destructive",
        });
      });
  };

  const onFinalSubmit = (_e: React.SyntheticEvent) => {
    // TODO: Add loading
    if (!confirmationToken || !paymentPlan?.plan || !elements || !stripe)
      return;
    createSubscription({
      type: paymentPlan.plan,
      confirmationToken,
    })
      .unwrap()
      .then(async (res) => {
        if (!res.success) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: getErrorMessage(res.message),
          });
          return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          redirect: "if_required", // Add this to prevent redirect if next action is not required
          clientSecret: res.subscription?.clientSecret ?? "",
        });

        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: getErrorMessage(error),
          });
          toPrevStep();
        } else if (paymentIntent.status === "succeeded") {
          await refetchPaymentStatus();
        }
      })
      .catch((e: unknown) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: getErrorMessage(e),
        });
      });
  };

  async function refetchPaymentStatus() {
    setIsPaymentProcessing(true);
    await revalidatePaymentStatus();

    // TODO: Add retries limit for refetching
    // const res = await refetch();
    await new Promise((r) => {
      setTimeout(r, 2000);
    });

    if (
      (paymentStatus as { error: string }).error ||
      (paymentStatus as GetPaymentStatusResponse).stripeSubscriptionStatus !==
        SubscriptionStatus.ACTIVE
    ) {
      await refetchPaymentStatus();
    }
    //
    // if (res.data) {
    //   setIsPaymentProcessing(false);
    //   toast({
    //     title: "Payment Successful!",
    //     description: "Thanks for signing up! Let's setup your team.",
    //   });
    // } else {
    //   await refetchPaymentStatus();
    // }
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
        toPrevStep,
        onPlanSelect,
        onSubmit,
        onPromoCodeSubmit,
        clientSecret: clientSecret?.subscription?.clientSecret,
        confirmationToken,
        isPaymentProcessing,
        nextStepEnabled,
        setNextStepEnabled,
        form,
      }}
    >
      {isLoading ? <LoadingOverlay /> : null}
      {children}
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
