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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type StepItem } from "@/src/types/settings";
import CreateNewInbox from "@/src/app/dashboard/settings/inboxes/_components/modals/create-inbox-steps/1-create-new-inbox.tsx";
import AssignNumber from "@/src/app/dashboard/settings/inboxes/_components/modals/create-inbox-steps/2-assign-a-number.tsx";
import { StepsEnum } from "@/src/app/dashboard/settings/inboxes/_components/enums/settings-inbox.enums.ts";
import StepForm from "@/src/app/dashboard/settings/_components/step-form.tsx";
import { createInboxSchema } from "@/src/app/dashboard/settings/inboxes/_components/schemas/create-inbox-schemas.ts";
import { chooseNumberSchema } from "@/src/app/dashboard/settings/numbers/_components/schemas/buy-number-schemas.ts";

type NamedStepItem = Record<StepsEnum, StepItem>;

function CreateInboxModal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [createInboxFormData, setCreateInboxFormData] =
    useState<z.infer<typeof createInboxSchema>>();
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [createInbox, { isLoading: isCreateInboxLoading }] =
    useCreateInboxMutation();
  const [buyNumber, { isLoading: isBuyNumberLoading }] = useBuyNumberMutation();

  const isLoading = isCreateInboxLoading || isBuyNumberLoading;

  const steps: NamedStepItem = {
    [StepsEnum.CreateInbox]: {
      title: "Create New Inbox",
      id: "create-new-inbox",
      component: CreateNewInbox,
      onSubmit: onCreateInboxSubmit as (data: unknown) => void,
      form: useForm({
        resolver: zodResolver(createInboxSchema),
        defaultValues: {
          inbox_name: "",
        },
      }),
    },
    [StepsEnum.AssignNumber]: {
      title: "Assign a Number",
      id: "assign-a-number",
      component: AssignNumber,
      footerNote:
        "* Due to A2P 10DLC regulations, registration is required and additional fees will apply.",
      onSubmit: onSetNumberSubmit as (data: unknown) => void,
      form: useForm({
        resolver: zodResolver(chooseNumberSchema),
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
          purchased_number:
            process.env.NEXT_PUBLIC_TEST_TWILIO_BUY_NUMBER ??
            data.selectedNumber,
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
          {currentIndex !== 0 ? (
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
            {currentIndex < steps.length - 1 ? "Next" : "Create Inbox"}
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

export default CreateInboxModal;
