import React from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
} from "@repo/ui/components/ui";
import { AlertCircle } from "lucide-react";
import type { FormComponentProps } from "@/src/types/settings";
import ChooseNumberForm from "@/src/app/dashboard/settings/numbers/_components/forms/choose-number-form.tsx";

export default function ChooseNumberBusinessProfile({
  setSaveEnabled,
  onSubmit,
  id,
}: FormComponentProps) {
  return (
    <>
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="flex w-full justify-between text-sm font-semibold">
          Get your business number
          <Button
            asChild
            variant="outline"
            size="sm"
            className="px-2 py-0 text-gray-500"
          >
            <a href="/">Learn more</a>
          </Button>
        </AlertTitle>
        <AlertDescription>
          Local numbers will require verification of your business
        </AlertDescription>
      </Alert>
      <ChooseNumberForm
        setSaveEnabled={setSaveEnabled}
        onSubmit={onSubmit}
        id={id}
      />
    </>
  );
}
