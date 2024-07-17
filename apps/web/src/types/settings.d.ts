import type React from "react";

export interface StepComponentProps {
  setFormData: React.Dispatch<React.SetStateAction<object>>;
  setSaveEnabled: (enabled: boolean) => void;
}

export interface StepItem {
  id: string;
  title: string;
  component: React.FC<StepComponentProps>;
  footerNote?: string;
}
