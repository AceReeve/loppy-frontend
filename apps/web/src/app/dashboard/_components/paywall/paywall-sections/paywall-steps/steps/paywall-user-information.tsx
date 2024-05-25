import { AddressElement } from "@stripe/react-stripe-js";
import type { StripeAddressElementOptions } from "@stripe/stripe-js";

export default function PaywallUserInformation() {
  const addressElementOptions: StripeAddressElementOptions = {
    mode: "billing",
    display: {
      name: "split",
    },
    allowedCountries: ["US"],
    defaultValues: {
      // By default, line 2, city, state, etc. is collapsed
      // so provide default value to expand automatically
      address: {
        state: "-",
        country: "US",
      },
    },
  };

  return (
    <>
      <div className="mb-5 text-lg font-bold leading-[18px] text-black">
        Your Information
      </div>
      <AddressElement id="payment-element" options={addressElementOptions} />
    </>
  );
}
