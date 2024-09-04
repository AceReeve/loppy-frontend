"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { useTheme } from "next-themes";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
);

export function StripeElementsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  const options: StripeElementsOptions = {
    appearance: {
      theme: theme === "dark" ? "night" : "stripe",
      variables: {
        borderRadius: "8px",
        fontFamily: "Nunito",
        fontSmooth: "always",
        gridRowSpacing: "24px",
        colorPrimary: "#e87723",
      },
      rules: {
        ".Label": {
          fontWeight: "bold",
        },
        ".Input": {
          boxShadow: "none",
        },
        ".Input:focus": {
          boxShadow: "none",
          borderColor: "var(--colorPrimary)",
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
    mode: "subscription",
    payment_method_types: ["card"],
  };
  return (
    <Elements options={options} stripe={stripePromise}>
      {children}
    </Elements>
  );
}
