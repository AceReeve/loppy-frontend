import { Fragment, useState } from "react";
import { toast } from "@repo/ui/components/ui";
import LoadingOverlay from "@repo/ui/loading-overlay.tsx";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { usePaywallState } from "@/src/providers/paywall-provider";
import TeamsAddTeam from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-steps/steps/team-setup-steps/teams-add-team";
import TeamsPermissionSetup from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-steps/steps/team-setup-steps/teams-permission-setup";
import TeamsSubmit from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-steps/steps/team-setup-steps/teams-submit";
import {
  useInviteUserMutation,
  useValidateInviteUserMutation,
} from "@/src/endpoints/user.ts";
import { PaymentPlan } from "@/src/app/dashboard/_components/paywall/paywall.enums.ts";
import { signOut } from "next-auth/react";

export default function PaywallTeamSetup() {
  const [stepIndex, setStepIndex] = useState(0);
  const { setStorage, paymentPlan } = usePaywallState();
  const [validateInviteUser, { data: invitedUsersData, isLoading }] =
    useValidateInviteUserMutation();

  const handleSubmitInvitedList = (invitesList: string[]) => {
    // if (paymentPlan) {
    // setStorage({
    //   plan: paymentPlan.plan,
    // });
    validateInviteUser({
      email: invitesList,
    })
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.emails && res.emails.length > 0) {
          setStepIndex(stepIndex + 1);
        } else {
          // Skip permissions setup if no emails entered
          setStepIndex(2);
        }
      })
      .catch((e: any) => {
        console.log("error", e);
        toast({
          title: "Send Invite Error",
          description: getErrorMessage(e),
          variant: "destructive",
        });
      });
    // }
  };

  const handleSubmitPermissions = () => {
    setStepIndex(stepIndex + 1);
  };

  const handleFinalSubmit = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setStorage({
        plan: PaymentPlan.CORPORATE,
      });
    }
  };

  const steps = [
    {
      label: "Add Team",
      id: "add-team",
      component: TeamsAddTeam,
    },
    {
      label: "Permissions",
      id: "permissions",
      component: TeamsPermissionSetup,
    },
    {
      label: "Submit",
      id: "submit",
      component: TeamsSubmit,
    },
  ];

  const StepComponent = steps[stepIndex].component;

  return (
    <div className="m-auto p-5">
      {isLoading ? <LoadingOverlay /> : null}
      <div className="flex max-w-[668px] flex-col items-center gap-7 text-center">
        {stepIndex < steps.length - 1 ? (
          <div className="text-center font-nunito text-[35px] font-bold text-card">
            Thanks for Signing up To Service Hero! <br />
            Now, Let’s Setup Your Team!
          </div>
        ) : (
          <div>
            <div className="text-center font-nunito text-[35px] font-bold text-card">
              Thanks for Signing up To Service Hero!
            </div>
            <div className="text-center text-md text-card mt-4">
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
              width: `${(stepIndex / (steps.length - 1)) * 100}%`,
            }}
          />
          {Array.from({ length: 3 }).map((_item, index) => (
            <div
              className={`relative size-[70px] rounded-full p-3 ${index <= stepIndex ? "bg-primary text-red-500" : "bg-gray-300 text-black"}`}
              key={index}
            >
              <div className="flex size-full items-center justify-center rounded-full bg-white text-xl font-bold">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
        <div className="flex h-12 w-full items-center overflow-hidden rounded-xl border border-gray-300">
          {steps.map((item, index) => (
            <Fragment key={item.id}>
              <button
                className={`h-full flex-1 rounded-none bg-white font-medium ${index === stepIndex ? "text-primary" : "text-black"}
                ${index < stepIndex ? "hover:bg-gray-200" : "pointer-events-none"}
                `}
                onClick={() => {
                  index >= stepIndex ? null : setStepIndex(index);
                }}
              >
                {item.label}
              </button>
              {index < steps.length - 1 && (
                <div className="h-full border-r border-gray-300" />
              )}
            </Fragment>
          ))}
        </div>
        <StepComponent
          emails={invitedUsersData?.emails}
          handleFinalSubmit={handleFinalSubmit}
          handleSubmitInvitedList={handleSubmitInvitedList}
          handleSubmitPermissions={handleSubmitPermissions}
          setStepIndex={setStepIndex}
        />
      </div>
    </div>
  );
}
