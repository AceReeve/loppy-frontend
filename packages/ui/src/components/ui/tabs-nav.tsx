"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "../../lib/utils.ts";

const TabsNav = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    className={cn(
      "inline-flex h-10 w-full items-center justify-start border-b-2 border-gray-200 text-gray-800",
      className,
    )}
    ref={ref}
    {...props}
  />
));
TabsNav.displayName = TabsPrimitive.Root.displayName;

const TabsLink = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Link>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Link
    className={cn(
      "font-poppins data-[active]:border-primary inline-flex h-full items-center justify-center whitespace-nowrap rounded-none mx-3 first-of-type:ml-0 text-base font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[active]:border-b-2",
      className,
    )}
    ref={ref}
    {...props}
  />
));
TabsLink.displayName = TabsPrimitive.Trigger.displayName;

export { TabsNav, TabsLink };
