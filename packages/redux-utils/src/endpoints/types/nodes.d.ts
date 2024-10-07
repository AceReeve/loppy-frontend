import type { ReactNode } from "react";

export interface ITriggerNode extends Node {
  id: string;
  type: string;
  data: {
    node_name: string;
    node_type_id: string;
    title: string;
    content: {
      subject?: string;
      message?: string;
      pipeline?: string;
      opportunity_name: string;
      opportunity_source: string;
      status?: string;
      filters?: { filter: string; value: string }[];
    };
    icon?: ReactNode; // Correct usage of ReactNode
    onButtonClick?: OnButtonClickFunction;
  };
  position: { x: number; y: number };
}

export interface IActionNode extends Node {
  id: string;
  type: string;
  data: {
    node_name: string;
    node_type_id: string;
    title: string;
    content: {
      subject?: string;
      message?: string;
      pipeline?: string;
      opportunity_name: string;
      opportunity_source: string;
      status?: string;
      filters?: { filter: string; value: string }[];
    };
    icon?: ReactNode; // Correct usage of ReactNode
    onButtonClick?: OnButtonClickFunction;
  };
  position: { x: number; y: number };
}

/*export interface TriggerNode extends CustomNode {
  data: CustomNode["data"] & {
    node_type_id: string;
    content: {
      filters: Array<{ filter: string; value: string }>;
    };
  };
}*/
