import type React from "react";

export interface FormComponentProps {
  setSaveEnabled: (enabled: boolean) => void;
  id: string;
  setFormData?: React.Dispatch<React.SetStateAction<object>>;
  onSubmit?: (data: unknown) => void;
}

export interface StepItem {
  id: string;
  title: string;
  component: React.FC<FormComponentProps>;
  footerNote?: string;
  onSubmit?: (data: unknown) => void;
}
