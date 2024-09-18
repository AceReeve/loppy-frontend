import type { ReactNode } from "react";

/*export interface GetWorkFolders {
  name: string;
  lastUpdated: string;
  createdOn: string;
}*/
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

export interface CustomNode extends Node {
  id: string;
  type?: string;
  data: {
    title: string;
    content?: string;
    icon?: ReactNode.Node;
    onButtonClick?: OnButtonClickFunction;
  };
  position: { x: number; y: number };
}

// If you want to combine them into a single interface:
export interface CreateWorkflowPayload {
  id: string;
  template_id: string;
}
export interface SaveWorkflowPayload {
  trigger: Trigger;
  action: Action;
}

export interface GetCreateWorkflowResponse {
  name: string;
  created_by: string;
  trigger: Trigger[];
  action: Action[];
  status: string;
  _id: string;
  created_at: string;
  updated_at: string;
}
/*
export interface GetCreateWorkflowResponse {
  work_flow_name: string;
  created_by: string;
  trigger: Trigger[];
  action: Action[];
  _id: string;
  created_at: string;
  updated_at: string;
}
*/

export interface GetFolderResponse {
  _id: string;
  name: string;
  type: string;
  created_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}
export interface CreateFolderPayload {
  id: string;
  name: string;
}

export interface GetIDPayload {
  id: string;
}

export interface GetEditFolderPayload {
  id: string;
  name: string;
}

export interface GetWorkflowListPayload {
  id?: string;
}
