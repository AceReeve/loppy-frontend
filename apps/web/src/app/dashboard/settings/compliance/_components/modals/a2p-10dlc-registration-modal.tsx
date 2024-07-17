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
import CampaignUseCase from "./a2p-10dlc-steps/1-campaign-use-case";
import SampleMessages from "./a2p-10dlc-steps/2-sample-messages";
import OptInMethod from "./a2p-10dlc-steps/3-opt-in-method";
import OptInImage from "./a2p-10dlc-steps/4-opt-in-image";
import Upgrade from "./a2p-10dlc-steps/5-upgrade";

export default function A2p10dlcRegistrationModal() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [saveEnabled, setSaveEnabled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-console -- will remove later
    console.log(formData);
  }, [formData]);

  const steps = [
    {
      title: "Campaign use case",
      id: "campaign-use-case",
      component: CampaignUseCase,
    },
    {
      title: "Sample messages",
      id: "sample-messages",
      component: SampleMessages,
    },
    {
      title: "Opt-in method",
      id: "opt-in-method",
      component: OptInMethod,
    },
    {
      title: "Opt-in image",
      id: "opt-in-image",
      component: OptInImage,
    },
    {
      title: "Upgrade",
      id: "upgrade",
      component: Upgrade,
    },
  ];

  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const onNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const StepComponent = steps[currentStep].component;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Register</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
        </DialogHeader>
        {/*{steps.map((step, index) => {*/}
        {/*  const StepComponent = step.component;*/}
        {/*  return (*/}
        {/*    <div*/}
        {/*      key={step.id}*/}
        {/*      style={{*/}
        {/*        display: index !== currentStep ? "none" : "block",*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <StepComponent*/}
        {/*        setFormData={setFormData}*/}
        {/*        setSaveEnabled={setSaveEnabled}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  );*/}
        {/*})}*/}

        <StepComponent
          setFormData={setFormData}
          setSaveEnabled={setSaveEnabled}
        />

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
      </DialogContent>
    </Dialog>
  );
}
