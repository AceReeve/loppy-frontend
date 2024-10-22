import type React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";

type FormType<Type> = UseFormReturn<z.infer<Type>>;

export interface FormComponentProps<Type> {
  id: string;
  setSaveEnabled?: (enabled: boolean) => void;
  onNextStep: () => void;
  setFormData?: React.Dispatch<React.SetStateAction<object>>;
  onSubmit?: (data: unknown) => void;
  isActive?: boolean;
  form?: FormType<Type>;
}

export interface StepItem {
  title: string;
  component: React.FC<FormComponentProps>;
  id: string;
  footerNote?: string;
  onSubmit?: (data: FormType) => void;
  form?: FormType;
}
