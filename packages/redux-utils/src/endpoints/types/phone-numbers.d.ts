export interface PhoneNumbersResponse {
  data: {
    number: string;
    location: string;
    inbox_name: string;
    status: string;
    type: string;
  };
}

interface NumberCapabilities {
  voice: boolean;
  SMS: boolean;
  MMS: boolean;
}

export interface GetAvailableLocalNumbersResponse {
  friendlyName: string;
  phoneNumber: string;
  lata: string;
  locality: string;
  rateCenter: string;
  latitude: string;
  longitude: string;
  region: string;
  postalCode: string;
  isoCountry: string;
  addressRequirements: string;
  beta: boolean;
  capabilities: NumberCapabilities;
}

export interface GetAvailableLocalNumbersPayload {
  countryCode: string;
  type: string;
  limit: string;
  areaCode?: string;
  [key: string]: string;
}

export interface BuyNumberResponse {
  organization_id: string;
  purchased_number: string;
  status: string;
  _id: string;
  created_at: string;
  updated_at: string;
}

export interface BuyNumberPayload {
  phoneNumber: string;
  organization_id: string;
  [key: string]: string;
}

export interface GetPurchasedNumbersPayload {
  organization_id: string;
}

export interface GetPurchasedNumbersResponse {
  _id: string;
  organization_id: string;
  purchased_number: string;
  status: string;
  created_at: string;
  updated_at: string;
}
