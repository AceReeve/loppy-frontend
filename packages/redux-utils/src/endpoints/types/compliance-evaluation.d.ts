import { type EvaluationStatus } from "../enums/compliance-evaluation.enums.ts";

interface EvaluationInvalidEntry {
  friendly_name: string;
  object_field: string;
  failure_reason: string;
  error_code: number;
}

interface EvaluationResult {
  friendly_name: string;
  object_type: string;
  passed: boolean;
  failure_reason: string;
  error_code: number;
  valid: unknown[];
  invalid: EvaluationInvalidEntry[];
  requirement_friendly_name: string;
  requirement_name: string;
}

export interface CustomerProfileEvaluationPayload {
  customerProfileSID: string;
  isSoleProprietor: boolean;
}

export interface CustomerProfileEvaluationResponse {
  sid: string;
  account_sid: string;
  policy_sid: string;
  customer_profile_sid: string;
  status: EvaluationStatus;
  date_created: string;
  url: string;
  results: EvaluationResult[];
}

export interface TrustProductEvaluationResponse {
  sid: string;
  account_sid: string;
  policy_sid: string;
  trust_product_sid: string;
  status: EvaluationStatus;
  date_created: string;
  url: string;
  results: EvaluationResult[];
}
