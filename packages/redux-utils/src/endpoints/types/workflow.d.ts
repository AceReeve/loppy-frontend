export interface GetWorkFolders {
  name: string;
  lastUpdated: string;
  createdOn: string;
}
export interface Trigger {
  id: string;
  trigger_name: string;
  content: string[];
}

export interface Action {
  id: string;
  action_name: string;
  content: string;
}

// If you want to combine them into a single interface:
export interface CreateWorkflowPayload {
  trigger: Trigger;
  action: Action;
}

export interface GetCreateWorkflowResponse {
  work_flow_name: string;
  created_by: string;
  trigger: Trigger[];
  action: Action[];
  _id: string;
  created_at: string;
  updated_at: string;
}
