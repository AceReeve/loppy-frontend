import { Notification } from "iconsax-react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/components/ui";
import React from "react";

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
          variant="outline"
          className="flex items-center gap-3 rounded-full p-3"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className="relative flex size-10 items-center justify-center rounded-full">
            <Notification className="size-5" />
          </div>
          <div className="font-poppins text-sm font-normal">Notification</div>
          <div className="flex size-6 flex-col items-center justify-center rounded-full bg-red-500">
            <div className="font-poppins text-xs font-bold text-white">10</div>
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
