import React, { createContext, useContext } from "react";
import { useGetPipelineListQuery } from "@repo/redux-utils/src/endpoints/pipelines.ts";
import type { GetAllPipelinesResponse } from "@repo/redux-utils/src/endpoints/types/pipelines.ts";
import { useGetWorkflowDropdownQuery } from "@repo/redux-utils/src/endpoints/workflow.ts";
import type { GetWorkflowDropDownResponse } from "@repo/redux-utils/src/endpoints/types/workflow";
import { GetAllPipelineListResponse } from "@repo/redux-utils/src/endpoints/types/pipelines.ts";

// Define the context type
interface WorkflowContextType {
  //  pipeline: GetAllPipelinesResponse[] | undefined; // Allow undefined if data isn't loaded
  pipeline: GetAllPipelineListResponse | undefined; // Allow undefined if data isn't loaded
  workflow: GetWorkflowDropDownResponse | undefined;
}

// Create the context with a default value of null
const WorkflowContext = createContext<WorkflowContextType | null>(null);

// Export the provider as a default function
export default function WorkflowProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //const pipeline = useGetAllPipelinesQuery(undefined);
  const workflow = useGetWorkflowDropdownQuery(undefined);
  const pipeline = useGetPipelineListQuery(undefined);

  // Handle loading and error states
  if (pipeline.isLoading) {
    return <div>Loading...</div>;
  }

  /*  if (pipelineData.isError) {
    return <div>Error: {pipelineData.error.message}</div>;
  }*/

  return (
    <WorkflowContext.Provider
      value={{ pipeline: pipeline.data, workflow: workflow.data }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

// Custom hook for using the context
export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error("useWorkflow must be used within a WorkflowProvider");
  }
  return context;
};
