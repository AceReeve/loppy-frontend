"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export function StripeElementsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const options: StripeElementsOptions = {
    appearance: {
      theme: "stripe",
      variables: {
        borderRadius: "8px",
        fontFamily: "Nunito",
        fontSmooth: "always",
        gridRowSpacing: "24px",
      },
      rules: {
        ".Label": {
          fontWeight: "bold",
        },
        ".Input": {
          boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css?family=Nunito:wght@200..1000",
      },
    ],
    amount: 99,
    currency: "usd",
    mode: "payment",
  };
  return (
    <Elements options={options} stripe={stripePromise}>
      {children}
    </Elements>
  );
}
