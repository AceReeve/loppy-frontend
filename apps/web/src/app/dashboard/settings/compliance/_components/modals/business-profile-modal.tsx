import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import {
  useCreateAddressMutation,
  useCreateBrandRegistrationsMutation,
  useCreateCustomerProfileEntityAssignmentMutation,
  useCreateCustomerProfileMutation,
  useCreateEndUserLowAndStandardBusinessProfileMutation,
  useCreateEndUserLowAndStandardRepresentativeMutation,
  useCreateEndUserLowAndStandardTrustHubMutation,
  useCreateMessagingServiceMutation,
  useCreateProductEvaluationMutation,
  useCreateSupportingDocumentMutation,
  useCreateTrustProductEntityAssignmentMutation,
  useCreateTrustProductMutation,
  useCustomerProfileEvaluationMutation,
  useUpdateCustomerProfileMutation,
  useUpdateTrustProductMutation,
} from "@repo/redux-utils/src/endpoints/compliance.ts";
import { type CustomerProfileEvaluationResponse } from "@repo/redux-utils/src/endpoints/types/compliance-evaluation";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { EvaluationStatus } from "@repo/redux-utils/src/endpoints/enums/compliance-evaluation.enums.ts";
import { type StepItem } from "@/src/types/settings";
import { chooseNumberSchema } from "@/src/app/dashboard/settings/numbers/_components/schemas/buy-number-schemas.ts";
import {
  businessInfoSchema,
  businessLocationSchema,
  generalInfoSchema,
  peopleToContactSchema,
  termsOfServiceSchema,
} from "@/src/app/dashboard/settings/compliance/_components/schemas/business-profile-schemas.ts";
import { BusinessProfileSteps } from "@/src/app/dashboard/settings/compliance/_components/enums/settings-compliance.enums.ts";
import StepForm from "@/src/app/dashboard/settings/_components/step-form.tsx";
import { useDashboardState } from "@/src/providers/dashboard-provider.tsx";
import { handlePromiseRejection } from "@/src/utils/helpers.ts";
import { ComplianceResultModal } from "@/src/app/dashboard/settings/compliance/_components/modals/compliance-result-modal.tsx";
import { CompanyTypes } from "@/src/app/dashboard/settings/compliance/_components/constants/settings-compliance.const.ts";
import BusinessLocation from "./business-profile-steps/2-business-location.tsx";
import GeneralInfo from "./business-profile-steps/3-general-info.tsx";
import BusinessInfo from "./business-profile-steps/4-business-info.tsx";
import PeopleToContact from "./business-profile-steps/5-people-to-contact.tsx";
import TermsOfService from "./business-profile-steps/6-terms-of-service.tsx";
import ChooseNumberBusinessProfile from "./business-profile-steps/1-choose-number.tsx";

type NamedStepItem = Record<BusinessProfileSteps, Omit<StepItem, "id">>;

