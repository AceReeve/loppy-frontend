import { PaymentElement } from "@stripe/react-stripe-js";
import type { StripePaymentElementOptions } from "@stripe/stripe-js";
import { usePaywallState } from "@/src/providers/paywall-provider.tsx";

export default function PaywallPaymentMethod() {
  const { form } = usePaywallState();

  const options: StripePaymentElementOptions = {
    layout: {
      type: "accordion",
    },

    defaultValues: {
      billingDetails: {
        address: {
          postal_code: form.getValues().zipCode,
          country: "US",
        },
      },
    },
  };

  return <PaymentElement className="max-w-xl" options={options} />;
}
