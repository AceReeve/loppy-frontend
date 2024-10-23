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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  assignInboxSchema,
  chooseNumberSchema,
} from "@/src/app/dashboard/settings/numbers/_components/schemas/buy-number-schemas.ts";
import AssignInbox from "@/src/app/dashboard/settings/numbers/_components/modals/buy-number-steps/2-assign-inbox.tsx";
import { type StepItem } from "@/src/types/settings";
import StepForm from "@/src/app/dashboard/settings/_components/step-form.tsx";
import { StepsEnum } from "@/src/app/dashboard/settings/numbers/_components/enums/settings-numbers.enums.ts";
import ChooseNumber from "./buy-number-steps/1-choose-number.tsx";

type NamedStepItem = Record<StepsEnum, StepItem>;

function BuyNumberModal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [buyNumberFormData, setBuyNumberFormData] =
    useState<z.infer<typeof chooseNumberSchema>>();
  const [buyNumber, { isLoading: isBuyNumberLoading }] = useBuyNumberMutation();
  const [createInbox, { isLoading: isCreateInboxLoading }] =
    useCreateInboxMutation();

  const isLoading = isCreateInboxLoading || isBuyNumberLoading;

  const steps: NamedStepItem = {
    [StepsEnum.ChooseNumber]: {
      title: "Choose Number",
      component: ChooseNumber,
      footerNote:
        "* Due to A2P 10DLC regulations, registration is required and additional fees will apply.",
      onSubmit: onSetNumberSubmit as (data: unknown) => void,
      form: useForm({
        resolver: zodResolver(chooseNumberSchema),
      }),
    },
    [StepsEnum.AssignInbox]: {
      title: "Assign Inbox",
      component: AssignInbox,
      footerNote:
        "* Due to A2P 10DLC regulations, registration is required and additional fees will apply.",
      onSubmit: onAssignInboxSubmit as (data: unknown) => void,
      form: useForm({
        resolver: zodResolver(assignInboxSchema),
        defaultValues: {
          inbox_name: "",
        },
      }),
    },
  };

  const stepsEntries = Object.entries(steps);
  const currentStep = Object.values(steps)[currentIndex];

  const onPrevStep = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const onNextStep = () => {
    setCurrentIndex(currentIndex + 1);
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
          <DialogTitle>{currentStep.title}</DialogTitle>
        </DialogHeader>

        {stepsEntries.map(([key, step], index) => {
          const StepComponent = step.component;
          const props = {
            setSaveEnabled,
            id: key,
            onSubmit: step.onSubmit,
            isActive: index === currentIndex,
            form: step.form as never,
            onNextStep,
          };
          return (
            <div
              key={step.title}
              style={{
                display: index !== currentIndex ? "none" : "block",
              }}
            >
              <StepForm {...props}>
                <StepComponent {...props} />
              </StepForm>
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
            form={stepsEntries[currentIndex][0]}
          >
            {currentStep < steps.length - 1 ? "Next" : "Purchase Number"}
          </Button>
        </DialogFooter>
        {currentStep.footerNote ? (
          <p className="text-center text-xs text-gray-500">
            {currentStep.footerNote}
          </p>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export default BuyNumberModal;
