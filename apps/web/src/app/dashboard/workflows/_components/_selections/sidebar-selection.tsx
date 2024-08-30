/*
import {
  Input,
  Separator,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/components/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import TriggerSelection from "@/src/app/dashboard/workflows/_components/_selections/trigger-selection.tsx";

interface SheetProps {
  openSheet: boolean;
  setOpenSheet: (open: boolean) => void;
}

export default function SelectionBar(props: SheetProps) {
  const isTriggers = true;
  const triggers = [
    {
      id: 1,
      name: "Birthday Reminder",
      selection: TriggerSelection,
      icon: <MagnifyingGlassIcon />,
      //component: <TriggerSelection />,
    },
    {
      id: 2,
      name: "Contact Changed",
      selection: TriggerSelection,
      icon: <MagnifyingGlassIcon />,
      // component: <TriggerSelection />,
    },
    {
      id: 3,
      name: "Contact Created",
      selection: TriggerSelection,
      icon: <MagnifyingGlassIcon />,
      //component: <TriggerSelection />,
    },
    {
      id: 4,
      name: "Contact DND",
      selection: TriggerSelection,
      icon: <MagnifyingGlassIcon />,
      //component: <TriggerSelection />,
    },
    {
      id: 5,
      name: "Contact Tag",
      selection: TriggerSelection,
      icon: <MagnifyingGlassIcon />,
      //component: <TriggerSelection />,
    },
    {
      id: 6,
      name: "Custom Date Reminder",
      selection: TriggerSelection,
      icon: <MagnifyingGlassIcon />,
      //component: <TriggerSelection />,
    },
  ];
  const actionTriggers = [
    {
      id: 1,
      name: "Create Contact",
      selection: TriggerSelection,
      icon: <MagnifyingGlassIcon />,
      //component: <TriggerSelection />,
    },
    {
      id: 2,
      name: "Find Contact",
      selection: TriggerSelection,
      icon: <MagnifyingGlassIcon />,
      // component: <TriggerSelection />,
    },
    {
      id: 3,
      name: "Update Contact Field",
      selection: TriggerSelection,
      icon: <MagnifyingGlassIcon />,
      //component: <TriggerSelection />,
    },
    {
      id: 4,
      name: "Add Contact Tag",
      selection: TriggerSelection,
      icon: <MagnifyingGlassIcon />,
      //component: <TriggerSelection />,
    },
    {
      id: 5,
      name: "Assign to User",
      selection: TriggerSelection,
      icon: <MagnifyingGlassIcon />,
      //component: <TriggerSelection />,
    },
    {
      id: 6,
      name: "Remove Assigned User",
      selection: TriggerSelection,
      icon: <MagnifyingGlassIcon />,
      //component: <TriggerSelection />,
    },
  ];
  const [displayedTriggers, setDisplayedTriggers] = useState(triggers);

/!*  useEffect(() => {
    if (isTriggers) {
      setDisplayedTriggers(triggers);
    } else {
      setDisplayedTriggers(actionTriggers);
    }
  }, [isTriggers]);*!/

  const [searchTerm, setSearchTerm] = useState("");

  /!*  const filteredTriggers = useMemo(() => {
    return displayedTriggers.filter((trigger) =>
      trigger.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, displayedTriggers]);*!/
  return (
    <Sheet open={props.openSheet} onOpenChange={props.setOpenSheet}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="block ">
              <div className="flex justify-start gap-3">
                <p>Workflow Trigger</p>
              </div>

              <p className="content-center font-nunito text-sm text-gray-500">
                Sets a workflow trigger that adds the contact upon execution.
              </p>
            </div>
          </SheetTitle>
        </SheetHeader>
        <Separator className="mt-10" />
        <div className="flex flex-col gap-5">
          <div className="relative mt-5 flex w-full flex-row justify-between gap-4">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 " />
            <Input
              className="h-[35px] pl-10 "
              placeholder="Search Work Trigger"
              type="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>

          {/!* <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-600">Contact</p>
            <div className="flex flex-col space-y-2 rounded border p-1">
              {filteredTriggers.map((trigger) => (
                <TriggerSelection
                  key={trigger.id}
                  name={trigger.name}
                  icon={trigger.icon}
                />
              ))}
            </div>
          </div>*!/}
        </div>

        <SheetFooter />
      </SheetContent>
    </Sheet>
  );
}
*/
