import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/components/ui";
import React from "react";
import { Bell } from "lucide-react";

interface NotificationsDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function NotificationsDrawer({
  open,
  setOpen,
}: NotificationsDrawerProps) {
  const notifications = [
    {
      title: "Finish setting up your number",
      description: "20 seconds ago",
    },
    {
      title: "You have a new lead!",
      description: "1 hour ago",
    },
    {
      title: "Your subscription is expiring soon!",
      description: "4 hours ago",
    },
  ];

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="relative rounded-md p-2"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Bell className="size-6" />
          <div className="absolute -top-1 right-0 flex size-5 flex-col items-center justify-center rounded-full bg-red-500">
            <div className="font-inter text-xs font-bold text-white">3</div>
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full max-w-[400px]">
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
        </DrawerHeader>
        <div>
          {notifications.map((notification) => (
            <div
              key={notification.title}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-muted-foreground text-sm">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
