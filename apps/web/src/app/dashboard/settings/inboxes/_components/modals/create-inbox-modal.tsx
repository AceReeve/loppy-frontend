import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  toast,
} from "@repo/ui/components/ui";
import type { z } from "zod";
import { useCreateInboxMutation } from "@repo/redux-utils/src/endpoints/inboxes.ts";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useBuyNumberMutation } from "@repo/redux-utils/src/endpoints/numbers.ts";
import { LoadingOverlay } from "@repo/ui/loading-overlay.tsx";
import { type StepItem } from "@/src/types/settings";
import CreateNewInbox from "@/src/app/dashboard/settings/inboxes/_components/modals/create-inbox-steps/1-create-new-inbox.tsx";
import { type createInboxSchema } from "@/src/app/dashboard/settings/inboxes/_components/schemas/create-inbox-schemas.ts";
import AssignNumber from "@/src/app/dashboard/settings/inboxes/_components/modals/create-inbox-steps/2-assign-a-number.tsx";
import { type chooseNumberSchema } from "@/src/app/dashboard/settings/numbers/_components/schemas/buy-number-schemas.ts";

function CreateInboxModal() {
  const [currentStep, setCurrentStep] = useState(0);
  const [createInboxFormData, setCreateInboxFormData] =
    useState<z.infer<typeof createInboxSchema>>();
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [createInbox, { isLoading: isCreateInboxLoading }] =
    useCreateInboxMutation();
  const [buyNumber, { isLoading: isBuyNumberLoading }] = useBuyNumberMutation();

  const isLoading = isCreateInboxLoading || isBuyNumberLoading;

  const steps: StepItem[] = [
    {
      title: "Create New Inbox",
      id: "create-new-inbox",
      component: CreateNewInbox,
      onSubmit: onCreateInboxSubmit as (data: unknown) => void,
    },
    {
      title: "Assign a Number",
      id: "assign-a-number",
      component: AssignNumber,
      footerNote:
        "* Due to A2P 10DLC regulations, registration is required and additional fees will apply.",
      onSubmit: onSetNumberSubmit as (data: unknown) => void,
    },
  ];

  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  function onCreateInboxSubmit(data: z.infer<typeof createInboxSchema>) {
    setCreateInboxFormData(data);
    onNextStep();
  }

  function onSetNumberSubmit(data: z.infer<typeof chooseNumberSchema>) {
    if (!createInboxFormData) return;

    buyNumber({
      phoneNumber:
        process.env.NEXT_PUBLIC_TEST_TWILIO_BUY_NUMBER ?? data.selectedNumber,
    })
      .unwrap()
      .then(() => {
        createInbox({
          inbox_name: createInboxFormData.inbox_name,
          description: createInboxFormData.inbox_name,
          purchased_number: data.selectedNumber,
        })
          .unwrap()
          .then(() => {
            setIsOpen(false);
          })
          .catch((error: unknown) => {
            toast({
              title: "Create Inbox Error",
              description: getErrorMessage(error),
              variant: "destructive",
            });
          });
      })
      .catch((error: unknown) => {
        toast({
          title: "Buy Number Error",
          description: getErrorMessage(error),
          variant: "destructive",
        });
      });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create New Inbox</Button>
      </DialogTrigger>
      <DialogContent>
        {isLoading ? <LoadingOverlay /> : null}

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
                setSaveEnabled={setSaveEnabled}
                id={step.id}
                onSubmit={step.onSubmit}
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
            disabled={!saveEnabled}
            form={steps[currentStep].id}
          >
            {currentStep < steps.length - 1 ? "Next" : "Create Inbox"}
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

export default CreateInboxModal;
