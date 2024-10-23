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
import type { z } from "zod";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { useCreateUsAppToPersonMutation } from "@repo/redux-utils/src/endpoints/compliance.ts";
import { A2PSteps } from "@/src/app/dashboard/settings/compliance/_components/enums/settings-compliance.enums.ts";
import type { StepItem } from "@/src/types/settings";
import {
  campaignUseCaseSchema,
  optInMethodSchema,
  sampleMessagesSchema,
} from "@/src/app/dashboard/settings/compliance/_components/schemas/a2p-10dlc-registration-schemas.ts";
import StepForm from "@/src/app/dashboard/settings/_components/step-form.tsx";
import { handlePromiseRejection } from "@/src/utils/helpers.ts";
import CampaignUseCase from "./a2p-10dlc-steps/1-campaign-use-case";
import SampleMessages from "./a2p-10dlc-steps/2-sample-messages";
import OptInMethod from "./a2p-10dlc-steps/3-opt-in-method";

type NamedStepItem = Record<A2PSteps, Omit<StepItem, "id">>;

export default function A2p10dlcRegistrationModal() {
  const [createA2PCampaign] = useCreateUsAppToPersonMutation();

  const [loading, setLoading] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(2);

  const [saveEnabled, setSaveEnabled] = useState(false);

  const [open, setOpen] = useState(false);

  const steps: NamedStepItem = {
    [A2PSteps.CampaignUseCase]: {
      title: "Campaign use case",
      component: CampaignUseCase,
      form: useForm({
        resolver: zodResolver(campaignUseCaseSchema),
      }),
    },
    [A2PSteps.SampleMessages]: {
      title: "Sample messages",
      component: SampleMessages,
      form: useForm({
        resolver: zodResolver(sampleMessagesSchema),
      }),
    },
    [A2PSteps.OptInMethod]: {
      title: "Opt-in method",
      component: OptInMethod,
      form: useForm({
        resolver: zodResolver(optInMethodSchema),
        defaultValues: {
          method: [],
          messageFlow: [],
          imageUrl: [],
        },
      }),
      onSubmit,
    },
    // [A2PSteps.Upgrade]: {
    //   title: "Upgrade",
    //   component: Upgrade,
    //   form: useForm({
    //     resolver: zodResolver(upgradeSchema),
    //   }),
    //   onSubmit,
    // },
  };

  const onPrevStep = () => {
    setCurrentIndex(currentIndex - 1);
  };
  const onNextStep = () => {
    setCurrentIndex(currentIndex + 1);
    setSaveEnabled(false);
  };

  function onSubmit() {
    // TODO: Do not complete this step until the BrandRegistration's status is APPROVED.

    void handlePromiseRejection(async () => {
      setLoading(true);
      const { getValues: campaignUseCases } = steps[A2PSteps.CampaignUseCase]
        .form as UseFormReturn<z.infer<typeof campaignUseCaseSchema>>;
      const { getValues: sampleMessages } = steps[A2PSteps.SampleMessages]
        .form as UseFormReturn<z.infer<typeof sampleMessagesSchema>>;
      const { getValues: optInMethod } = steps[A2PSteps.OptInMethod]
        .form as UseFormReturn<z.infer<typeof optInMethodSchema>>;

      // TODO: Add messaqingServiceSID and brandRegistrationSID
      // TODO: Add optOutKeywords from form
      await createA2PCampaign({
        messagingServiceSID: "",
        brandRegistrationSID: "",
        description: campaignUseCases("description"),
        // TODO: Update message flow format
        messageFlow: optInMethod("messageFlow").join(", "),
        messageSamples: [
          sampleMessages("message1"),
          sampleMessages("message2"),
        ],
        useCase: campaignUseCases("useCase"),
        optOutKeywords: ["STOP"],
      }).unwrap();
    });
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
      {/*{evaluationResult ? (*/}
      {/*    <ComplianceResultModal results={evaluationResult.results} />*/}
      {/*) : null}*/}
    </>
  );
}
