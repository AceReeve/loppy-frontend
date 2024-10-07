import { Input, Separator } from "@repo/ui/components/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  ArrowLeft,
  CalendarClockIcon,
  ContactRound,
  MailIcon,
  UserPlus,
  UserRoundCog,
  UserRoundPlus,
  UserRoundX,
} from "lucide-react";
import type {
  ITriggerNode,
  IActionNode,
} from "@repo/redux-utils/src/endpoints/types/nodes";
import { Message, UserEdit } from "iconsax-react";
import type { SidebarRefProp } from "@/src/app/dashboard/workflows/_tabs/workflow.tsx";
import TriggerSelection from "@/src/app/dashboard/workflows/_components/_selections/trigger-selection.tsx";
import type { CustomTriggerProps } from "@/src/app/dashboard/workflows/_components/_custom-nodes/trigger-node.tsx";
import ContactChange from "@/src/app/dashboard/workflows/_components/_selections/_trigger/contact-change.tsx";
import CreateContact from "@/src/app/dashboard/workflows/_components/_selections/_action/create-contact.tsx";
import ContactTag from "@/src/app/dashboard/workflows/_components/_selections/_trigger/contact-tag.tsx";
import SendEmail from "@/src/app/dashboard/workflows/_components/_selections/_action/send-email.tsx";
import CustomerReplied from "@/src/app/dashboard/workflows/_components/_selections/_trigger/events/customer-replied.tsx";
import { nodeIcons } from "@/src/app/dashboard/workflows/_components/_custom-nodes/node-icons.tsx";
import BirthdayReminder from "@/src/app/dashboard/workflows/_components/_selections/_trigger/birthday-reminder.tsx";
import OpportunitiesStatusChanged from "@/src/app/dashboard/workflows/_components/_selections/_trigger/opportunities/opportunities-status-changed.tsx";
import CreateUpdateOpportunity from "@/src/app/dashboard/workflows/_components/_selections/_action/opportunities/create-update-opportunity.tsx";

interface SheetProps {
  openSheet: boolean;
  setOpenSheet: (open: boolean) => void;
  isTriggers: boolean;
  addTriggerNode: (node: ITriggerNode | IActionNode, isEdit?: boolean) => void;
  addActionNode: (node: ITriggerNode | IActionNode, isEdit?: boolean) => void;
  deleteNode: (node: ITriggerNode | IActionNode) => void;
}

