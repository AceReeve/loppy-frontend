import { ArrowRightIcon } from "@heroicons/react/16/solid";
import type { TeamsSetupStepsProps } from "@/src/app/dashboard/_components/paywall/paywall.d.ts";
import type { InviteUserResponse } from "@/src/endpoints/types/user";
import { ComboBox } from "./_components/combo-box";

const renderEmailList = (emails?: InviteUserResponse["emails"]) => {
  if (emails && emails.length > 0) {
    emails.map((email, index) => (
      <div
        className="flex w-full items-center justify-between"
        key={email.email}
      >
        <span className="font-nunito text-sm text-card">
          {index + 1}. {email.email} ({email.status})
        </span>
        <ComboBox />
      </div>
    ));
  } else {
    return (
      <span className="font-nunito text-sm text-card">No emails invited</span>
    );
  }
};

export default function TeamsPermissionSetup(props: TeamsSetupStepsProps) {
  return (
    <>
      <div className="font-nunito text-lg font-medium leading-relaxed text-white">
        Set Permissions
      </div>
      <div className="inline-flex w-full flex-col items-start justify-center gap-4">
        <div className="flex w-full flex-col justify-center gap-2">
          {renderEmailList(props.emails)}
        </div>
        <button
          className="btn-solid-primary w-[122px] gap-2 self-end rounded-xl"
          onClick={() => {
            props.handleFinalSubmit();
          }}
        >
          Next
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </>
  );
}
