import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/components/ui";
import React from "react";
import { MessageSquare } from "lucide-react";

interface MessagesDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function MessagesDrawer({ open, setOpen }: MessagesDrawerProps) {
  const messages = [
    {
      title: "Garrett Elmore",
      description: "20 seconds ago",
    },
    {
      title: "Garrett Elmore",
      description: "1 hour ago",
    },
    {
      title: "Garrett Elmore",
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
          <MessageSquare className="size-6" />
          <div className="absolute -top-1 right-0 flex size-5 flex-col items-center justify-center rounded-full bg-red-500">
            <div className="font-inter text-xs font-bold text-white">3</div>
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full max-w-[400px]">
        <DrawerHeader>
          <DrawerTitle>Messages</DrawerTitle>
        </DrawerHeader>
        <div>
          {messages.map((message) => (
            <div
              key={message.title}
              className="mb-2 grid grid-cols-[50px_1fr] items-start rounded-md bg-gray-100 p-2"
            >
              <span className="flex size-8 translate-y-1 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {message.title}
                </p>
                <p className="text-muted-foreground text-sm">
                  {message.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
