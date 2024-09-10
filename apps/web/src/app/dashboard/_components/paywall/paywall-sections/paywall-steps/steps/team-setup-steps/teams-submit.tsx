import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import { Button } from "@repo/ui/components/ui";
import React from "react";
import type { TeamsSetupStepsProps } from "@/src/app/dashboard/_components/paywall/paywall.d.ts";

export default function TeamsSubmit(props: TeamsSetupStepsProps) {
  return (
    <div className="mt-4 flex w-full justify-between">
      <Button
        className="min-w-48 gap-2"
        variant="outline"
        size="lg"
        onClick={() => {
          props.onPrevClicked();
        }}
      >
        <ArrowLeftIcon className="size-4" />
        Back
      </Button>
      <Button
        className="min-w-48 gap-2"
        size="lg"
        onClick={() => {
          props.handleFinalSubmit();
        }}
      >
        Finish
        <ArrowRightIcon className="size-4" />
      </Button>
    </div>
  );
}
