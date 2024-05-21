import { ArrowRightIcon } from "@heroicons/react/16/solid";
import type { TeamsSetupStepsProps } from "@/src/app/dashboard/_components/paywall/paywall.d.ts";
import { ComboBox } from "./_components/combo-box";
import { InviteUserResponse } from "@/src/endpoints/types/user";

const data: InviteUserResponse["emails"] = [
  {
    email: "dave.duya+1@gmail.com",
    status: "Pending",
  },
  {
    email: "dave.duya+2@gmail.com",
    status: "Pending",
  },
];
export default function TeamsPermissionSetup(props: TeamsSetupStepsProps) {
  return (
    <>
      <div className="font-nunito text-lg font-medium leading-relaxed text-white">
        Set Permissions
      </div>
      <div className="inline-flex w-full flex-col items-start justify-center gap-4">
        <div className="flex w-full flex-col justify-center gap-2">
          {data.map((email, index) => (
            <div
              className="flex w-full items-center justify-between"
              key={email.email}
            >
              <span className="font-nunito text-sm text-card">
                {index + 1}. {email.email} ({email.status})
              </span>
              <ComboBox />
            </div>
          ))}
        </div>
        <button
          className="btn-solid-primary w-[122px] gap-2 self-end rounded-xl"
          onClick={() => props.handleSubmitPermissions()}
        >
          Next
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </>
  );
}
