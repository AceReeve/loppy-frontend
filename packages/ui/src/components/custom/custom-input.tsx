import * as React from "react";
import { cn } from "../../lib/utils.ts";
export type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  suffix?: string; // Define a suffix property of type string
};
const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ suffix, className, type, ...props }, ref) => {
    return (
      <div className="flex gap-2 item-center">
        <input
          className={cn(
            "flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300",
            className,
          )}
          ref={ref}
          type={type}
          {...props}
        />
        {suffix}
      </div>
    );
  },
);
CustomInput.displayName = "Input";

export { CustomInput };
