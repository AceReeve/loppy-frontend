"use client";
import React, { useState } from "react";
import "@xyflow/react/dist/style.css";
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui";
import WorkflowList from "@/src/app/dashboard/workflows/_view/workflow-list.tsx";
import Workflow from "@/src/app/dashboard/workflows/_tabs/workflow.tsx";
import WorkflowSettings from "@/src/app/dashboard/workflows/_tabs/settings.tsx";
import ExecutionLogs from "@/src/app/dashboard/workflows/_tabs/execution-logs.tsx";

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

  const [isWorkList, setIsWorkList] = useState(true);

  const handleViewState = () => {
    setIsWorkList(!isWorkList);
  };

  //INTEGRATION

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
        <div className="mb-2">
          <Button variant="outline" onClick={handleViewState}>
            Return Hub
          </Button>
          {/*<Button className="mr-2 rounded-md px-2 px-5 dark:text-slate-100">
            Save
          </Button>*/}
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
      <WorkflowList switchToWorkflowView={handleViewState} />
    </div>
  );

  return (
    <div className="rounded-xl bg-white px-4">
      {isWorkList ? WorkflowHub : WorkflowView}
    </div>
  );
}
