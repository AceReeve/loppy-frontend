import Image from "next/image";
import { useEffect } from "react";
import { usePaywallState } from "@/src/providers/paywall-provider";
import { useSummarizePaymentMutation } from "@/src/endpoints/payment.ts";

export default function PaywallOrderSummary() {
  const [summarizePayment, { data }] = useSummarizePaymentMutation();
  const { confirmationToken } = usePaywallState();
  const { payment_method_preview: paymentMethodPreview } = data ?? {};

  useEffect(() => {
    if (confirmationToken) {
      summarizePayment({
        confirmationToken,
      });
    }
  }, [confirmationToken]);

  return (
    <div className="font-nunito">
      {/* User Info */}
      <div className="mb-5 text-lg font-bold leading-[18px] text-black">
        Your Information
      </div>
      <div className="rounded-xl border border-zinc-300 bg-white p-2">
        <div className="mb-2 mt-4">
          <strong>Full Name:</strong>{" "}
          {paymentMethodPreview?.billing_details?.name}
        </div>
        {/*<div className="mb-2 mt-4">*/}
        {/*  <strong>Email:</strong> {paymentDetails.cardNumber}*/}
        {/*</div>*/}
        <div className="mb-2 mt-4">
          <strong>Address:</strong>{" "}
          {paymentMethodPreview?.billing_details?.address?.line1}
        </div>
      </div>

      {/* Payment Info */}
      <div className="mb-5 mt-5 text-lg font-bold leading-[18px] text-black">
        Payment Method
      </div>
      <div className="rounded-xl border border-zinc-300 bg-white p-2">
        <div className="mb-2 mt-4 flex items-center justify-between">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              className="form-radio text-orange-500"
              value="creditCard"
              checked={paymentMethodPreview?.type === "card"}
              readOnly
            />
            <span className="m-4 text-lg font-medium leading-[27px] text-stone-800">
              {/*{paymentDetails.method}*/}
              Credit Card
            </span>
          </label>
          <div className="flex items-center">
            <Image
              width={201}
              height={42}
              src="/assets/images/credits.png"
              alt="Credits"
              className="mr-2 h-10"
            />
          </div>
        </div>
        <div className="border border-zinc-300"></div>

        {/* Display fetched payment details */}
        {/*<div className="mb-2 mt-4">*/}
        {/*  <strong>Name on Card:</strong> {paymentDetails.nameOnCard}*/}
        {/*</div>*/}
        <div className="mb-2 mt-4">
          <strong>Card Number:</strong> *****************
          {paymentMethodPreview?.card?.last4}
        </div>
        <div className="mb-2 mt-4">
          <strong>Expiration Date:</strong>{" "}
          {paymentMethodPreview?.card?.exp_month}/
          {paymentMethodPreview?.card?.exp_year}
        </div>
      </div>
    </div>
  );
}
