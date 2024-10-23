/*import type { ReactNode } from "react";*/

/*export interface GetWorkFolders {
  name: string;
  lastUpdated: string;
  createdOn: string;
}*/
export interface Trigger {
  id: string;
  title: string;
  node_name: string;
  node_type_id: string;
  content: {
    filters?: { filter: string; value: string }[];
  };
}

export interface Action {
  id: string;
  title: string;
  node_name: string;
  node_type_id: string;
  content: {
    subject?: string;
    message?: string;
    filters?: { filter: string; value: string }[];
  };
}

/*export interface CustomNode extends Node {
  id: string;
  type?: string;
  data: {
    title: string;
    content?: string;
    icon?: ReactNode.Node;
    onButtonClick?: OnButtonClickFunction;
  };
  position: { x: number; y: number };
}*/

// If you want to combine them into a single interface:
export interface CreateWorkflowPayload {
  id: string;
  template_id: string;
  [key: string]: string;
}
export interface SaveWorkflowPayload {
  id: string;
  trigger: Trigger[];
  action: Action[];
}
export interface PublishWorkflowPayload {
  id: string;
  published: boolean;
  //[key: string]: string;
  //[key: boolean]: boolean;
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
  isPublished: boolean;
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
  [key: string]: string;
}

interface Workflow {
  name: string;
  id: string;
}

interface Tag {
  name: string;
  id: number;
}

interface GetWorkflowDropDownResponse {
  workflows: Workflow[];
  tags: Tag[];
}
