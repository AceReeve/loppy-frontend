import React from "react";
import CustomInput, { CustomInputProps } from "./CustomInput";
import { EyeIcon } from "lucide-react"; // Assuming CustomInput is defined elsewhere

interface PasswordInputProps extends CustomInputProps {
  // Extend CustomInputProps to include suffix prop
  suffix: React.ReactNode; // React.ReactNode can render any JSX or string content
}

const InputPassword = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, suffix, ...props }, ref) => {
    return (
      <CustomInput
        className={className}
        {...props}
        ref={ref}
        suffix={<EyeIcon />}
      />
    );
  },
);

export default InputPassword;
