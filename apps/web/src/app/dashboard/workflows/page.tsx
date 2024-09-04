"use client";
import React, { useMemo, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import "@xyflow/react/dist/style.css";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Input,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui";
import Workflow from "@/src/app/dashboard/workflows/_tabs/workflow.tsx";
import WorkflowSettings from "@/src/app/dashboard/workflows/_tabs/settings.tsx";
import ExecutionLogs from "@/src/app/dashboard/workflows/_tabs/execution-logs.tsx";
import WorkflowList from "@/src/app/dashboard/workflows/_view/workflow-list.tsx";
import WorkflowTemplate from "@/src/app/dashboard/workflows/_components/_cards/workflow-template-card.tsx";

export default function Page() {
  const tabs = [
    {
      label: "Workflow",
      id: "workflow",
      component: <Workflow />,
    },
    {
      label: "Settings",
      id: "settings",
      component: <WorkflowSettings />,
    },
    {
      label: "Execution Logs",
      id: "execution-logs",
      component: <ExecutionLogs />,
    },
  ];

  const templates = [
    {
      id: 1,
      title: "Scratch ",
      description: "Build everything from scratch",
    },
    {
      id: 2,
      title: "SMS Template",
      description:
        "A concise and efficient SMS template crafted to simplify your text messaging. This template is designed to help you quickly create clear and impactful messages, ideal for promotions, reminders, or personalized updates.",
    },
    {
      id: 3,
      title: "Email Template",
      description:
        ' "A customizable email template designed to streamline your communication. This template allows you to easily craft professional and consistent emails, with predefined layouts and styling that can be tailored to fit various messaging needs.',
    },
    {
      id: 4,
      title: "Email Template",
      description:
        ' "A customizable email template designed to streamline your communication. This template allows you to easily craft professional and consistent emails, with predefined layouts and styling that can be tailored to fit various messaging needs.',
    },
    {
      id: 5,
      title: "Email Template",
      description:
        ' "A customizable email template designed to streamline your communication. This template allows you to easily craft professional and consistent emails, with predefined layouts and styling that can be tailored to fit various messaging needs.',
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  //const [displayedTemplates, setdisplayedTemplates] = useState(templates);
  const displayedTemplates = templates;

  const filteredTemplates = useMemo(() => {
    return displayedTemplates.filter((template) =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, displayedTemplates]);

  const [isWorkList, setIsWorkList] = useState(true);

  const handleViewState = () => {
    setIsWorkList(!isWorkList);
  };

  const WorkflowView = (
    <Tabs className="mt-8 w-full" defaultValue={tabs[0].id}>
      <TabsList className="flex justify-between">
        <div className="relative h-full">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </div>
        <div className="space-x-4">
          <Button variant="outline" onClick={handleViewState}>
            Return Hub
          </Button>
          <Button className="mr-2 rounded-md px-2 px-5 dark:text-slate-100">
            Save
          </Button>
        </div>
      </TabsList>
      <div className="mt-2 h-[800px] w-full ">
        {tabs.map((tab) => {
          // const TabComponent = tab.component;
          return (
            <TabsContent key={tab.id} value={tab.id}>
              {tab.component}
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );

  const WorkflowHub = (
    <div className="p-10">
      <div className="flex w-full justify-between px-8">
        <div className="flex flex-col">
          <h4 className="text-xl font-semibold">Workflow List</h4>
          <p className="text-sm text-slate-600">
            A comprehensive overview of your workflows, detailing the latest
            updates and allowing easy access to manage and create new workflows.
          </p>
        </div>
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">+ Create Folder</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[700px]">
              <DialogTitle className="font-normal">Create a Folder</DialogTitle>
              <Separator />
              <div className="flex items-center">
                <p className="w-1/4">Folder Name: </p>
                <Input />
              </div>
              <div className="flex justify-end">
                <Button className="rounded px-4">Create</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-white">+ Create Workflow</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[1000px] ">
              <DialogTitle className="font-normal">
                Create a Workflow
              </DialogTitle>
              <div className=" space-y-2">
                <Separator />
                <div className="custom-scrollbar h-[700px] space-y-4 overflow-y-scroll border-black bg-slate-100 p-2">
                  <div className="relative w-full gap-4">
                    <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500" />
                    <Input
                      className="w-full rounded pl-10"
                      placeholder="Search Template"
                      type="search"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                    />
                  </div>
                  {filteredTemplates.map((template) => (
                    <WorkflowTemplate
                      title={template.title}
                      description={template.description}
                      onButtonClick={handleViewState}
                      key={template.id}
                    />
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <WorkflowList />
    </div>
  );

  return (
    <div className="rounded-xl bg-white px-4">
      {isWorkList ? WorkflowHub : WorkflowView}
    </div>
  );
}
