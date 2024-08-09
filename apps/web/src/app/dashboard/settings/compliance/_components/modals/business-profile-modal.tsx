import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui";
import { type StepItem } from "@/src/types/settings";
import BusinessLocation from "./business-profile-steps/2-business-location.tsx";
import GeneralInfo from "./business-profile-steps/3-general-info.tsx";
import BusinessInfo from "./business-profile-steps/4-business-info.tsx";
import PeopleToContact from "./business-profile-steps/5-people-to-contact.tsx";
import TermsOfService from "./business-profile-steps/6-terms-of-service.tsx";
import ChooseNumberBusinessProfile from "./business-profile-steps/1-choose-number.tsx";

function BusinessProfileModal() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [saveEnabled, setSaveEnabled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-console -- will remove later
    console.log(formData);
  }, [formData]);

  const steps: StepItem[] = [
    {
      title: "Choose Number",
      id: "choose-number",
      component: ChooseNumberBusinessProfile,
      footerNote:
        "You can always change this number later or replace with your existing number, landline, or Aircall number.",
    },
    {
      title: "Business Location",
      id: "business-location",
      component: BusinessLocation,
    },
    {
      title: "General Info",
      id: "general-info",
      component: GeneralInfo,
    },
    {
      title: "Business Info",
      id: "business-info",
      component: BusinessInfo,
    },
    {
      title: "People to Contact",
      id: "people-to-contact",
      component: PeopleToContact,
    },
    {
      title: "Terms of Service and Privacy Policy",
      id: "terms-of-service",
      component: TermsOfService,
    },
  ];

  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Register</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
        </DialogHeader>

        {steps.map((step, index) => {
          const StepComponent = step.component;
          return (
            <div
              key={step.id}
              style={{
                display: index !== currentStep ? "none" : "block",
              }}
            >
              <StepComponent
                setFormData={setFormData}
                setSaveEnabled={setSaveEnabled}
              />
            </div>
          );
        })}

        <DialogFooter className="mt-4">
          {currentStep !== 0 ? (
            <Button className="w-full" onClick={onPrevStep} variant="outline">
              Back
            </Button>
          ) : null}

          <Button
            className="w-full"
            type="submit"
            onClick={onNextStep}
            disabled={!saveEnabled}
          >
            {currentStep < steps.length - 1 ? "Next" : "Submit for review"}
          </Button>
        </DialogFooter>
        {steps[currentStep].footerNote ? (
          <p className="text-center text-xs text-gray-500">
            {steps[currentStep].footerNote}
          </p>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export default BusinessProfileModal;
