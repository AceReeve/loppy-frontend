"use client";

import React, { Fragment, useState } from "react";
import { Alert, AlertDescription, Button, toast } from "@repo/ui/components/ui";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useValidateInviteUserMutation } from "@repo/redux-utils/src/endpoints/user.ts";
import { LoadingOverlay } from "@repo/ui/loading-overlay.tsx";
import { Check } from "lucide-react";
import { type z } from "zod";
import { useCreateOrganizationMutation } from "@repo/redux-utils/src/endpoints/organization.ts";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import {
  type OrganizationSchema,
  type SendInviteUsersSchema,
} from "@/src/schemas";
import { revalidateOrganization } from "@/src/actions/paywall-actions.ts";
import TeamsOrganization from "./team-setup-steps/teams-organization.tsx";
import TeamsAddTeam from "./team-setup-steps/teams-add-team.tsx";
import TeamsSubmit from "./team-setup-steps/teams-submit.tsx";

export default function PaywallTeamSetup() {
  const [stepIndex, setStepIndex] = useState(0);

  const [organization, setOrganization] =
    useState<z.infer<typeof OrganizationSchema>>();

  const [invitedUsers, setInvitedUsers] =
    useState<z.infer<typeof SendInviteUsersSchema>>();

  const [createOrganization, { isLoading: isCreateOrganizationLoading }] =
    useCreateOrganizationMutation();

  const [validateInviteUser, { isLoading: isValidateInviteUserLoading }] =
    useValidateInviteUserMutation();

  const isLoading = isValidateInviteUserLoading;

  const handleSubmitInvitedList = (
    data: z.infer<typeof SendInviteUsersSchema>,
  ) => {
    validateInviteUser(data)
      .unwrap()
      .then(() => {
        setInvitedUsers(data);
        setStepIndex(stepIndex + 1);
      })
      .catch((e: unknown) => {
        toast({
          title: "Send Invite Error",
          description: getErrorMessage(e),
          variant: "destructive",
        });
      });
    // setStepIndex(stepIndex + 1);
  };

  const handleSubmitOrganization = (
    data: z.infer<typeof OrganizationSchema>,
  ) => {
    setOrganization(data);
    setStepIndex(stepIndex + 1);
  };

  const handleSubmitPermissions = () => {
    setStepIndex(stepIndex + 1);
  };

  const handleFinalSubmit = () => {
    if (!organization) return;

    createOrganization({
      ...organization,
      ...invitedUsers,
    })
      .unwrap()
      .then(async () => {
        await revalidateOrganization();
      })
      .catch((err: unknown) => {
        toast({
          title: "Create Organization Error",
          description: getErrorMessage(err),
          variant: "destructive",
        });
      });
  };

  const onPrevClicked = () => {
    setStepIndex(stepIndex - 1);
  };
  const onNextClicked = () => {
    setStepIndex(stepIndex + 1);
  };

  const steps = [
    {
      label: "Organization",
      id: "organization",
      component: TeamsOrganization,
    },
    {
      label: "Members",
      id: "add-team",
      component: TeamsAddTeam,
    },
    {
      label: "Submit",
      id: "submit",
      component: TeamsSubmit,
    },
  ];

  return (
    <div className="m-auto w-full p-10">
      {isLoading ? <LoadingOverlay /> : null}
      {isCreateOrganizationLoading ? (
        <div className="absolute left-0 top-0 z-10 flex size-full items-center justify-center">
          <Alert className="max-w-72">
            <LoadingSpinner />
            <AlertDescription>Creating your organization...</AlertDescription>
          </Alert>
        </div>
      ) : null}
      <div className="m-auto flex w-full max-w-[668px] flex-col items-center gap-7">
        {stepIndex < steps.length - 1 ? (
          <div className="flex flex-col gap-3">
            <div className="text-center font-nunito text-3xl font-bold">
              Thanks for signing up to Service Hero!
            </div>
            <div className="text-center text-xl">
              Now, let’s setup your team!
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center font-nunito text-[35px] font-bold">
              Thanks for Signing up To Service Hero!
            </div>
            <div className="text-md mt-4 text-center">
              Manage your clients and streamline your workflow all in one place.
              <br />
              We&apos;re excited to help you enhance your productivity and
              elevate your service!
            </div>
          </div>
        )}

        <div className="relative flex w-full justify-between">
          <div className="absolute top-[50%] -mt-[3px] h-1.5 w-full bg-gray-300" />
          <div
            className="absolute top-[50%] -mt-[3px] h-1.5 bg-primary"
            style={{
              width: `${((stepIndex / (steps.length - 1)) * 100).toString()}%`,
            }}
          />
          {Array.from({ length: steps.length }, (_, i) => i + 1).map(
            (item, index) => (
              <div
                className={`relative size-[70px] rounded-full p-3 ${index <= stepIndex ? "bg-primary text-red-500" : "bg-gray-300 text-black"}`}
                key={item}
              >
                <div className="flex size-full items-center justify-center rounded-full bg-white text-xl font-bold">
                  {index + 1}
                </div>
              </div>
            ),
          )}
        </div>
        <div className="flex h-12 w-full items-center overflow-hidden rounded-xl border border-gray-300">
          {steps.map((item, index) => (
            <Fragment key={item.id}>
              <Button
                className={`h-full flex-1 gap-1.5 rounded-none text-sm ${index === stepIndex ? "text-black shadow-sm" : "bg-gray-200 font-normal text-gray-800"}
                ${index < stepIndex ? "hover:bg-gray-100" : "pointer-events-none"}
                `}
                onClick={() => {
                  index >= stepIndex ? null : setStepIndex(index);
                }}
                variant="ghost"
                type="button"
              >
                {index < stepIndex ? (
                  <Check className="size-4 text-[#03AEB9]" />
                ) : null}

                {item.label}
              </Button>
              {index < steps.length - 1 && (
                <div className="h-full border-r border-gray-300" />
              )}
            </Fragment>
          ))}
        </div>
        {/* Step Content */}
        <div className="w-full">
          {steps.map((step, index) => {
            if (index <= stepIndex) {
              const StepComponent = step.component;
              return (
                <div key={step.id} hidden={index !== stepIndex}>
                  <StepComponent
                    handleFinalSubmit={handleFinalSubmit}
                    handleSubmitInvitedList={handleSubmitInvitedList}
                    handleSubmitPermissions={handleSubmitPermissions}
                    handleSubmitOrganization={handleSubmitOrganization}
                    setStepIndex={setStepIndex}
                    onPrevClicked={onPrevClicked}
                    onNextClicked={onNextClicked}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
