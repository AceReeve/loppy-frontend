"use client";
import {
  addEdge,
  Background,
  Connection,
  Edge,
  ReactFlow,
  useEdgesState,
  Node,
  useNodesState,
  NodeTypes,
} from "@xyflow/react";
import React, { useCallback, useEffect, useState } from "react";
import "@xyflow/react/dist/style.css";
import StartNode from "@/src/app/dashboard/workflows/_components/_custom-nodes/start-node.tsx";
import { Edit } from "iconsax-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Separator,
} from "@repo/ui/components/ui";
import SelectionBar from "@/src/app/dashboard/workflows/_components/_selections/sidebar-selection.tsx";
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

  const handleOpenSheet = (isTrigger: boolean) => {
    setOpenSheet(!openSheet);
    setIsTriggers(isTrigger);
  };

  const initialNodes: Node[] = [
    {
      id: "1",
      type: "startNode",
      data: { title: "Add New Trigger", onButtonClick: handleOpenSheet },
      position: { x: 0, y: 0 },
    },

    {
      id: "2",
      // you can also pass a React component as a label
      type: "triggerNode",
      data: {
        title: "Contact",
      },
      position: { x: 250, y: 0 },
    },
    {
      id: "3",
      type: "actionNode",
      data: {
        title: "TestNode",
        onButtonClick: handleOpenSheet,
      },
      position: { x: 125, y: 150 },
    },
    {
      id: "4",
      type: "actionNode",
      data: {
        title: "Action node",
        onButtonClick: handleOpenSheet,
      },
      position: { x: 125, y: 300 },
    },
    {
      id: "end",
      type: "endNode",
      data: { title: "end" },
      position: { x: 200, y: 450 },
    },
  ];

  const nodeSample: Node = {
    id: "",
    type: "actionNode",
    data: {
      title: "Action node",
      onButtonClick: handleOpenSheet,
    },
    position: { x: 0, y: 0 },
  };

  const initialEdges: Edge[] = [
    {
      id: "e1-3",
      source: "1",
      target: "3",
      type: "actionEdge",
      animated: false,
      data: {
        onButtonClick: () => {
          AddNode(nodeSample);
        },
      },
    },
    {
      id: "e2-3]",
      source: "2",
      target: "3",
      type: "smoothstep",
      animated: false,
      data: { onButtonClick: handleOpenSheet },
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      type: "actionEdge",
      animated: false,
      data: { onButtonClick: handleOpenSheet },
    },
    {
      id: "e4-end",
      source: "4",
      target: "end",
      type: "actionEdge",
      animated: false,
      data: { onButtonClick: handleOpenSheet },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  /*  const AddTriggerNodes = () => {
    const newNodeId = (nodes.length + 1).toString(); // Generate a new unique id
    const newTriggerNode = {
      id: newNodeId,
      type: "triggerNode",
      data: {
        title: `New Trigger ${newNodeId}`, // Title can be dynamic
        onButtonClick: handleOpenSheet, // Assuming you want to handle a click
      },
      position: { x: 250 * nodes.length, y: 0 }, // Position dynamically
    };

    setNodes((nds) => [...nds, newTriggerNode]); // Add the new node
  };*/

  const AddNode = (node: Node) => {
    let newNodeId: string;

    // Update nodes state
    setNodes((nds) => {
      const lastNode = nds[nds.length - 1];
      const lastNodeId = parseInt(lastNode.id);
      newNodeId = (lastNodeId + 1).toString();
      const newNode: Node = {
        ...node,
        id: newNodeId,
        type: "triggerNode",
        position: { x: 250 * (nds.length - 2), y: 0 },
      };

      return [...nds, newNode];
    });

    setEdges((eds) => {
      const newEdge: Edge = {
        id: `e${newNodeId}-3`,
        source: newNodeId,
        target: "3",
        /* type: "actionEdge",*/
        type: "smoothstep",
        animated: false,
        data: { onButtonClick: handleOpenSheet },
      };

      return [...eds, newEdge];
    });
  };

  const deleteNode = (nodeId: string) => {
    // Remove the node
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));

    // Remove any edges connected to the node
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    );
  };

  const onConnect = useCallback((connection: Connection) => {
    const edge: Edge = {
      ...connection,
      animated: true,
      id: `${edges.length} + 1`,
    };
    setEdges((prevEdges) => {
      return addEdge(edge, prevEdges);
    });
  }, []);
  const [workflowName, setWorkflowName] = useState("12598271215");
  const [inputValue, setInputValue] = useState(workflowName);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };
  const edgeTypes = {
    actionEdge: ActionEdge,
  };
  const handleSave = () => {
    setWorkflowName(inputValue);
    setOpenWorkName(!openWorkName);
  };

  return (
    <div className="border-5 h-[1000px] w-full border-gray-900">
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
      {/*<SelectionBar openSheet={openSheet} setOpenSheet={setOpenSheet} />*/}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        /*        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}*/
        onConnect={onConnect}
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
        {/*        <Controls />
        <MiniMap />*/}
      </ReactFlow>
    </div>
  );
}
