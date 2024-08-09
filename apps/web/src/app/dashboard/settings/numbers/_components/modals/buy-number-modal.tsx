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
import AssignInbox from "@/src/app/dashboard/settings/numbers/_components/modals/buy-number-steps/2-assign-inbox.tsx";
import ChooseNumber from "./buy-number-steps/1-choose-number.tsx";

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
      title: "Choose Number",
      id: "choose-number",
      component: ChooseNumber,
      footerNote:
        "* Due to A2P 10DLC regulations, registration is required and additional fees will apply.",
    },
    {
      title: "Assign Inbox",
      id: "assign-inbox",
      component: AssignInbox,
      footerNote:
        "* Due to A2P 10DLC regulations, registration is required and additional fees will apply.",
    },
  ];

  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onNextStep = () => {
    setCurrentStep(currentStep + 1);
    setSaveEnabled(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Numbers</Button>
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
            onClick={currentStep < steps.length - 1 ? onNextStep : undefined}
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
