interface CustomerProfileLinks {
  customer_profiles_entity_assignments: string;
  customer_profiles_evaluations: string;
  customer_profiles_channel_endpoint_assignment: string;
}

export interface CreateCustomerProfilePayload {
  email: string;
  friendlyName: string;
  isSoleProprietor: boolean;
}

export interface CreateCustomerProfileResponse {
  sid: string;
  account_sid: string;
  policy_sid: string;
  friendly_name: string;
  status: string;
  email: string;
  status_callback: string;
  valid_until: string | null;
  date_created: string;
  date_updated: string;
  url: string;
  links: CustomerProfileLinks;
  errors: unknown;
}

interface EndUserAttributes {
  phone_number: string;
  job_position: string;
  first_name: string;
  last_name: string;
  business_title: string;
  email: string;
}

export interface CreateEndUserSoleProprietorPayload {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  friendlyName: string;
}

export interface CreateEndUserLowStandardProfilePayload {
  businessName: string;
  businessRegionsOfOperation: string;
  businessType: string;
  businessRegistrationIdentifier: string;
  businessIdentity: string;
  businessIndustry: string;
  businessRegistrationNumber: string;
  socialMediaProfileURLs?: string;
  websiteURL: string;
  friendlyName: string;
}

export interface CreateEndUserLowStandardProfileResponse {
  date_updated: string;
  sid: string;
  friendly_name: string;
  account_sid: string;
  url: string;
  date_created: string;
  attributes: EndUserAttributes;
  type: string;
}

export interface CreateEndUserLowStandardRepresentativePayload {
  jobPosition: string;
  lastName: string;
  phoneNumber: string;
  firstName: string;
  email: string;
  businessTitle: string;
  friendlyName: string;
}

export interface CreateAddressPayload {
  city: string;
  customerName: string;
  isoCountry: string;
  postalCode: string;
  region: string;
  street: string;
  streetSecondary?: string;
}

export interface CreateAddressResponse {
  account_sid: string;
  city: string;
  customer_name: string;
  date_created: string;
  date_updated: string;
  emergency_enabled: boolean;
  friendly_name: string | null;
  iso_country: string;
  postal_code: string;
  region: string;
  sid: string;
  street: string;
  street_secondary: string | null;
  validated: boolean;
  verified: boolean;
  uri: string;
}

interface SupportingDocumentAttributes {
  address_sids: string;
}

export interface CreateSupportingDocumentPayload {
  addressSIDs: string;
  friendlyName: string;
}

export interface CreateSupportingDocumentResponse {
  status: string;
  date_updated: string;
  friendly_name: string;
  account_sid: string;
  url: string;
  date_created: string;
  sid: string;
  attributes: SupportingDocumentAttributes;
  type: string;
  mime_type: string | null;
}

export interface CreateCustomerProfileEntityPayload {
  customerProfileSID: string;
  objectSID: string;
}

export interface UpdateCustomerProfilePayload {
  customerProfileSID: string;
}

interface TrustProductLinks {
  trust_products_entity_assignments: string;
  trust_products_evaluations: string;
  trust_products_channel_endpoint_assignment: string;
}

export interface CreateTrustProductPayload {
  email: string;
  friendlyName: string;
  isSoleProprietor: boolean;
}

export interface CreateTrustProductResponse {
  sid: string;
  account_sid: string;
  policy_sid: string;
  friendly_name: string;
  status: string;
  email: string;
  status_callback: string;
  valid_until: string | null;
  date_created: string;
  date_updated: string;
  url: string;
  links: TrustProductLinks;
  errors: string | null;
}

export interface CreateEndUserSoleProprietorTrustHubPayload {
  brandName: string;
  vertical: string;
  mobilePhoneNumber: string;
  friendlyName: string;
}

export interface CreateEndUserLowAndStandardTrustHubPayload {
  companyType: string;
  friendlyName: string;
}

export interface CreateTrustProductEntityAssignmentPayload {
  customerProfileSID: string;
  endUserSIDP: string;
}
export interface CreateProductEvaluationPayload {
  trustProductSID: string;
  isSoleProprietor: boolean;
}
export interface UpdateTrustProductPayload {
  trustProductSID: string;
}
export interface CreateBrandRegistrationsPayload {
  a2PProfileBundleSid: string;
  customerProfileBundleSid: string;
}
export interface CreateBrandRegistrationsResponse {
  sid: string;
  account_sid: string;
  customer_profile_bundle_sid: string;
  a2p_profile_bundle_sid: string;
  date_created: string;
  date_updated: string;
  brand_type: string;
  status: string;
  tcr_id: string;
  failure_reason: string;
  url: string;
  brand_score: number;
  brand_feedback: string[];
  identity_status: string;
  russell_3000: boolean;
  government_entity: boolean;
  tax_exempt_status: string;
  skip_automatic_sec_vet: boolean;
  errors: unknown[];
  mock: boolean;
  links: {
    brand_vettings: string;
    brand_registration_otps: string;
  };
}
export interface CreateBrandRegistrationsOtpPayload {
  brandRegistrationSID: string;
}
export interface CreateMockBrandRegistrationsPayload {
  a2PProfileBundleSID: string;
  customerProfileBundleSID: string;
  isSoleProprietor: boolean;
  isLowVolume: boolean;
}

export interface CreateMessagingServicePayload {
  fallbackURL: string;
  friendlyName: string;
  inboundRequestURL: string;
}

export interface CreateMessagingServiceResponse {
  account_sid: string;
  sid: string;
  date_created: string;
  date_updated: string;
  friendly_name: string;
  inbound_request_url: string;
  inbound_method: string;
  fallback_url: string;
  fallback_method: string;
  status_callback: string;
  sticky_sender: boolean;
  smart_encoding: boolean;
  mms_converter: boolean;
  fallback_to_long_code: boolean;
  scan_message_content: string;
  area_code_geomatch: boolean;
  validity_period: number;
  synchronous_validation: boolean;
  usecase: string;
  us_app_to_person_registered: boolean;
  use_inbound_webhook_on_number: boolean;
  sending_windows: unknown[];
  links: {
    phone_numbers: string;
    short_codes: string;
    alpha_senders: string;
    messages: string;
    us_app_to_person: string;
    us_app_to_person_usecases: string;
    channel_senders: string;
  };
  url: string;
}

export interface FetchMessagingServiceUseCasePayload {
  messagingServiceSID: string;
  brandRegistrationSID: string;
}

export interface CreateUsAppToPersonPayload {
  messagingServiceSID: string;
  brandRegistrationSID: string;
  description: string;
  messageFlow: string;
  messageSamples: string[];
  useCase: string;
  optOutKeywords: string[];
}

export interface FetchUsAppToPersonPayload {
  messagingServiceSID: string;
  usAppToPersonSID: string;
}

export interface AddPhoneNumberToMessagingServicePayload {
  messagingServiceSID: string;
  phoneNumberSID: string;
}
