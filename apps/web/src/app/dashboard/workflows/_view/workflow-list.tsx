import { Button, Input, Separator } from "@repo/ui/components/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import { WorkFoldersDataTable } from "@/src/app/dashboard/workflows/_view/_data-table/worklist-folder-data-table.tsx";
import { workFolders } from "@/src/app/dashboard/workflows/_view/_columns/worklist-folder.tsx";

export default function WorkflowList() {
  const workFolderLists = [
    {
      id: 0,
      name: "Developers",
      lastUpdated: "August 25, 2024",
      createdOn: "August 21, 2024",
    },
    {
      id: 1,
      name: "QA",
      lastUpdated: "August 25, 2024",
      createdOn: "August 21, 2024",
    },
    {
      id: 2,
      name: "Front-End",
      lastUpdated: "August 25, 2024",
      createdOn: "August 21, 2024",
    },
  ];

  return (
    <div className="space-y-4 p-4">
      <div className="p-4">
        <WorkFoldersDataTable columns={workFolders} data={workFolderLists} />
      </div>
    </div>
  );
}
