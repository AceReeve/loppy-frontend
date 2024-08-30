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
import React, { useCallback, useEffect, useState } from "react";
import "@xyflow/react/dist/style.css";
import { Edit } from "iconsax-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Separator,
} from "@repo/ui/components/ui";
import StartNode from "@/src/app/dashboard/workflows/_components/_custom-nodes/start-node.tsx";
import ActionEdge from "@/src/app/dashboard/workflows/_components/_custom-edges/action-edge.tsx";
import SidebarSelection from "@/src/app/dashboard/workflows/_components/_navigation/sidebar-trigger-selection.tsx";
import TriggerNode from "@/src/app/dashboard/workflows/_components/_custom-nodes/trigger-node.tsx";
import { ActionNode } from "@/src/app/dashboard/workflows/_components/_custom-nodes/trigger.tsx";
import EndNode from "@/src/app/dashboard/workflows/_components/_custom-nodes/end-node.tsx";

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
  const [primaryActionID, setPrimaryActionID] = useState("end");

  const handleOpenSheet = (isTrigger: boolean) => {
    setOpenSheet(!openSheet);
    setIsTriggers(isTrigger);
  };

  /*  const actionNodes: Node[] = [
    {
      id: "a1",
      type: "actionNode",
      data: { title: "end" },
      position: { x: 67, y: 250 },
    },
    {
      id: "end",
      type: "endNode",
      data: { title: "end" },
      position: { x: 67, y: 250 },
    },
  ];*/
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments -- (description)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    const triggerNodes = calculatePositions([
      {
        id: "1",
        type: "triggerNode",
        data: {
          title: "Add New Trigger",
          onButtonClick: () => {
            AddNode(nodeSample);
          },
        },
        position: { x: 0, y: 0 },
      },
    ]);

    const actionNodes = calculateActionPositions([
      /*      {
        id: "a1",
        type: "actionNode",
        data: { title: "Action" },
        position: { x: 67, y: 250 },
      },*/
      {
        id: "end",
        type: "actionNode",
        data: { title: "End" },
        position: { x: 67, y: 250 },
      },
    ]);

    setNodes([...actionNodes, ...triggerNodes]);
    const edge = [
      {
        id: "e1-end",
        source: "1",
        target: primaryActionID,
        type: "actionEdge",
        animated: false,
        data: { onButtonClick: handleOpenSheet },
      },
    ];
    setEdges(edge);
  }, []);

  function calculatePositions(triggerNodes: Node[]): Node[] {
    const baseOffset = 250;
    const startOffset = (triggerNodes.length - 1) * -125;
    return triggerNodes.map((node, index) => {
      const xPosition = startOffset + index * baseOffset;
      return {
        ...node,
        data: {
          title: `Trigger ID: ${node.id}`,
          onButtonClick: () => {
            AddNode(nodeSample);
          },
        },
        position: { x: xPosition, y: 0 }, // Adjust y as needed
      };
    });
  }

  function calculateActionPositions(actionNodes: Node[]): Node[] {
    const baseOffset = 250;
    const startOffset = 250;
    return actionNodes.map((node, index) => {
      const yPosition = startOffset + index * baseOffset;
      return {
        ...node,
        data: {
          title: `Action ID: ${node.id}`,
          onButtonClick: () => {
            AddActionNode(nodeSample);
          },
        },
        position: { x: 0, y: yPosition }, // Adjust y as needed
      };
    });
  }

  const nodeSample: Node = {
    id: "",
    type: "actionNode",
    data: {
      title: "Trigger Title",
      onButtonClick: handleOpenSheet,
    },
    position: { x: 200, y: 0 },
  };

  const AddNode = useCallback(
    (node: Node) => {
      let newNodeId = "";
      let lastNodeId = 0;

      setNodes((currentNodes: Node[]) => {
        const existingActionNodes = currentNodes.filter(
          (n) => n.type === "triggerNode",
        );
        // Generate new node ID based on currentNodes length to ensure uniqueness
        lastNodeId =
          currentNodes.length > 0
            ? extractNumericId(
                existingActionNodes[existingActionNodes.length - 1].id,
              )
            : 0;

        newNodeId = (lastNodeId + 1).toString();

        // Create the new node with default position
        const newNode: Node = {
          ...node,
          id: newNodeId,
          type: "triggerNode",
          position: { x: 0, y: 0 }, // Position will be recalculated
        };

        // Add the new node to the nodes list
        const updatedTriggerNodes = [
          ...currentNodes.filter((n) => n.type === "triggerNode"),
          newNode,
        ];

        // Calculate positions for all trigger nodes only
        const positionedNodes = calculatePositions(updatedTriggerNodes);

        // Update nodes by combining with action nodes
        return [
          ...currentNodes.filter((n) => n.type !== "triggerNode"),
          ...positionedNodes,
        ];
      });

      setEdges((currentEdges: Edge[]) => {
        const newEdge: Edge = {
          id: `e${newNodeId}`,
          source: newNodeId,
          target: primaryActionID,
          type: "smoothstep",
          animated: false,
          data: { onButtonClick: handleOpenSheet },
        };
        return [...currentEdges, newEdge];
      });
    },
    [handleOpenSheet],
  );

  /*  function extractNumericId(id: string): number {
    const match = id.match(/\d+$/); // Regex to find digits at the end of the string
    return match ? parseInt(match[0], 10) : 0;
  }*/
  function extractNumericId(id: string): number {
    const regex = /\d+$/; // Regex to find digits at the end of the string
    const match = regex.exec(id);
    return match ? parseInt(match[0], 10) : 0;
  }

  const AddActionNode = useCallback(
    (node: Node) => {
      let newNodeId = "";
      let lastNodeId = 1;
      let existingActionNodes: Node[] = [];

      setNodes((currentNodes: Node[]) => {
        // Filter existing action nodes
        existingActionNodes = currentNodes.filter(
          (n) => n.type === "actionNode",
        );

        // Generate new node ID based on the last action node's ID
        lastNodeId =
          existingActionNodes.length > 0
            ? extractNumericId(
                existingActionNodes[existingActionNodes.length - 1].id,
              )
            : 0;

        // Create a new node ID for the new action node
        newNodeId = `a${(lastNodeId + 1).toString()}`;

        // Create the new action node with default position
        const newNode: Node = {
          ...node,
          id: newNodeId,
          type: "actionNode",
          position: { x: 0, y: 0 }, // Position will be recalculated
        };

        // Unshift the new node to the beginning of the action nodes list
        existingActionNodes.unshift(newNode);

        // Calculate positions for all action nodes
        const positionedNodes = calculateActionPositions(existingActionNodes);

        // Update nodes by combining with other nodes
        return [
          ...currentNodes.filter((n) => n.type !== "actionNode"),
          ...positionedNodes,
        ];
      });

      setPrimaryActionID(newNodeId);

      // Now setEdges can use the newNodeId
      setEdges((currentEdges: Edge[]) => {
        const newEdge: Edge = {
          id: `e${newNodeId}`,
          // source: "a" + lastNodeId.toString(), // Adjust this based on your specific logic
          source:
            existingActionNodes[existingActionNodes.length - 1].id.toString(),
          target: newNodeId,
          type: "smoothstep",
          animated: false,
          data: { onButtonClick: handleOpenSheet },
        };
        return [...currentEdges, newEdge];
      });
    },
    [handleOpenSheet],
  );

  /*  const deleteNode = useCallback((nodeId: string) => {
    setNodes((currentNodes) =>
      currentNodes.filter((node) => node.id !== nodeId),
    );
    setEdges((currentEdges) =>
      currentEdges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId,
      ),
    );
  }, []);*/

  /*  const onConnect = useCallback(
    (connection: Connection) => {
      const edge: Edge = {
        ...connection,
        animated: true,
        id: `${edges.length} + 1`,
      };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges],
  );*/

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
  };

  return (
    <div className="border-5 h-[725px] w-full border-gray-900">
      <div className="flex w-full justify-center gap-2 rounded-md bg-white p-4">
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
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        /*        onConnect={onConnect}*/
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <SidebarSelection
          openSheet={openSheet}
          setOpenSheet={setOpenSheet}
          isTriggers={isTriggers}
        />
        <Background className="rounded-xl !bg-slate-200" />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
