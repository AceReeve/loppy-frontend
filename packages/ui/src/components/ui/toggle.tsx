"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils.ts";

const toggleVariants = cva(
  " inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors  " +
    "hover:text-gray-500 focus-visible:outline-none focus-visible:ring-2 " +
    " disabled:pointer-events-none disabled:opacity-50 " +
    "data-[state=on]:bg-orange-500 data-[state=on]:text-white dark:ring-offset-gray-950 data-[state=on]:disabled " +
    "dark:hover:bg-gray-800 dark:hover:text-gray-400 dark:focus-visible:ring-gray-300 dark:data-[state=on]:bg-primary dark:data-[state=on]:text-white",

  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-gray-200 bg-transparent hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-50",
        rounded:
          "text-[12px] rounded-full h-7 hover:text-gray-900 hover:ring-orange-500 hover:ring-offset-2 hover:bg-primary/20",
      },
      state: {
        on: "bg-orange-500 text-white",
      },
      size: {
        default: "h-7 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    className={cn(toggleVariants({ variant, size, className }))}
    ref={ref}
    {...props}
  />
));
Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
