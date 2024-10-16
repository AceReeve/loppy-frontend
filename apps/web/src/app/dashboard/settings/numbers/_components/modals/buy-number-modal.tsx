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
import { useBuyNumberMutation } from "@repo/redux-utils/src/endpoints/numbers.ts";
import { LoadingOverlay } from "@repo/ui/loading-overlay.tsx";
import { useCreateInboxMutation } from "@repo/redux-utils/src/endpoints/inboxes.ts";
import { InboxAssignmentType } from "@repo/redux-utils/src/endpoints/enums/inbox.enums.ts";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import {
  type assignInboxSchema,
  type chooseNumberSchema,
} from "@/src/app/dashboard/settings/numbers/_components/schemas/buy-number-schemas.ts";
import AssignInbox from "@/src/app/dashboard/settings/numbers/_components/modals/buy-number-steps/2-assign-inbox.tsx";
import { type StepItem } from "@/src/types/settings";
import ChooseNumber from "./buy-number-steps/1-choose-number.tsx";

function BuyNumberModal() {
  const [currentStep, setCurrentStep] = useState(0);
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [buyNumberFormData, setBuyNumberFormData] =
    useState<z.infer<typeof chooseNumberSchema>>();
  const [buyNumber, { isLoading: isBuyNumberLoading }] = useBuyNumberMutation();
  const [createInbox, { isLoading: isCreateInboxLoading }] =
    useCreateInboxMutation();

  const isLoading = isCreateInboxLoading || isBuyNumberLoading;

  const steps: StepItem[] = [
    {
      title: "Choose Number",
      id: "choose-number",
      component: ChooseNumber,
      footerNote:
        "* Due to A2P 10DLC regulations, registration is required and additional fees will apply.",
      onSubmit: onSetNumberSubmit as (data: unknown) => void,
    },
    {
      title: "Assign Inbox",
      id: "assign-inbox",
      component: AssignInbox,
      footerNote:
        "* Due to A2P 10DLC regulations, registration is required and additional fees will apply.",
      onSubmit: onAssignInboxSubmit as (data: unknown) => void,
    },
  ];

  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onNextStep = () => {
    setCurrentStep(currentStep + 1);
    setSaveEnabled(false);
  };

  function onSetNumberSubmit(data: z.infer<typeof chooseNumberSchema>) {
    setBuyNumberFormData(data);
    onNextStep();
  }

  function onAssignInboxSubmit(data: z.infer<typeof assignInboxSchema>) {
    if (!buyNumberFormData) return;

    const type = data.inbox_assignment_type as InboxAssignmentType;

    buyNumber({
      phoneNumber:
        process.env.NEXT_PUBLIC_TEST_TWILIO_BUY_NUMBER ??
        buyNumberFormData.selectedNumber,
    })
      .unwrap()
      .then(() => {
        if (type === InboxAssignmentType.NEW) {
          createInbox({
            inbox_name: data.inbox_name ?? "",
            description: data.inbox_name ?? "",
            purchased_number: buyNumberFormData.selectedNumber,
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
        } else {
          setIsOpen(false);
        }
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
        <Button>Add Numbers</Button>
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
