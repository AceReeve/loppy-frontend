"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { createContext, useContext } from "react";
import { cn } from "../../lib/utils.ts";

// Create a context to store props
const DrawerContext = createContext<
  React.ComponentProps<typeof DrawerPrimitive.Root> | undefined
>(undefined);

// Create a hook to use the context
const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawerContext must be used within a DrawerProvider");
  }
  return context;
};

function Drawer({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return (
    <DrawerContext.Provider value={props}>
      <DrawerPrimitive.Root
        shouldScaleBackground={shouldScaleBackground}
        {...props}
      />
    </DrawerContext.Provider>
  );
}
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    className={cn("fixed inset-0 z-50 bg-[#000]/80", className)}
    ref={ref}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { direction: dir } = useDrawerContext();
  let dirClasses = "";
  let grabberClasses = "";
  switch (dir) {
    case "right":
      dirClasses = "inset-y-0 right-0 pl-10 h-full rounded-l-2xl";
      grabberClasses = "left-4 top-[50%] w-2 h-[100px] -mt-[50px]";
      break;
    case "left":
      dirClasses = "inset-y-0 left-0 pr-5 h-full rounded-r-2xl";
      grabberClasses = "right-4 top-[50%] w-2 h-[100px] -mt-[50px]";
      break;
    case "top":
      dirClasses = "inset-x-0 top-0 mb-24 rounded-b-2xl";
      grabberClasses = "bottom-4 left-[50%] h-2 w-[100px] -ml-[50px]";
      break;
    case "bottom":
      dirClasses = "inset-x-0 bottom-0 mt-24 rounded-t-2xl";
      grabberClasses = "top-4 left-[50%] h-2 w-[100px] -ml-[50px]";
      break;
    default:
  }

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          "fixed z-50 flex h-auto flex-col border border-gray-200 bg-white",
          dirClasses,
          className,
        )}
        ref={ref}
        {...props}
      >
        <div
          className={cn("absolute rounded-full bg-gray-200", grabberClasses)}
        />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = "DrawerContent";

function DrawerHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("grid gap-1.5 my-6 text-center sm:text-left", className)}
      {...props}
    />
  );
}
DrawerHeader.displayName = "DrawerHeader";

function DrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    ref={ref}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
    ref={ref}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
