import { baseApi } from "../api";
import type {
  AddPhoneNumberToMessagingServicePayload,
  CreateAddressPayload,
  CreateAddressResponse,
  CreateBrandRegistrationsOtpPayload,
  CreateBrandRegistrationsPayload,
  CreateBrandRegistrationsResponse,
  CreateCustomerProfileEntityPayload,
  CreateCustomerProfilePayload,
  CreateCustomerProfileResponse,
  CreateEndUserLowAndStandardTrustHubPayload,
  CreateEndUserLowStandardProfilePayload,
  CreateEndUserLowStandardProfileResponse,
  CreateEndUserLowStandardRepresentativePayload,
  CreateEndUserSoleProprietorPayload,
  CreateEndUserSoleProprietorTrustHubPayload,
  CreateMessagingServicePayload,
  CreateMessagingServiceResponse,
  CreateMockBrandRegistrationsPayload,
  CreateProductEvaluationPayload,
  CreateSupportingDocumentPayload,
  CreateSupportingDocumentResponse,
  CreateTrustProductEntityAssignmentPayload,
  CreateTrustProductPayload,
  CreateTrustProductResponse,
  CreateUsAppToPersonPayload,
  FetchMessagingServiceUseCasePayload,
  FetchUsAppToPersonPayload,
  UpdateCustomerProfilePayload,
  UpdateTrustProductPayload,
} from "./types/compliance";
import type {
  CustomerProfileEvaluationPayload,
  CustomerProfileEvaluationResponse,
  TrustProductEvaluationResponse,
} from "./types/compliance-evaluation";

const api = baseApi
  .enhanceEndpoints({
    addTagTypes: ["compliance"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createCustomerProfile: builder.mutation<
        CreateCustomerProfileResponse,
        CreateCustomerProfilePayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-customer-profile`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createEndUserSoleProprietor: builder.mutation<
        undefined,
        CreateEndUserSoleProprietorPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-end-user-sole-proprietor`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createEndUserLowAndStandardBusinessProfile: builder.mutation<
        CreateEndUserLowStandardProfileResponse,
        CreateEndUserLowStandardProfilePayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-end-user-low-and-standard-business-profile`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createEndUserLowAndStandardRepresentative: builder.mutation<
        CreateEndUserLowStandardProfileResponse,
        CreateEndUserLowStandardRepresentativePayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-end-user-low-and-standard-representative`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createAddress: builder.mutation<
        CreateAddressResponse,
        CreateAddressPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-address`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createSupportingDocument: builder.mutation<
        CreateSupportingDocumentResponse,
        CreateSupportingDocumentPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-supporting-document`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createCustomerProfileEntityAssignment: builder.mutation<
        undefined,
        CreateCustomerProfileEntityPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-customer-profile-entity-assignment`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      customerProfileEvaluation: builder.mutation<
        CustomerProfileEvaluationResponse,
        CustomerProfileEvaluationPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/customer-profile-evaluation`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      updateCustomerProfile: builder.mutation<
        undefined,
        UpdateCustomerProfilePayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/update-customer-profile`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createTrustProduct: builder.mutation<
        CreateTrustProductResponse,
        CreateTrustProductPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-trust-product`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createEndUserSoleProprietorTrustHub: builder.mutation<
        undefined,
        CreateEndUserSoleProprietorTrustHubPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-end-user-sole-proprietor-trust-hub`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createEndUserLowAndStandardTrustHub: builder.mutation<
        CreateEndUserLowStandardProfileResponse,
        CreateEndUserLowAndStandardTrustHubPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-end-user-low-and-standard-trust-hub`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createTrustProductEntityAssignment: builder.mutation<
        undefined,
        CreateTrustProductEntityAssignmentPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-trust-product-entity-assignment`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createProductEvaluation: builder.mutation<
        TrustProductEvaluationResponse,
        CreateProductEvaluationPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-product-evaluation`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      updateTrustProduct: builder.mutation<
        undefined,
        UpdateTrustProductPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/update-trust-product`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createBrandRegistrations: builder.mutation<
        CreateBrandRegistrationsResponse,
        CreateBrandRegistrationsPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-brand-registrations`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createBrandRegistrationsOtp: builder.mutation<
        undefined,
        CreateBrandRegistrationsOtpPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-brand-registrations-otp`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createMockBrandRegistrations: builder.mutation<
        undefined,
        CreateMockBrandRegistrationsPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-mock-brand-registrations`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createMessagingService: builder.mutation<
        CreateMessagingServiceResponse,
        CreateMessagingServicePayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-messaging-service`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      fetchMessagingServiceUseCase: builder.mutation<
        undefined,
        FetchMessagingServiceUseCasePayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/fetch-messaging-service-usecase`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      createUsAppToPerson: builder.mutation<
        undefined,
        CreateUsAppToPersonPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/create-us-app-to-person`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      fetchUsAppToPersonUseCases: builder.mutation<
        undefined,
        FetchUsAppToPersonPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/fetch-us-app-to-person`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      deleteUsAppToPerson: builder.mutation<
        undefined,
        FetchUsAppToPersonPayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/delete-us-app-to-person`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),

      addPhoneNumberToMessagingService: builder.mutation<
        undefined,
        AddPhoneNumberToMessagingServicePayload
      >({
        query: (payload) => {
          return {
            url: `/A2P/add-phone-number-to-messaging-service`,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["compliance"],
      }),
    }),
  });

export const {
  useCreateCustomerProfileMutation,
  useCreateEndUserSoleProprietorMutation,
  useCreateEndUserLowAndStandardBusinessProfileMutation,
  useCreateEndUserLowAndStandardRepresentativeMutation,
  useCreateAddressMutation,
  useCreateSupportingDocumentMutation,
  useCreateCustomerProfileEntityAssignmentMutation,
  useCustomerProfileEvaluationMutation,
  useUpdateCustomerProfileMutation,
  useCreateTrustProductMutation,
  useCreateEndUserSoleProprietorTrustHubMutation,
  useCreateEndUserLowAndStandardTrustHubMutation,
  useCreateTrustProductEntityAssignmentMutation,
  useCreateProductEvaluationMutation,
  useUpdateTrustProductMutation,
  useCreateBrandRegistrationsMutation,
  useCreateBrandRegistrationsOtpMutation,
  useCreateMockBrandRegistrationsMutation,
  useCreateMessagingServiceMutation,
  useFetchMessagingServiceUseCaseMutation,
  useCreateUsAppToPersonMutation,
  useFetchUsAppToPersonUseCasesMutation,
  useDeleteUsAppToPersonMutation,
  useAddPhoneNumberToMessagingServiceMutation,
} = api;
