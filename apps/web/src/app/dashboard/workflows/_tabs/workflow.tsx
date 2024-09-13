"use client";
import {
  Background,
  ReactFlow,
  useEdgesState,
  useNodesState,
  Controls,
  MiniMap,
} from "@xyflow/react";
import type { Node, Edge } from "@xyflow/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "@xyflow/react/dist/style.css";
import { Edit } from "iconsax-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Separator,
  toast,
} from "@repo/ui/components/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useCreateWorkflowMutation } from "@repo/redux-utils/src/endpoints/workflow.ts";
import StartNode from "@/src/app/dashboard/workflows/_components/_custom-nodes/start-node.tsx";
import ActionEdge from "@/src/app/dashboard/workflows/_components/_custom-edges/action-edge.tsx";
import SidebarSelection from "@/src/app/dashboard/workflows/_components/_navigation/sidebar-trigger-selection.tsx";
import TriggerNode from "@/src/app/dashboard/workflows/_components/_custom-nodes/trigger-node.tsx";
import EndNode from "@/src/app/dashboard/workflows/_components/_custom-nodes/end-node.tsx";
import ActionNode from "@/src/app/dashboard/workflows/_components/_custom-nodes/action-node.tsx";
import DefaultEdge from "@/src/app/dashboard/workflows/_components/_custom-edges/default-edges.tsx";