function BusinessProfileModal() {
  const [createCustomerProfile] = useCreateCustomerProfileMutation();
  const [createLowStandardBusinessProfile] =
    useCreateEndUserLowAndStandardBusinessProfileMutation();
  const [createCustomerProfileEntityAssignment] =
    useCreateCustomerProfileEntityAssignmentMutation();
  const [createLowStandardRepresentative] =
    useCreateEndUserLowAndStandardRepresentativeMutation();
  const [createAddress] = useCreateAddressMutation();
  const [createSupportingDocs] = useCreateSupportingDocumentMutation();
  const [evaluateCustomerProfile] = useCustomerProfileEvaluationMutation();
  const [updateCustomerProfile] = useUpdateCustomerProfileMutation();
  const [createTrustProduct] = useCreateTrustProductMutation();
  const [createLowStandardTrustHub] =
    useCreateEndUserLowAndStandardTrustHubMutation();
  const [createTrustProductEntityAssignment] =
    useCreateTrustProductEntityAssignmentMutation();
  const [createTrustProductEvaluation] = useCreateProductEvaluationMutation();
  const [updateTrustProduct] = useUpdateTrustProductMutation();
  const [createBrandRegistration] = useCreateBrandRegistrationsMutation();
  const [createMessagingService] = useCreateMessagingServiceMutation();

  const [loading, setLoading] = useState(false);

  const { currentOrg, session } = useDashboardState();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [evaluationResult, setEvaluationResult] =
    useState<CustomerProfileEvaluationResponse>();

  const [open, setOpen] = useState(false);

  const steps: NamedStepItem = {
    [BusinessProfileSteps.ChooseNumber]: {
      title: "Choose Number",
      component: ChooseNumberBusinessProfile,
      footerNote:
        "You can always change this number later or replace with your existing number, landline, or Aircall number.",
      form: useForm({
        resolver: zodResolver(chooseNumberSchema),
      }),
    },
    [BusinessProfileSteps.BusinessLocation]: {
      title: "Business Location",
      component: BusinessLocation,
      form: useForm({
        resolver: zodResolver(businessLocationSchema),
        defaultValues: {
          business_locations: [],
        },
        mode: "onBlur",
      }),
    },
    [BusinessProfileSteps.GeneralInfo]: {
      title: "General Info",
      component: GeneralInfo,
      form: useForm({
        resolver: zodResolver(generalInfoSchema),
        mode: "onBlur",
      }),
    },
    [BusinessProfileSteps.BusinessInfo]: {
      title: "Business Info",
      component: BusinessInfo,
      form: useForm({
        resolver: zodResolver(businessInfoSchema),
        mode: "onBlur",
      }),
    },
    [BusinessProfileSteps.PeopleToContact]: {
      title: "People to Contact",
      component: PeopleToContact,
      form: useForm({
        resolver: zodResolver(peopleToContactSchema),
        mode: "onBlur",
      }),
    },
    [BusinessProfileSteps.TermsOfService]: {
      title: "Terms of Service and Privacy Policy",
      component: TermsOfService,
      form: useForm({
        resolver: zodResolver(termsOfServiceSchema),
        mode: "onBlur",
      }),
      onSubmit,
    },
  };

  const onPrevStep = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const onNextStep = () => {
    setCurrentIndex(currentIndex + 1);
    setSaveEnabled(false);
  };

  function onSubmit(data: z.infer<typeof termsOfServiceSchema>) {
    if (!currentOrg) return;
    if (data.agreedToTOS && session) {
      setLoading(true);
      void handlePromiseRejection(
        async () => {
          // Get form values
          const { getValues: generalInfo } = steps[
            BusinessProfileSteps.GeneralInfo
          ].form as UseFormReturn<z.infer<typeof generalInfoSchema>>;
          const { getValues: businessInfo } = steps[
            BusinessProfileSteps.BusinessInfo
          ].form as UseFormReturn<z.infer<typeof businessInfoSchema>>;
          const { getValues: peopleToContact } = steps[
            BusinessProfileSteps.PeopleToContact
          ].form as UseFormReturn<z.infer<typeof peopleToContactSchema>>;

          // Creating customer profile

          const customerProfileResponse = await createCustomerProfile({
            email: process.env.NEXT_PUBLIC_OWNER_EMAIL ?? "",
            friendlyName: `${currentOrg.organization_name} - Secondary Customer Profile`,
            isSoleProprietor: false,
          }).unwrap();

          // Creating Business Profile

          const businessProfileResponse =
            await createLowStandardBusinessProfile({
              businessName: generalInfo("businessName"),
              businessRegionsOfOperation: businessInfo(
                "businessRegionsOfOperations",
              ),
              businessType: businessInfo("businessType"),
              businessRegistrationIdentifier: "EIN",
              businessIdentity: "direct_customer",
              businessIndustry: businessInfo("businessIndustry"),
              businessRegistrationNumber: generalInfo("ein"),
              socialMediaProfileURLs: businessInfo("socialMediaProfile"),
              websiteURL: businessInfo("websiteUrl"),
              friendlyName: `${currentOrg.organization_name} - Business Information EndUser resource`,
            }).unwrap();

          //  Attaching Business Profile to the Customer Profile

          await createCustomerProfileEntityAssignment({
            customerProfileSID: customerProfileResponse.sid,
            objectSID: businessProfileResponse.sid,
          }).unwrap();

          //   Creating Authorized Representative

          const authorizedRepresentativeResponse =
            await createLowStandardRepresentative({
              jobPosition: peopleToContact("jobPosition"),
              lastName: peopleToContact("lastName"),
              phoneNumber: peopleToContact("mobilePhoneNumber"),
              firstName: peopleToContact("firstName"),
              email: peopleToContact("businessEmail"),
              businessTitle: peopleToContact("businessTitle"),
              friendlyName: `${currentOrg.organization_name} - Authorized Rep 1`,
            }).unwrap();

          //  Attaching Authorized Representative to the Customer Profile

          await createCustomerProfileEntityAssignment({
            customerProfileSID: customerProfileResponse.sid,
            objectSID: authorizedRepresentativeResponse.sid,
          }).unwrap();

          //   Creating an Address Resource
          const addressResourceResponse = await createAddress({
            city: generalInfo("city"),
            customerName: currentOrg.organization_name,
            isoCountry: generalInfo("country"), // ISO Code
            postalCode: generalInfo("zipCode"),
            region: generalInfo("state"), // 2 letter
            street: generalInfo("streetAddress1"),
            streetSecondary: generalInfo("streetAddress2"),
          }).unwrap();

          //  Creating Supporting Document Resource using the Address Resource
          const supportingDocsResponse = await createSupportingDocs({
            addressSIDs: addressResourceResponse.sid,
            friendlyName: `${currentOrg.organization_name} - Address Supporting Document`,
          }).unwrap();

          //  Attaching Supporting Document to the Customer Profile
          await createCustomerProfileEntityAssignment({
            customerProfileSID: customerProfileResponse.sid,
            objectSID: supportingDocsResponse.sid,
          }).unwrap();

          // 1.9. Evaluate the Secondary Customer Profile

          const evaluationResultResponse = await evaluateCustomerProfile({
            customerProfileSID: customerProfileResponse.sid,
            isSoleProprietor: false,
          }).unwrap();

          // 1.10. Submit the Secondary Customer Profile for review ONLY IF COMPLIANT

          if (evaluationResultResponse.status === EvaluationStatus.COMPLIANT) {
            await updateCustomerProfile({
              customerProfileSID: customerProfileResponse.sid,
            }).unwrap();

            //  Create and submit a TrustProduct
            const trustProductResponse = await createTrustProduct({
              email: process.env.NEXT_PUBLIC_OWNER_EMAIL ?? "",
              friendlyName: `${currentOrg.organization_name} - Trust Product`,
              isSoleProprietor: false,
            }).unwrap();

            // Create an EndUser resource of type us_a2p_messaging_profile_information

            const messagingProfileResponse = await createLowStandardTrustHub({
              companyType: CompanyTypes.PUBLIC,
              friendlyName: `${currentOrg.organization_name} - Messaging Profile End User`,
            }).unwrap();

            // Attach the EndUser to the TrustProduct

            await createTrustProductEntityAssignment({
              customerProfileSID: trustProductResponse.sid,
              endUserSIDP: messagingProfileResponse.sid,
            }).unwrap();

            // Attach the Secondary Customer Profile to the TrustProduct

            await createTrustProductEntityAssignment({
              customerProfileSID: trustProductResponse.sid,
              endUserSIDP: customerProfileResponse.sid,
            }).unwrap();

            //   Evaluate the TrustProduct

            const trustProductEvaluationResponse =
              await createTrustProductEvaluation({
                trustProductSID: trustProductResponse.sid,
                isSoleProprietor: false,
              }).unwrap();

            //   Submit the TrustProduct for review ONLY IF COMPLIANT

            if (
              trustProductEvaluationResponse.status ===
              EvaluationStatus.COMPLIANT
            ) {
              await updateTrustProduct({
                trustProductSID: trustProductResponse.sid,
              }).unwrap();

              //   Create a brand registration
              await createBrandRegistration({
                a2PProfileBundleSid: trustProductResponse.sid,
                customerProfileBundleSid: customerProfileResponse.sid,
              }).unwrap();

              //   Create a messaging service
              await createMessagingService({
                fallbackURL: "",
                inboundRequestURL: "",
                friendlyName: `${currentOrg.organization_name} - Messaging Service`,
              }).unwrap();
            }
          }

          setEvaluationResult(evaluationResultResponse);
          setOpen(false);
        },
        {},
        () => {
          setLoading(false);
        },
      );
    }
  }

  const stepsEntries = Object.entries(steps);
  const stepsMap = stepsEntries.reduce<StepItem[]>((acc, [, step], index) => {
    acc.push({
      id: index.toString(),
      ...step,
    });
    return acc;
  }, []);
  const currentStep = stepsMap[currentIndex];

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm">Register</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentStep.title}</DialogTitle>
          </DialogHeader>

          {stepsMap.map((step, index) => {
            const StepComponent = step.component;
            const props = {
              setSaveEnabled,
              id: step.id,
              onSubmit: step.onSubmit,
              isActive: index === currentIndex,
              form: step.form as never,
              onNextStep,
            };
            return props.isActive ? (
              <StepForm {...props} key={step.id}>
                <StepComponent {...props} />
              </StepForm>
            ) : null;
          })}
          <DialogFooter className="mt-4">
            {currentIndex !== 0 ? (
              <Button className="w-full" onClick={onPrevStep} variant="outline">
                Back
              </Button>
            ) : null}

            <Button
              className="w-full"
              type="submit"
              disabled={!saveEnabled || loading}
              form={currentStep.id}
            >
              {loading ? <LoadingSpinner /> : null}
              {currentIndex < stepsMap.length - 1
                ? "Next"
                : "Submit for review"}
            </Button>
          </DialogFooter>
          {currentStep.footerNote ? (
            <p className="text-center text-xs text-gray-500">
              {currentStep.footerNote}
            </p>
          ) : null}
        </DialogContent>
      </Dialog>
      {evaluationResult ? (
        <ComplianceResultModal results={evaluationResult.results} />
      ) : null}
    </>
  );
}

export default BusinessProfileModal;
