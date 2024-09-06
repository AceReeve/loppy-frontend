export enum PaymentPlan {
  ESSENTIAL = "essential",
  PROFESSIONAL = "professional",
  CORPORATE = "corporate",
}

/**
 * Refer to: https://docs.stripe.com/payments/payment-intents/verifying-status#checking-status
 * SUCCEEDED - The customer completed payment on your checkout page
 * REQUIRES_ACTION - The customer didn’t complete the checkout
 * REQUIRES_PAYMENT_METHOD - The customer’s payment failed on your checkout page
 * REQUIRES_CONFIRMATION - The PaymentIntent is ready to be confirmed (skipped in most cases)
 * CANCELED - The customer can cancel a PaymentIntent at any point before it’s in a processing or succeeded state
 * PROCESSING - The PaymentIntent moves to processing for asynchronous payment methods, such as bank debits
 */

export enum PaymentStatus {
  SUCCEEDED = "succeeded",
  REQUIRES_ACTION = "requires_action",
  REQUIRES_PAYMENT_METHOD = "requires_payment_method",
  REQUIRES_CONFIRMATION = "requires_confirmation",
  CANCELED = "canceled",
  PROCESSING = "processing",
}

export enum SubscriptionStatus {
  INCOMPLETE = "incomplete",
  INCOMPLETE_EXPIRED = "incomplete_expired",
  TRIALING = "trialing",
  ACTIVE = "active",
  INACTIVE = "inactive",
  PAST_DUE = "past_due",
  CANCELED = "canceled",
  UNPAID = "unpaid",
  PAUSED = "paused",
  PROCESSING = "processing",
}