export default function Workflow() {
  const nodeTypes = {
    startNode: StartNode,
    triggerNode: TriggerNode,
    actionNode: ActionNode,
    endNode: EndNode,
  };

  const [openSheet, setOpenSheet] = useState(false);
  const [openWorkName, setOpenWorkName] = useState(false);
  const [isTriggers, setIsTriggers] = useState(false);
  /*  const [primaryActionID, setPrimaryActionID] = useState("a0");*/

  const primaryActionID = useRef("a0");
  const updatePrimaryActionID = (newID: string) => {
    primaryActionID.current = newID;
  };

  const handleOpenSheet = (isTrigger: boolean) => {
    setOpenSheet(true);
    setIsTriggers(isTrigger);
  };

  const triggerNodes = calculatePositions([
    {
      id: "0",
      type: "triggerNode",
      data: {
        title: "Add New Trigger",
        onButtonClick: handleOpenSheet,
      },
      position: { x: 0, y: 0 },
    },
  ]);

  const actionNodes = calculateActionPositions([
    {
      id: "a0",
      type: "actionNode",
      data: { title: "End" },
      position: { x: 67, y: 250 },
    },
  ]);
  const [nodes, setNodes] = useNodesState<Node>([
    ...actionNodes,
    ...triggerNodes,
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments -- (description)
  const [edges, setEdges] = useEdgesState<Edge>([]);

  useEffect(() => {
    /*    setNodes([...actionNodes, ...triggerNodes]);*/

    // Define the new edge
    const newEdge = {
      id: "n0-a0",
      source: "0",
      target: primaryActionID.current,
      type: "actionEdge",
      animated: false,
      data: {
        onButtonClick: handleOpenSheet,
      },
    };

    // Update edges
    setEdges((currentEdges) => {
      // Find the index of the existing edge
      const existingEdgeIndex = currentEdges.findIndex(
        (edge) => edge.id === newEdge.id,
      );

      if (existingEdgeIndex >= 0) {
        const updatedEdges = [...currentEdges];
        updatedEdges[existingEdgeIndex] = newEdge;
        return updatedEdges;
      }
      return [...currentEdges, newEdge];
    });
  }, [primaryActionID.current, nodes]);

  function calculatePositions(tNodes: Node[]): Node[] {
    const baseOffset = 250;
    const startOffset = (tNodes.length - 1) * -125;
    return tNodes.map((node, index) => {
      const xPosition = startOffset + index * baseOffset;
      return {
        ...node,
        /*        data: {
          title: `Trigger ID: ${node.id}`,
          onButtonClick: handleOpenSheet,
        },*/
        position: { x: xPosition, y: 0 },
      };
    });
  }

  function calculateActionPositions(aNodes: Node[]): Node[] {
    const baseOffset = 250;
    const startOffset = 250;
    return aNodes.map((node, index) => {
      const yPosition = startOffset + index * baseOffset;
      return {
        ...node,
        /*        data: {
          /!* title: `Action ID: ${node.id}`,*!/
          onButtonClick: () => {
            AddActionNode(nodeSample);
          },
        },*/
        position: { x: 0, y: yPosition },
      };
    });
  }

  /*
  const nodeSample: Node = {
    id: "",
    type: "actionNode",
    data: {
      title: "Trigger Title",
      onButtonClick: handleOpenSheet,
    },
    position: { x: 200, y: 0 },
  };
*/

  /*  useEffect(() => {}, [primaryActionID.current]);*/

  const AddNode = useCallback(
    (node: Node) => {
      let newNodeId = "";
      let lastNodeId = 0;

      setNodes((currentNodes: Node[]) => {
        const existingNodes = currentNodes.filter(
          (n) => n.type === "triggerNode",
        );

        const isDuplicate = existingNodes.some(
          (n: Node) => n.data.title === node.data.title,
        );

        if (isDuplicate) {
          setDuplicateNode(true);
          return currentNodes;
        }

        lastNodeId =
          currentNodes.length > 0
            ? extractNumericId(existingNodes[existingNodes.length - 1].id)
            : 0;

        newNodeId = (lastNodeId + 1).toString();

        const newNode: Node = {
          ...node,
          id: newNodeId,
          type: "triggerNode",
        };

        const updatedTriggerNodes = [
          ...currentNodes.filter((n) => n.type === "triggerNode"),
          newNode,
        ];

        const positionedNodes = calculatePositions(updatedTriggerNodes);

        return [
          ...currentNodes.filter((n) => n.type !== "triggerNode"),
          ...positionedNodes,
        ];
      });

      setEdges((currentEdges: Edge[]) => {
        const newEdge: Edge = {
          id: `n${newNodeId}-${primaryActionID.current}`,
          source: newNodeId,
          /*          target: "a1",*/
          target: primaryActionID.current,
          type: "defaultEdge",
          animated: false,
          data: { onButtonClick: handleOpenSheet },
        };

        return [...currentEdges, newEdge];
      });
    },
    [handleOpenSheet, primaryActionID.current],
  );

  function extractNumericId(id: string): number {
    const regex = /\d+$/;
    const match = regex.exec(id);
    return match ? parseInt(match[0], 10) : 0;
  }

  const [duplicateNode, setDuplicateNode] = useState<boolean>(false);
  useEffect(() => {
    if (duplicateNode) {
      toast({
        title: "Notice",
        description: "Node already exists",
        variant: "destructive",
      });
      // Reset duplicate state after showing the toast
      setDuplicateNode(false);
    }
  }, [duplicateNode]);

  const AddActionNode = useCallback(
    (node: Node) => {
      let newNodeId = "";
      let lastNodeId = 1;
      let existingActionNodes: Node[] = [];

      setNodes((currentNodes: Node[]) => {
        existingActionNodes = currentNodes.filter(
          (n) => n.type === "actionNode",
        );

        const isDuplicate = existingActionNodes.some(
          (n: Node) => n.data.title === node.data.title,
        );

        if (isDuplicate) {
          setDuplicateNode(true);
          return currentNodes;
        }

        lastNodeId =
          existingActionNodes.length > 0
            ? extractNumericId(existingActionNodes[0].id)
            : 0;
        newNodeId = `a${(lastNodeId + 1).toString()}`;

        const newNode: Node = {
          ...node,
          id: newNodeId,
          type: "actionNode",
          position: { x: 0, y: 0 },
        };

        existingActionNodes.unshift(newNode);
        /*setPrimaryActionID(existingActionNodes[0].id);*/
        updatePrimaryActionID(existingActionNodes[0].id);

        const positionedNodes = calculateActionPositions(existingActionNodes);

        return [
          ...currentNodes.filter((n) => n.type !== "actionNode"),
          ...positionedNodes,
        ];
      });

      setEdges((currentEdges: Edge[]) => {
        const filteredEdges = currentEdges.filter(
          (edge) =>
            edge.id.startsWith("n") && edge.target !== primaryActionID.current,
        );

        const updatedEdges = filteredEdges.map((edge) => ({
          ...edge,
          target: primaryActionID.current,
        }));

        const newEdge: Edge = {
          id: `a${newNodeId}-${existingActionNodes[1].id.toString()}`,
          source: newNodeId,
          target: existingActionNodes[1].id.toString(),
          type: "actionEdge",
          animated: false,
          data: { onButtonClick: handleOpenSheet },
        };

        return [
          ...updatedEdges,
          ...currentEdges.filter(
            (edge) =>
              !edge.id.startsWith("n") ||
              edge.target === primaryActionID.current,
          ),
          newEdge,
        ];
      });
    },
    [handleOpenSheet],
  );

  const [workflowName, setWorkflowName] = useState("12598271215");
  const [inputValue, setInputValue] = useState(workflowName);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleSave = () => {
    setWorkflowName(inputValue);
    setOpenWorkName(!openWorkName);
  };

  const edgeTypes = {
    actionEdge: ActionEdge,
    defaultEdge: DefaultEdge,
  };

  const handleAddNodeClick = (node: Node) => {
    AddNode(node);
    setOpenSheet(false);
  };
  const handleAddActionNodeClick = (node: Node) => {
    AddActionNode(node);
    setOpenSheet(false);
  };

  // INTEGRATION PART

  const formSchema = z.object({
    trigger: z.object({
      id: z.string().min(1, "Trigger ID is required"),
      trigger_name: z.string().min(1, "Trigger name is required"),
      content: z.array(z.string().min(1, "Trigger Content cannot be empty")),
    }),
    action: z.object({
      id: z.string().min(1, "Action ID is required"),
      action_name: z.string().min(1, "Action name is required"),
      content: z.string().min(1, "Action Content is required"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trigger: {
        id: "",
        trigger_name: "",
        content: [],
      },
      action: {
        id: "",
        action_name: "",
        content: "",
      },
    },
  });

  const [createWorkflow] = useCreateWorkflowMutation();
  const SaveWorkflow = async () => {
    try {
      const existingActionNodes = nodes.filter(
        (n) => n.type === "actionNode" && n.id !== "a0",
      );

      const existingTriggerNodes = nodes.filter(
        (n) => n.type === "triggerNode" && n.id !== "0",
      );

      if (existingTriggerNodes.length > 0) {
        const firstTriggerNode = existingTriggerNodes[0];

        form.setValue("trigger.id", firstTriggerNode.id);
        form.setValue(
          "trigger.trigger_name",
          firstTriggerNode.data.title as string,
        );
        form.setValue("trigger.content", [
          firstTriggerNode.data.content as string,
        ]);
      }

      if (existingActionNodes.length > 0) {
        const firstActionNode = existingActionNodes[0];

        form.setValue("action.id", firstActionNode.id);
        form.setValue(
          "action.action_name",
          firstActionNode.data.title as string,
        );
        form.setValue("action.content", firstActionNode.data.content as string);
      }

      // Perform workflow creation
      /*
      await createWorkflow(form.getValues()).unwrap();
*/

      const response = await createWorkflow(form.getValues()).unwrap();

      if ((response as { work_flow_name: string }).work_flow_name) {
        // Handle successful submission
        toast({
          title: "Workflow created Successfully",
          description: "New workflow has been created.",
          variant: "success",
        });
        form.reset();
      } else {
        // Handle submission failure
        toast({
          title: "Creation of Workflow Failed",
          description: "Failed to create workflow",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Create Workflow Error",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="border-5 h-[725px] w-full border-gray-900">
      <div className="flex w-full items-center justify-center gap-2 rounded-md bg-white p-4">
        <Button
          className="absolute right-5 rounded px-4"
          onClick={SaveWorkflow}
        >
          Publish
        </Button>
        <p className="font-semibold">New Workflow: {workflowName}</p>
        <Dialog open={openWorkName} onOpenChange={setOpenWorkName}>
          <DialogTrigger>
            <Edit className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <p className="text-slate-600">Change Workflow Name</p>
            <Separator />
            <Input placeholder={workflowName} onChange={handleInputChange} />
            <Button onClick={handleSave}>Save</Button>
          </DialogContent>
        </Dialog>
      </div>
      {/* <SelectionBar openSheet={openSheet} setOpenSheet={setOpenSheet} /> */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        /*        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}*/
        /*        onConnect={onConnect}*/
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <SidebarSelection
          openSheet={openSheet}
          isTriggers={isTriggers}
          setOpenSheet={setOpenSheet}
          addActionNode={handleAddActionNodeClick}
          addTriggerNode={handleAddNodeClick}
        />
        <Background className="rounded-xl !bg-slate-200" />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
