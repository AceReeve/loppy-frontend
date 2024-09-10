import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Skeleton,
} from "@repo/ui/components/ui";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { AlertCircle } from "lucide-react";
import { useSummarizePaymentMutation } from "@repo/redux-utils/src/endpoints/payment.ts";
import { usePaywallState } from "@/src/providers/paywall-provider";

export default function PaywallOrderSummary() {
  const [isLoading, setIsLoading] = useState(true);
  const [
    summarizePayment,
    { data, isLoading: summarizePaymentLoading, error },
  ] = useSummarizePaymentMutation();
  const { confirmationToken } = usePaywallState();
  const { payment_method_preview: paymentMethodPreview } = data ?? {};

  useEffect(() => {
    if (confirmationToken) {
      void summarizePayment({
        confirmationToken,
      })
        .unwrap()
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [confirmationToken, summarizePayment]);

  const renderContentSummary = () => {
    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{getErrorMessage(error)}</AlertDescription>
        </Alert>
      );
    }
    return (
      <>
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <strong>Full Name:</strong>{" "}
            {isLoading || summarizePaymentLoading ? (
              <Skeleton className="h-4 w-[250px]" />
            ) : (
              paymentMethodPreview?.billing_details.name
            )}
          </div>
          {/*<div className="mb-2 mt-4">*/}
          {/*  <strong>Email:</strong> {paymentDetails.cardNumber}*/}
          {/*</div>*/}
          <div className="flex flex-wrap items-center gap-2">
            <strong>Address:</strong>{" "}
            {isLoading || summarizePaymentLoading ? (
              <Skeleton className="h-4 w-[250px]" />
            ) : (
              paymentMethodPreview?.billing_details.address?.line1
            )}
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-5 mt-8 text-lg font-bold leading-[18px] text-black">
          Payment Method
        </div>
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                checked={paymentMethodPreview?.type === "card"}
                className="form-radio text-orange-500"
                name="paymentMethod"
                readOnly
                type="radio"
                value="creditCard"
              />
              <span className="m-4 text-lg font-medium leading-[27px] text-stone-800">
                {/*{paymentDetails.method}*/}
                Credit Card
              </span>
            </label>
            <div className="flex items-center">
              <Image
                alt="Credits"
                className="mr-2 h-10"
                height={42}
                src="/assets/images/credits.png"
                width={201}
              />
            </div>
          </div>

          {/* Display fetched payment details */}
          {/*<div className="mb-2 mt-4">*/}
          {/*  <strong>Name on Card:</strong> {paymentDetails.nameOnCard}*/}
          {/*</div>*/}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <strong>Card Number:</strong>
            {isLoading || summarizePaymentLoading ? (
              <Skeleton className="h-4 w-[250px]" />
            ) : (
              <>**** **** **** {paymentMethodPreview?.card?.last4}</>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <strong>Expiration Date:</strong>{" "}
            {isLoading || summarizePaymentLoading ? (
              <Skeleton className="h-4 w-[250px]" />
            ) : (
              <>
                {paymentMethodPreview?.card?.exp_month}/
                {paymentMethodPreview?.card?.exp_year}
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="font-nunito">
      {/* User Info */}
      <div className="mb-5 text-lg font-bold leading-[18px] text-black">
        Your Information
      </div>
      {renderContentSummary()}
    </div>
  );
}
