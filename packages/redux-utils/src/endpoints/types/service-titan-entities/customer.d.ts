interface Address {
    street: string;
    unit: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    latitude: number;
    longitude: number;
}

interface CustomField {
    typeId: number;
    name: string;
    value: string;
}

interface ExternalData {
    key: string;
    value: string;
}

type EntityType = Record<string, unknown>; // Assuming 'type' is a flexible object

export interface Customer {
    id: number;
    active: boolean;
    name: string;
    type: EntityType;
    address: Address;
    customFields: CustomField[];
    balance: number;
    tagTypeIds: number[];
    doNotMail: boolean;
    doNotService: boolean;
    createdOn: string;
    createdById: number;
    modifiedOn: string;
    mergedToId: number;
    externalData: ExternalData[];
};
