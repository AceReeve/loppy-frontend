import {
  PaymentPlan,
  PaymentStatus,
} from "@/src/app/dashboard/_components/paywall/paywall.d.ts";

export interface SummarizePaymentPayload {
  confirmationToken: string;
}

export interface SummarizePaymentResponse {
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
