import React, { createContext, useContext } from "react";
import { useGetAllPipelinesQuery } from "@repo/redux-utils/src/endpoints/pipelines.ts";
import type { GetAllPipelinesResponse } from "@repo/redux-utils/src/endpoints/types/pipelines.ts";

// Define the context type
interface WorkflowContextType {
  pipeline: GetAllPipelinesResponse[] | undefined; // Allow undefined if data isn't loaded
}

// Create the context with a default value of null
const WorkflowContext = createContext<WorkflowContextType | null>(null);

// Export the provider as a default function
export default function WorkflowProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pipeline = useGetAllPipelinesQuery(undefined);

  // Handle loading and error states
  if (pipeline.isLoading) {
    return <div>Loading...</div>;
  }

  /*  if (pipelineData.isError) {
    return <div>Error: {pipelineData.error.message}</div>;
  }*/

  return (
    <WorkflowContext.Provider value={{ pipeline: pipeline.data }}>
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
