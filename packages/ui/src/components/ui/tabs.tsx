"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import { cn } from "../../lib/utils.ts";

// Tab variants using cva
const tabVariants = cva(
  "inline-flex w-full items-center justify-start text-gray-800",
  {
    variants: {
      variant: {
        default: "h-10 border-b-2 border-gray-200",
        box: "border-none gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const tabTriggerVariants = cva(
  "font-poppins inline-flex items-center justify-center whitespace-nowrap rounded-none text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "h-full mx-3 first-of-type:ml-0 ring-offset-white transition-all data-[state=active]:border-b-2 data-[state=active]:border-primary",
        box: "gap-2 w-full border bg-primary/60 text-white data-[state=active]:bg-primary hover:bg-primary inline-flex items-center px-3 py-2 justify-center whitespace-nowrap rounded-xl text-sm font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// Create a context to store variant props
const TabsContext = createContext<VariantProps<typeof tabVariants> | undefined>(
  undefined,
);

// Create a hook to use the context
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within a TabsProvider");
  }
  return context;
};

function Tabs({
  variant,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> &
  VariantProps<typeof tabVariants>) {
  return (
    <TabsContext.Provider value={{ variant }}>
      <TabsPrimitive.Root {...props}>{children}</TabsPrimitive.Root>
    </TabsContext.Provider>
  );
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { variant } = useTabsContext();
  return (
    <TabsPrimitive.List
      className={cn(tabVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { variant } = useTabsContext();
  return (
    <TabsPrimitive.Trigger
      className={cn(tabTriggerVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Content
      className={cn(
        "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
