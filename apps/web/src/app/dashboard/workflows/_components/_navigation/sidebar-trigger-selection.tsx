import { Input, Separator } from "@repo/ui/components/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CakeIcon,
  CalendarClockIcon,
  ContactRound,
  UserPlus,
  UserRoundCog,
  UserRoundPlus,
  UserRoundSearch,
  UserRoundX,
} from "lucide-react";
import { UserEdit } from "iconsax-react";
import TriggerSelection from "@/src/app/dashboard/workflows/_components/_selections/trigger-selection.tsx";
import BirthdayReminder from "@/src/app/dashboard/workflows/_components/_selections/_trigger/birthday-reminder.tsx";
import ContactChange from "@/src/app/dashboard/workflows/_components/_selections/_trigger/contact-change.tsx";
import CreateContact from "@/src/app/dashboard/workflows/_components/_selections/_action/create-contact.tsx";
import ContactTag from "@/src/app/dashboard/workflows/_components/_selections/_trigger/contact-tag.tsx";

interface SheetProps {
  openSheet: boolean;
  setOpenSheet: (open: boolean) => void;
  isTriggers: boolean;
}

export default function SidebarSelection(props: SheetProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const workflowCategory = props.isTriggers ? "Trigger" : "Action";

  const triggers = [
    {
      id: 1,
      name: "Birthday Reminder",
      selection: TriggerSelection,
      icon: <CakeIcon />,
      component: <BirthdayReminder />,
    },
    {
      id: 2,
      name: "Contact Changed",
      selection: TriggerSelection,
      icon: <ContactRound />,
      component: <ContactChange />,
    },
    {
      id: 3,
      name: "Contact Created",
      selection: TriggerSelection,
      icon: <UserPlus />,
      component: <BirthdayReminder />,
    },
    {
      id: 4,
      name: "Contact DND",
      selection: TriggerSelection,
      icon: <UserRoundX />,
      component: <BirthdayReminder />,
    },
    {
      id: 5,
      name: "Contact Tag",
      selection: TriggerSelection,
      icon: <UserRoundCog />,
      component: <ContactTag />,
    },
    {
      id: 6,
      name: "Custom Date Reminder",
      selection: TriggerSelection,
      icon: <CalendarClockIcon />,
      component: <BirthdayReminder />,
    },
  ];
  const actionTriggers = [
    {
      id: 1,
      name: "Create Contact",
      selection: TriggerSelection,
      icon: <UserRoundPlus />,
      component: <CreateContact />,
    },
    {
      id: 2,
      name: "Find Contact",
      selection: TriggerSelection,
      icon: <UserRoundSearch />,
      component: <BirthdayReminder />,
    },
    {
      id: 3,
      name: "Update Contact Field",
      selection: TriggerSelection,
      icon: <UserEdit />,
      component: <BirthdayReminder />,
    },
    {
      id: 4,
      name: "Add Contact Tag",
      selection: TriggerSelection,
      icon: <UserRoundPlus />,
      component: <BirthdayReminder />,
    },
    {
      id: 5,
      name: "Assign to User",
      selection: TriggerSelection,
      icon: <UserRoundCog />,
      component: <BirthdayReminder />,
    },
    {
      id: 6,
      name: "Remove Assigned User",
      selection: TriggerSelection,
      icon: <UserRoundX />,
      component: <BirthdayReminder />,
    },
  ];
  const [displayedTriggers, setDisplayedTriggers] = useState(triggers);

  const handleClose = () => {
    isTriggerDetailsView
      ? setIsTriggerDetailsView(!isTriggerDetailsView)
      : props.setOpenSheet(!props.openSheet);
  };

  useEffect(() => {
    if (props.isTriggers) {
      setDisplayedTriggers(triggers);
    } else {
      setDisplayedTriggers(actionTriggers);
    }
  }, [props.isTriggers]);

  const filteredTriggers = useMemo(() => {
    return displayedTriggers.filter((trigger) =>
      trigger.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, displayedTriggers]);

  const [isTriggerDetailsView, setIsTriggerDetailsView] = useState(false);
  const [currentTriggerView, setCurrentTriggerView] = useState<React.ReactNode>(
    <BirthdayReminder />,
  );
  /*  const handleTriggerClick = (component: React.ReactNode) => {
    setIsTriggerDetailsView(!isTriggerDetailsView);
    setCurrentTriggerView(component);
  };*/

  const handleTriggerClick = (id: number) => {
    const selectedTrigger = displayedTriggers.find(
      (trigger) => trigger.id === id,
    );
    if (selectedTrigger) {
      setCurrentTriggerView(selectedTrigger.component);
      setIsTriggerDetailsView(!isTriggerDetailsView);
    }
  };
  return (
    props.openSheet && (
      <div className="absolute right-0 top-0 z-10 h-full w-[500px] bg-white p-10 ">
        <div className="block space-y-4">
          <button
            type="button"
            className="flex gap-2 text-orange-500"
            onClick={handleClose}
          >
            <ArrowLeft />
            <p>Back</p>
          </button>
          <div className="flex flex-col justify-start">
            <p>Workflow {workflowCategory}</p>
            <p className="content-center font-nunito text-sm text-gray-500">
              Sets a Workflow {workflowCategory} that adds the contact upon
              execution.
            </p>
          </div>
        </div>
        <Separator className="mt-5" />
        <div className="flex flex-col gap-5">
          <div className="relative mt-5 flex w-full flex-row justify-between gap-4">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 " />
            <Input
              className="h-[35px] pl-10 "
              placeholder={`Search Work ${workflowCategory}`}
              type="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-600">Contact</p>
            <div className="flex flex-col space-y-2 rounded border p-1">
              {isTriggerDetailsView ? (
                <div>{currentTriggerView}</div>
              ) : (
                filteredTriggers.map((trigger) => (
                  <TriggerSelection
                    key={trigger.id}
                    id={trigger.id}
                    name={trigger.name}
                    icon={trigger.icon}
                    onButtonClick={handleTriggerClick}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
