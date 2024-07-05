import type { ConfirmationToken } from "@stripe/stripe-js";
import type { PaymentPlan, PaymentStatus } from "../enums/paywall.enums.ts";

export interface SummarizePaymentPayload {
  confirmationToken: string;
}

export type SummarizePaymentResponse = ConfirmationToken;

export interface CreatePaymentIntentPayload {
  type: PaymentPlan;
  confirmationToken: string;
}

export interface CreatePaymentIntentResponse {
  client_secret: string;
  status: PaymentStatus;
}

export interface GetPaymentStatusResponse {
  stripe_event_id: string;
  created_at: string;
  updated_at: string;
  stripeSubscriptionDate: string;
  stripeSubscriptionExpirationDate: string;
  stripeSubscriptionStatus: PaymentStatus;
  stripeSubscriptionType: string;
  subscriptionPlan: string;
  user_id: string;
}
