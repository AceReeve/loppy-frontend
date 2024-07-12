"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "../../lib/utils.ts";

const VerticalMenu = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    className={cn(
      "inline-flex py-4 rounded-3xl bg-card flex-col w-full items-start justify-start text-gray-500 shadow-soft",
      className,
    )}
    ref={ref}
    {...props}
  />
));
VerticalMenu.displayName = TabsPrimitive.Root.displayName;

const VerticalMenuLink = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Link>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Link
    className={cn(
      "font-poppins px-6 py-3 inline-flex gap-2 w-full items-center justify-start whitespace-nowrap rounded-none text-sm font-normal ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[active]:border-primary data-[active]:border-l-2 data-[active]:bg-primary/10 data-[active]:text-primary",
      className,
    )}
    ref={ref}
    {...props}
  />
));
VerticalMenuLink.displayName = TabsPrimitive.Trigger.displayName;

export { VerticalMenu, VerticalMenuLink };
