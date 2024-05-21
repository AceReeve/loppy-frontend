import { PaymentPlan } from "@/src/app/dashboard/_components/paywall/paywall.enums.ts";

export type PlanDetails = {
  title: string;
  name: string;
  cost: number;
  inclusions: string[];
  plan: PaymentPlan;
};

export const paymentPlanDetails: { [_key in PaymentPlan]: PlanDetails } = {
  [PaymentPlan.ESSENTIAL]: {
    title: "Starter Hero",
    name: "Essential Plan",
    cost: 99,
    plan: PaymentPlan.ESSENTIAL,
    inclusions: [
      "Access for up to 2 users",
      "Basic sales & marketing automation",
      "Email marketing integration",
      "Lead & contact management",
      "Customer support via email",
      "Reporting & dashboard analytics",
    ],
  },
  [PaymentPlan.PROFESSIONAL]: {
    title: "Advanced Hero",
    name: "Professional Plan",
    cost: 299,
    plan: PaymentPlan.PROFESSIONAL,
    inclusions: [
      "Everything in Essential, plus",
      "Advanced automation + workflow capabilities",
      "Access up to 5 users",
      "Multi-channel campaign management (email, SMS, social media)",
      "API access for custom integrations (ServiceTitan, HCP,etc)",
      "Customer list segmentation & grouping",
      "Priority email & chat support",
    ],
  },
  [PaymentPlan.CORPORATE]: {
    title: "Corporate Hero",
    name: "Corporate Plan",
    cost: 499,
    plan: PaymentPlan.CORPORATE,
    inclusions: [
      "Everything in Professional, plus:",
      "Unlimited user access",
      "Customizable CRM to fit corporate needs",
      "Advanced analytics with predictive insights",
      "Dedicated account manager",
      "Onboarding & ongoing training",
      "Advanced security features",
      "Phone support with SLA (Service Level Agreement)",
      "Custom development options for deep integrations",
    ],
  },
};
