"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../../lib/utils";

const RadioCards = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioCards.displayName = RadioGroupPrimitive.Root.displayName;

const RadioCardsItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "bg-card relative rounded-lg shadow-soft data-[state=checked]:border data-[state=checked]:border-primary",
        className,
      )}
      asChild={false}
      {...props}
    />
  );
});
RadioCardsItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioCards, RadioCardsItem };
