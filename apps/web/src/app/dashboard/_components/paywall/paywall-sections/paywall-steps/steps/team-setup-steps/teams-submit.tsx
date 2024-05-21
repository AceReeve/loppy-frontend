import { ArrowRightIcon } from "@heroicons/react/16/solid";
import type { TeamsSetupStepsProps } from "@/src/app/dashboard/_components/paywall/paywall.d.ts";

export default function TeamsSubmit(props: TeamsSetupStepsProps) {
  return (
    <>
      <div className="font-nunito text-lg font-medium leading-relaxed text-white">
        Finalize
      </div>
      <button
        className="btn-solid-primary w-[122px] gap-2 self-end rounded-xl"
        onClick={() => {
          props.handleSubmitPermissions();
        }}
      >
        Finish
        <ArrowRightIcon className="size-4" />
      </button>
    </>
  );
}
