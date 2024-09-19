import React from "react";
import type { FormComponentProps } from "@/src/types/settings";
import ChooseNumber from "@/src/app/dashboard/settings/numbers/_components/modals/buy-number-steps/1-choose-number.tsx";

export default function ChooseNumberBusinessProfile({
  setFormData,
  setSaveEnabled,
  id,
}: FormComponentProps) {
  return (
    <ChooseNumber
      setFormData={setFormData}
      setSaveEnabled={setSaveEnabled}
      id={id}
    />
  );
}
