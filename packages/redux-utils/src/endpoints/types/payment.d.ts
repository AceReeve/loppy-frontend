import type { ConfirmationToken } from "@stripe/stripe-js";
import {
  type PaymentPlan,
  type PaymentStatus,
  type SubscriptionStatus,
} from "../enums/paywall.enums.ts";

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

export interface CreateSubscriptionPayload {
  type: PaymentPlan;
  confirmationToken: string;
}

export interface CreateSubscriptionResponse {
  subscription?: {
    clientSecret?: string;
    subscriptionId?: string;
  };
  success: boolean;
  message?: {
    message?: string;
  };
}

export interface GetPaymentStatusResponse {
  stripe_event_id: string;
  created_at: string;
  updated_at: string;
  stripeSubscriptionDate: string;
  stripeSubscriptionExpirationDate: string;
  stripeSubscriptionStatus: SubscriptionStatus;
  stripeSubscriptionType: string;
  subscriptionPlan: string;
  user_id: string;
}
