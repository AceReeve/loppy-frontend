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
import CreateNewInbox from "@/src/app/dashboard/settings/inboxes/_components/modals/buy-number-steps/1-create-new-inbox.tsx";

function BuyNumberModal() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [saveEnabled, setSaveEnabled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-console -- will remove later
    console.log(formData);
  }, [formData]);

  const steps: StepItem[] = [
    {
      title: "Create New Inbox",
      id: "create-new-inbox",
      component: CreateNewInbox,
      footerNote:
        "* Due to A2P 10DLC regulations, registration is required and additional fees will apply.",
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
        <Button>Create New Inbox</Button>
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
            {currentStep < steps.length - 1 ? "Next" : "Purchase Number"}
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

export default BuyNumberModal;
