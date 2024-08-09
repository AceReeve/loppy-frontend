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
}
