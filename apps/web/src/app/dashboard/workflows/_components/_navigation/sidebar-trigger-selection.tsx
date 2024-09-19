import { Input, Separator } from "@repo/ui/components/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CakeIcon,
  CalendarClockIcon,
  ContactRound,
  MailIcon,
  UserPlus,
  UserRoundCog,
  UserRoundPlus,
  UserRoundX,
} from "lucide-react";
import type { CustomNode } from "@repo/redux-utils/src/endpoints/types/workflow";
import { UserEdit } from "iconsax-react";
import TriggerSelection from "@/src/app/dashboard/workflows/_components/_selections/trigger-selection.tsx";
import BirthdayReminder from "@/src/app/dashboard/workflows/_components/_selections/_trigger/birthday-reminder.tsx";
import ContactChange from "@/src/app/dashboard/workflows/_components/_selections/_trigger/contact-change.tsx";
import CreateContact from "@/src/app/dashboard/workflows/_components/_selections/_action/create-contact.tsx";
import ContactTag from "@/src/app/dashboard/workflows/_components/_selections/_trigger/contact-tag.tsx";
import SendEmail from "@/src/app/dashboard/workflows/_components/_selections/_action/send-email.tsx";
import CustomDateReminder from "@/src/app/dashboard/workflows/_components/_selections/_trigger/custom-date-reminder.tsx";

interface SheetProps {
  openSheet: boolean;
  setOpenSheet: (open: boolean) => void;
  isTriggers: boolean;
  addTriggerNode: (node: CustomNode) => void;
  addActionNode: (node: CustomNode) => void;
}

export default function SidebarSelection(props: SheetProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const workflowCategory = props.isTriggers ? "Trigger" : "Action";
  const [isTriggerDetailsView, setIsTriggerDetailsView] = useState(false);

  /*  const triggerNodeData = [
    {
      id: "1",
      data: {
        title: "Birthday Reminder",
        content: "",
        icon: <CakeIcon />,
      },
      position: { x: 0, y: 0 },
    },
    {
      id: "2",
      data: {
        title: "Send Email",
        content: "",
        icon: <MailIcon />,
      },
      position: { x: 0, y: 0 },
    },
  ];*/

  /*  const triggerComponents = [
    {
      id: "1",
      component: (
        <BirthdayReminder
          onHandleClick={props.addTriggerNode}
          onAddNodes={closeTriggerView}
          icon={<CakeIcon />}
        />
      ),
    },

    {
      id: "2",
      component: (
        <SendEmail
          onHandleClick={props.addActionNode}
          onAddNodes={closeTriggerView}
          icon={<MailIcon />}
        />
      ),
    },
  ];*/
  const showNodeData = (node: CustomNode) => {
    const selectedNodeComponent =
      node.type === "triggerNode"
        ? triggerComponents[node.data.title]
        : actionComponents[node.data.title];
    setIsTriggerDetailsView(true);
    setCurrentTriggerView(selectedNodeComponent);
    props.setOpenSheet(true);
  };

  const onHandleAddNode = (node: CustomNode) => {
    node.type === "triggerNode"
      ? props.addTriggerNode(node)
      : props.addActionNode(node);
    setIsTriggerDetailsView(false);
  };

  const triggerComponents: Record<string, React.ReactNode> = {
    "Birthday Reminder": (
      <BirthdayReminder
        onHandleClick={onHandleAddNode}
        onNodeClick={showNodeData}
        icon={<CakeIcon />}
      />
    ),
    "Custom Date Reminder": (
      <CustomDateReminder
        onHandleClick={onHandleAddNode}
        onNodeClick={showNodeData}
        icon={<CalendarClockIcon />}
      />
    ),
  };

  const actionComponents: Record<string, React.ReactNode> = {
    "Send Email": (
      <SendEmail
        onHandleClick={onHandleAddNode}
        icon={<MailIcon />}
        onNodeClick={showNodeData}
      />
    ),
  };

  const triggers = [
    {
      id: 1,
      name: "Birthday Reminder",
      icon: <CakeIcon />,
      component: triggerComponents["Birthday Reminder"],
    },
    {
      id: 2,
      name: "Contact Changed",
      icon: <ContactRound />,
      component: <ContactChange />,
    },
    {
      id: 3,
      name: "Contact Created",
      icon: <UserPlus />,
      component: triggerComponents["Birthday Reminder"],
    },
    {
      id: 4,
      name: "Contact DND",
      icon: <UserRoundX />,
      component: triggerComponents["Birthday Reminder"],
    },
    {
      id: 5,
      name: "Contact Tag",
      icon: <UserRoundCog />,
      component: <ContactTag />,
    },
    {
      id: 6,
      name: "Custom Date Reminder",
      icon: <CalendarClockIcon />,
      component: triggerComponents["Custom Date Reminder"],
    },
  ];

  const actionTriggers = [
    {
      id: 1,
      name: "Create Contact",
      icon: <UserRoundPlus />,
      component: <CreateContact />,
    },
    {
      id: 2,
      name: "Send Email",
      icon: <MailIcon />,
      component: actionComponents["Send Email"],
    } /*
    {
      id: 2,
      name: "Find Contact",
      selection: TriggerSelection,
      icon: <UserRoundSearch />,
      component: <BirthdayReminder onHandleClick={props.addNode} />,
    },*/,
    {
      id: 3,
      name: "Update Contact Field",
      icon: <UserEdit />,
      component: actionComponents["Send Email"],
    },
    {
      id: 4,
      name: "Add Contact Tag",
      icon: <UserRoundPlus />,
      component: actionComponents["Send Email"],
    },
    {
      id: 5,
      name: "Assign to User",
      icon: <UserRoundCog />,
      component: actionComponents["Send Email"],
    },
    {
      id: 6,
      name: "Remove Assigned User",
      icon: <UserRoundX />,
      component: actionComponents["Send Email"],
    },
  ];
  const [displayedTriggers, setDisplayedTriggers] = useState(triggers);

  /*
  const handleDisplayNodeInfo = useCallback(
    (node: CustomNode) => {
      let filtered;
      if (node.type === "triggerNode") {
        filtered = triggers.filter(
          (trigger) => trigger.name === node.data.title,
        );
      } else {
        filtered = actionTriggers.filter(
          (trigger) => trigger.name === node.data.title,
        );
      }
      setIsTriggerDetailsView(true);
      setDisplayedTriggers(filtered);
      setIsTriggerDetailsView(true);
    },
    [isTriggerDetailsView, displayedTriggers],
  );
*/

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

  const [currentTriggerView, setCurrentTriggerView] = useState<React.ReactNode>(
    triggerComponents["Birthday Reminder"],
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
        <Separator className="my-5" />
        <div className="flex flex-col gap-5">
          <div className="space-y-2">
            <div className="flex flex-col space-y-2  p-1">
              {isTriggerDetailsView ? (
                <div>{currentTriggerView}</div>
              ) : (
                <>
                  <p className="text-sm font-semibold text-slate-600">
                    Selection
                  </p>
                  <div className="relative flex w-full flex-row justify-between gap-4">
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

                  <div className="w-full space-y-2 rounded border p-1">
                    {filteredTriggers.map((trigger) => (
                      <TriggerSelection
                        key={trigger.id}
                        id={trigger.id}
                        name={trigger.name}
                        icon={trigger.icon}
                        onButtonClick={handleTriggerClick}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
