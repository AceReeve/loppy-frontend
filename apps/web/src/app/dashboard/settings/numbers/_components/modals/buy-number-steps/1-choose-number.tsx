import React from "react";
import type { FormComponentProps } from "@/src/types/settings";
import ChooseNumberForm from "@/src/app/dashboard/settings/numbers/_components/forms/choose-number-form.tsx";

export default function ChooseNumber({
  setSaveEnabled,
  id,
  onSubmit,
}: FormComponentProps) {
  return (
    <ChooseNumberForm
      setSaveEnabled={setSaveEnabled}
      onSubmit={onSubmit}
      id={id}
    />
  );
}
