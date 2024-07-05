import { ArrowRightIcon } from "@heroicons/react/16/solid";
import type { TeamsSetupStepsProps } from "@/src/app/dashboard/_components/paywall/paywall.d.ts";

export default function TeamsSubmit(props: TeamsSetupStepsProps) {
  return (
    <button
      className="btn-solid-primary w-[122px] gap-2 self-center rounded-xl"
      onClick={() => {
        props.handleFinalSubmit();
      }}
      type="button"
    >
      Finish
      <ArrowRightIcon className="size-4" />
    </button>
  );
}
