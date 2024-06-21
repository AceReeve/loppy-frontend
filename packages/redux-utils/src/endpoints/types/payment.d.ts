import type { PaymentPlan, PaymentStatus } from "../enums/paywall.enums.ts";

export interface SummarizePaymentPayload {
  confirmationToken: string;
}

export interface SummarizePaymentResponse {
  // TODO: set proper type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- disregard error
  payment_method_preview: any;
}

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
