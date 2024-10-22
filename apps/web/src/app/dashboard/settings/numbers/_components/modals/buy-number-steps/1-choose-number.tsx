import React from "react";
import type { FormComponentProps } from "@/src/types/settings";
import ChooseNumberForm from "@/src/app/dashboard/settings/numbers/_components/forms/choose-number-form.tsx";
import { type chooseNumberSchema } from "@/src/app/dashboard/settings/numbers/_components/schemas/buy-number-schemas.ts";

export default function ChooseNumber({
  id,
  isActive,
  form,
  onNextStep,
}: FormComponentProps<typeof chooseNumberSchema>) {
  return (
    <ChooseNumberForm
      id={id}
      isActive={isActive}
      form={form}
      onNextStep={onNextStep}
    />
  );
}
