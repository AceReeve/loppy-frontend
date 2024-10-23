import React, { useEffect } from "react";
import { Form } from "@repo/ui/components/ui";
import { type FormComponentProps } from "@/src/types/settings";

interface StepFormProps<T> extends FormComponentProps<T> {
  children: React.ReactNode;
}

export default function StepForm({
  setSaveEnabled,
  id,
  onSubmit,
  isActive,
  children,
  form,
  onNextStep,
}: StepFormProps<never>) {
  useEffect(() => {
    if (isActive && setSaveEnabled && form) {
      setSaveEnabled(form.formState.isValid);
    }
  }, [form?.formState.isValid, isActive]);

  const onFormSubmit = () => {
    onNextStep();
  };

  if (!form) {
    return <>{children}</>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={
          onSubmit
            ? form.handleSubmit(onSubmit)
            : form.handleSubmit(onFormSubmit)
        }
        className="flex flex-col gap-4"
        id={id}
      >
        {children}
      </form>
    </Form>
  );
}