const SidebarSelection = forwardRef<SidebarRefProp, SheetProps>(
  (props, ref) => {
    const [searchTerm, setSearchTerm] = useState("");
    const workflowCategory = props.isTriggers ? "Trigger" : "Action";
    const [isTriggerDetailsView, setIsTriggerDetailsView] = useState(false);

    const showNodeData = (node: ITriggerNode | IActionNode) => {
      const Component =
        node.type === "triggerNode"
          ? triggerComponents[node.data.node_name]
          : actionComponents[node.data.node_name];
      setIsTriggerDetailsView(true);
      setCurrentTriggerView(
        <Component
          node={node}
          onHandleClick={onHandleAddNode}
          onHandleDelete={props.deleteNode}
        />,
      );

      // Open the sheet
      props.setOpenSheet(true);
    };

    useImperativeHandle(ref, () => {
      return {
        showNodeData(node: IActionNode | ITriggerNode) {
          showNodeData(node);
        },
      };
    }, []);
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

    const onHandleAddNode = (
      node: ITriggerNode | IActionNode,
      isEdit?: boolean,
    ) => {
      node.type === "triggerNode"
        ? props.addTriggerNode(node, isEdit)
        : props.addActionNode(node, isEdit);

      setIsTriggerDetailsView(false);
    };

    const triggerComponents: Record<string, React.FC<CustomTriggerProps>> = {
      "Birthday Reminder": BirthdayReminder,
      "Customer Replied": CustomerReplied,
      "Opportunity Status Changed": OpportunitiesStatusChanged,
      /*      "Custom Date Reminder": (
        <CustomDateReminder
          onHandleClick={onHandleAddNode}
          onNodeClick={showNodeData}
          icon={<CalendarClockIcon />}
        />
      ),*/
    };

    const actionComponents: Record<string, React.FC<CustomTriggerProps>> = {
      "Send Email": SendEmail,
      "Create Update Opportunity": CreateUpdateOpportunity,
    };

    /*  const birthdayNode = {
    id: "1",
    type: "triggerNode",
    data: {
      title: "BLACKALS",
      node_name: "Birthday Reminder",
      node_type_id: "Birthday Reminder",
      content: {
        filters: [
          {
            filter: "Test",
            value: "TEst",
          },
        ],
      },
    },z
  };*/

    const triggers = [
      {
        title: "Contact",
        id: 1,
        color: "bg-orange-500/30 text-orange-500",
        children: [
          {
            id: 1,
            name: "Birthday Reminder",
            icon: nodeIcons["Birthday Reminder"],
            component: <BirthdayReminder onHandleClick={onHandleAddNode} />,
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
        ],
      },
      {
        title: "Events",
        id: 2,
        color: "bg-green-500/30 text-green-500",
        children: [
          {
            id: 7,
            name: "Customer Replied",
            icon: <Message />,
            component: <CustomerReplied onHandleClick={onHandleAddNode} />,
          },
        ],
      },
      {
        title: "Pipelines",
        id: 3,
        color: "bg-blue-500/30 text-blue-500'",
        children: [
          {
            id: 8,
            name: "Opportunity Status Changed",
            icon: nodeIcons["Opportunity Status Changed"],
            component: (
              <OpportunitiesStatusChanged onHandleClick={onHandleAddNode} />
            ),
          },
          {
            id: 9,
            name: "Opportunity Created",
            icon: <Message />,
            component: <CustomerReplied onHandleClick={onHandleAddNode} />,
          },
          {
            id: 10,
            name: "Opportunity Changed",
            icon: <Message />,
            component: <CustomerReplied onHandleClick={onHandleAddNode} />,
          },
          {
            id: 11,
            name: "Pipeline Stage Changed",
            icon: <Message />,
            component: <CustomerReplied onHandleClick={onHandleAddNode} />,
          },
          {
            id: 7,
            name: "Stale Opportunities",
            icon: <Message />,
            component: <CustomerReplied onHandleClick={onHandleAddNode} />,
          },
        ],
      },
    ];

    const actionTriggers = [
      {
        title: "Contact",
        id: 0,
        color: "bg-orange-500/30 text-orange-500",
        children: [
          {
            id: 0,
            name: "Create Contact",
            icon: <UserRoundPlus />,
            component: <CreateContact />,
          },
          {
            id: 1,
            name: "Send Email",
            icon: <MailIcon />,
            component: <SendEmail onHandleClick={onHandleAddNode} />,
          } /*
    {
      id: 2,
      name: "Find Contact",
      selection: TriggerSelection,
      icon: <UserRoundSearch />,
      component: <BirthdayReminder onHandleClick={props.addNode} />,
    },*/,
          {
            id: 2,
            name: "Update Contact Field",
            icon: <UserEdit />,
            component: actionComponents["Send Email"],
          },
          {
            id: 3,
            name: "Add Contact Tag",
            icon: <UserRoundPlus />,
            component: actionComponents["Send Email"],
          },
          {
            id: 4,
            name: "Assign to User",
            icon: <UserRoundCog />,
            component: actionComponents["Send Email"],
          },
          {
            id: 5,
            name: "Remove Assigned User",
            icon: <UserRoundX />,
            component: actionComponents["Send Email"],
          },
        ],
      },
      {
        title: "Opportunities",
        id: 1,
        color: "bg-blue-500/30",
        children: [
          {
            id: 6,
            name: "Create/Update Opportunities",
            icon: nodeIcons["Create Update Opportunity"],
            component: (
              <CreateUpdateOpportunity onHandleClick={onHandleAddNode} />
            ),
          },
        ],
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

    const [currentTriggerView, setCurrentTriggerView] =
      useState<React.ReactNode>();

    const filteredTriggers = useMemo(() => {
      return displayedTriggers
        .map((trigger) => {
          const matchingChildren = trigger.children.filter((child) =>
            child.name.toLowerCase().includes(searchTerm.toLowerCase()),
          );

          return {
            ...trigger,
            children: matchingChildren,
          };
        })
        .filter((trigger) => trigger.children.length > 0);
    }, [searchTerm, displayedTriggers]);

    const handleTriggerClick = (id: number) => {
      const selectedChild = displayedTriggers
        .flatMap((trigger) => trigger.children)
        .find((child) => child.id === id);

      if (selectedChild) {
        setCurrentTriggerView(selectedChild.component as React.ReactNode);
        setIsTriggerDetailsView(!isTriggerDetailsView);
      }
    };

    /*  const handleTriggerClick = (component: React.ReactNode) => {
    setIsTriggerDetailsView(!isTriggerDetailsView);
    setCurrentTriggerView(component);
  };*/

    return (
      props.openSheet && (
        <div className="custom-scrollbar absolute right-0 top-0 z-10 h-full w-[500px] overflow-y-scroll bg-white p-10">
          <div className="block space-y-4">
            <button
              type="button"
              className="flex gap-2 text-orange-500"
              onClick={handleClose}
            >
              <ArrowLeft />
              <p>Back</p>
            </button>
            {/* <div className="flex flex-col justify-start">
              <p>Workflow {workflowCategory}</p>
              <p className="content-center font-nunito text-sm text-gray-500">
                Sets a Workflow {workflowCategory} that adds the contact upon
                execution.
              </p>
            </div>*/}
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

                    <div className=" w-full space-y-2  p-1">
                      {filteredTriggers.map((trigger) => (
                        <div className="space-y-2" key={trigger.id}>
                          <p className=" font-semibold">{trigger.title}</p>
                          {/* Assuming trigger has a name for the category */}
                          {trigger.children.map((child) => (
                            <TriggerSelection
                              color={trigger.color}
                              key={child.id}
                              id={child.id}
                              name={child.name}
                              icon={child.icon}
                              onButtonClick={handleTriggerClick}
                            />
                          ))}
                        </div>
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
  },
);
SidebarSelection.displayName = "SidebarSelection";
export default SidebarSelection;
