"use client";
import type { Edge, Node } from "@xyflow/react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import React, { use, useCallback, useEffect, useRef, useState } from "react";
import "@xyflow/react/dist/style.css";
import { Edit } from "iconsax-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Input,
  Separator,
  Switch,
  toast,
} from "@repo/ui/components/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import type {
  IActionNode,
  ITriggerNode,
} from "@repo/redux-utils/src/endpoints/types/nodes";
import {
  useEditFolderMutation,
  useGetWorkflowQuery,
  usePublishWorkflowMutation,
  useSaveWorkflowMutation,
} from "@repo/redux-utils/src/endpoints/workflow.ts";
import type { GetEditFolderPayload } from "@repo/redux-utils/src/endpoints/types/workflow";
import Link from "next/link";
import StartNode from "@/src/app/dashboard/workflows/_components/_custom-nodes/start-node.tsx";
import ActionEdge from "@/src/app/dashboard/workflows/_components/_custom-edges/action-edge.tsx";
import SidebarSelection from "@/src/app/dashboard/workflows/_components/_navigation/sidebar-trigger-selection.tsx";
import TriggerNode from "@/src/app/dashboard/workflows/_components/_custom-nodes/trigger-node.tsx";
import EndNode from "@/src/app/dashboard/workflows/_components/_custom-nodes/end-node.tsx";
import ActionNode from "@/src/app/dashboard/workflows/_components/_custom-nodes/action-node.tsx";
import DefaultEdge from "@/src/app/dashboard/workflows/_components/_custom-edges/default-edges.tsx";
import { nodeIcons } from "@/src/app/dashboard/workflows/_components/_custom-nodes/node-icons.tsx";

export interface SidebarRefProp {
  showNodeData: (node: IActionNode | ITriggerNode) => void;
}

export default function Page({ params }: { params: { workflowID: string } }) {
  //@ts-expect-error -- ignore data for now.
  const { workflowID }: { workflowID: string } = use(params);

  const nodeTypes = {
    startNode: StartNode,
    triggerNode: TriggerNode,
    actionNode: ActionNode,
    endNode: EndNode,
  };

  /*  const tabs = [
    {
      label: "Workflow",
      id: "workflow",
      component: (
        <Workflow workflowID={workflowID} workflowName={workflowName} />
      ),
    },
    /!*    {
      label: "Settings",
      id: "settings",
      component: <WorkflowSettings />,
    },
    {
      label: "Execution Logs",
      id: "execution-logs",
      component: <ExecutionLogs />,
    },*!/
  ];*/

  const { data: workflow } = useGetWorkflowQuery({
    id: workflowID,
  });

  const [openSheet, setOpenSheet] = useState(false);
  const [openWorkName, setOpenWorkName] = useState(false);
  const [isTriggers, setIsTriggers] = useState(false);
  const selectedEdge = useRef<string>("");
  /*  const [primaryActionID, setPrimaryActionID] = useState("a0");*/

  const primaryActionID = useRef("a0");
  const deletedCount = useRef(0);
  const deletedTrigger = useRef(0);

  const updatePrimaryActionID = (newID: string) => {
    primaryActionID.current = newID;
  };

  const handleOpenSheet = (isTrigger: boolean, edge?: string) => {
    setOpenSheet(true);
    setIsTriggers(isTrigger);
    if (edge) {
      selectedEdge.current = edge;
    }
  };

  /*  useEffect(() => {
      console.log("Selected edge updated:", selectedEdge);
    }, [selectedEdge]);*/

  const sidebarRef = useRef<HTMLDivElement & SidebarRefProp>(null);
  const [workName, setWorkName] = useState(workflow ? workflow.name : "");
  const [inputValue, setInputValue] = useState<string>(workName);
  const showNodeData = (node: IActionNode | ITriggerNode) => {
    if (sidebarRef.current) {
      sidebarRef.current.showNodeData(node);
    }
  };

  const triggerNodes = calculatePositions([
    {
      id: "n0",
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

  const initialEdge = {
    id: `n0-a0`,
    source: "n0",
    target: "a0",
    type: "actionEdge",
    animated: false,
    data: {
      onButtonClick: handleOpenSheet,
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments -- (description)
  const [edges, setEdges] = useEdgesState<Edge>([]);

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
        position: { x: 0, y: yPosition },
      };
    });
  }

  const AddNode = useCallback(
    (node: Node) => {
      let newNodeId = "";
      let lastNodeId = 0;

      setNodes((currentNodes: Node[]) => {
        const existingNodes = currentNodes.filter(
          (n) => n.type === "triggerNode",
        );

        lastNodeId =
          currentNodes.length > 0
            ? extractNumericId(existingNodes[existingNodes.length - 1].id)
            : 0;

        newNodeId = (lastNodeId + 1 + deletedTrigger.current).toString();

        const newNode: Node = {
          ...node,
          id: `n${newNodeId}`,
          type: "triggerNode",
          data: {
            ...node.data,
            onButtonClick: () => {
              showNodeData(newNode as ITriggerNode);
            },
          },
        };
        (newNode as ITriggerNode).data.icon =
          nodeIcons[(node as ITriggerNode).data.node_name];

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
          source: `n${newNodeId}`,
          /*          target: "a1",*/
          target: primaryActionID.current,
          type: "defaultEdge",
          animated: false,
          data: { onButtonClick: handleOpenSheet },
        };

        return [...currentEdges, newEdge];
      });
    },
    [], //handleOpenSheet
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

  const updateNode = (node: IActionNode | ITriggerNode) => {
    setNodes((prevNodes) =>
      prevNodes.map((n) => {
        if (n.id === node.id) {
          return {
            ...n,
            ...node,
            data: {
              ...n.data,
              ...node.data,
              onButtonClick: () => {
                showNodeData(node);
              },
            },
          };
        }
        return n;
      }),
    );
  };

  /*  console.log(edges);*/
  const [nodeIdToDelete, setNodeIdToDelete] = useState<string | null>(null);
  useEffect(() => {
    if (nodeIdToDelete) {
      const updateEdges = (currentEdges: Edge[]) => {
        // Get the edges connected to the current node
        const prevEdges = currentEdges.filter(
          (edge) => edge.target === nodeIdToDelete,
        );
        const nextEdges = currentEdges.filter(
          (edge) => edge.source === nodeIdToDelete,
        );
        /*        console.log("nextEdges", nextEdges);
                console.log("prevEdges", prevEdges);*/

        /*        console.log("nextEdges", nextEdges);
                console.log("prevEdges", prevEdges);*/
        // Check if there are any next edges to update the target
        if (prevEdges.length > 0 && nextEdges.length > 0) {
          const splitIds = nextEdges[0].id.split("-");

          if (prevEdges[0].target === primaryActionID.current) {
            updatePrimaryActionID(nextEdges[0].source);
          }

          // Create new edges with updated properties using the spread operator
          const updatedPrevEdges = prevEdges.map((edge, index) => {
            if (index === 0) {
              return {
                ...edge,
                target: splitIds[1], // Update target based on the first next edge
                id: `${prevEdges[0].source}-${splitIds[1]}`, // Update edge IDz
              };
            }
            return edge; // Return unchanged edges
          });

          const updatedEdges = currentEdges.filter(
            (e) =>
              /*!nextEdges.some((nEdge) => nEdge.id === e.id) &&*/
              !prevEdges.some((pEdge) => pEdge.id === e.id),
          );

          // Combine updated edges with the modified first prevEdge (if it was updated)
          return updatedEdges.concat(
            updatedPrevEdges.filter((edge, index) => index === 0),
          );
        }

        // Return current edges if no modifications are made
        return currentEdges;
      };

      setEdges((currentEdges) => updateEdges(currentEdges));

      // Reset the state after processing
      setNodeIdToDelete("");
      if (nodeIdToDelete.startsWith("n")) {
        deletedTrigger.current++;
      } else {
        deletedCount.current++;
      }
    }
  }, [nodeIdToDelete]);

  const deleteNode = (node: IActionNode | ITriggerNode) => {
    setNodeIdToDelete(node.id);

    setNodes((currentNodes: Node[]) => {
      const updatedTriggerNodes = currentNodes.filter(
        (n) => n.type === node.type,
      );

      const updatedNodes = updatedTriggerNodes.filter((n) => n.id !== node.id);

      /*      if (node.type === "actionNode" && node.id === primaryActionID.current) {
              //updatePrimaryActionID();
            }*/

      const positionedNodes =
        node.type === "triggerNode"
          ? calculatePositions(updatedNodes)
          : calculateActionPositions(updatedNodes);

      if (node.id === primaryActionID.current) {
        updatePrimaryActionID(positionedNodes[0].id);
      }

      return [
        ...currentNodes.filter((n) => n.type !== node.type),
        ...positionedNodes,
      ];
    });

    // DELETE EDGE
  };

  useEffect(() => {
    const filteredEdges = edges.filter(
      (edge) =>
        edge.id.startsWith("n") && edge.target !== primaryActionID.current,
    );

    const getEdges = () => {
      const updatedEdges = filteredEdges.map((edge) => ({
        ...edge,
        id: `${edge.source}-${primaryActionID.current}`, // Update the edge ID
        target: primaryActionID.current, // Update the target to the primaryActionID
      }));

      return [
        ...updatedEdges,
        ...edges.filter(
          (edge) =>
            !edge.id.startsWith("n") || edge.target === primaryActionID.current,
        ),
      ];
    };

    // Assuming you have a setEdges function to update edges
    setEdges(getEdges); // Update edges instead of nodes
  }, [primaryActionID.current]); // Include edges in the dependency array

  /*
    useEffect(() => {
      const existingActionNodes = nodes.filter((n) => n.type === "actionNode");
      console.log("exists", existingActionNodes[0]);
      updatePrimaryActionID(existingActionNodes[0].id);
    }, [initialEdge.id, nodes]);
  */

  const AddActionNode = useCallback(
    (node: Node) => {
      let newNodeId = "";
      //let lastNodeId = 1;
      let nextNodeId = "a0";
      let prevNodeId = "n0";
      let existingActionNodes: Node[] = [];

      const isDuplicate = existingActionNodes.some(
        (n: Node) => n.data.title === node.data.title,
      );

      if (isDuplicate) {
        setDuplicateNode(true);
        return;
      }

      setNodes((currentNodes: Node[]) => {
        existingActionNodes = currentNodes.filter(
          (n) => n.type === "actionNode",
        );

        /*        lastNodeId =
                      existingActionNodes.length > 0
                        ? extractNumericId(existingActionNodes[0].id)
                        : 0;*/
        //newNodeId = `a${(lastNodeId + 1).toString()}`;
        newNodeId = `a${(Number(existingActionNodes.length) + deletedCount.current).toString()}`;

        const newNode: Node = {
          ...node,
          id: newNodeId,
          type: "actionNode",
          data: {
            ...node.data,
            onButtonClick: () => {
              showNodeData(newNode as IActionNode);
            },
          },
        };
        (newNode as IActionNode).data.icon =
          nodeIcons[(node as IActionNode).data.node_name];

        const sideNodes = selectedEdge.current.split("-");

        const belowNode = existingActionNodes.find(
          (sideNode) => sideNode.id === sideNodes[1],
        );

        if (belowNode) {
          const belowIndex = existingActionNodes.indexOf(belowNode);
          existingActionNodes.splice(belowIndex, 0, newNode);
          if (belowIndex === 0) {
            updatePrimaryActionID(existingActionNodes[0].id);
          }
        }

        const currentIndex = existingActionNodes.indexOf(newNode);
        const nextNode = existingActionNodes[Number(currentIndex + 1)];
        nextNodeId = nextNode.id;

        if (currentIndex !== 0) {
          const prevNode = existingActionNodes[Number(currentIndex - 1)];
          prevNodeId = prevNode.id;
        }

        const positionedNodes = calculateActionPositions(existingActionNodes);

        return [
          ...currentNodes.filter((n) => n.type !== "actionNode"),
          ...positionedNodes,
        ];
      });

      const updateEdges = (currentEdges: Edge[]) => {
        // This set of code changes all the triggerNodes connection to main point of action.
        const filteredEdges = currentEdges.filter(
          (edge) =>
            edge.id.startsWith("n") && edge.target !== primaryActionID.current,
        );

        const updatedEdges = filteredEdges.map((edge) => ({
          ...edge,
          id: `${edge.source}-${primaryActionID.current}`,
          target: primaryActionID.current,
        }));
        // up until here.

        const newEdge: Edge = {
          id: `${newNodeId}-${nextNodeId}`,
          source: newNodeId,
          target: nextNodeId,
          type: "actionEdge",
          animated: false,
          data: { onButtonClick: handleOpenSheet },
        };

        const updatePrevNode = currentEdges.map((edge) => {
          if (edge.source === prevNodeId) {
            return {
              ...edge,
              id: `${edge.source}-${newNodeId}`, // Update ID
              target: newNodeId, // Modify this if needed
            };
          }
          return edge;
        });

        const combinedEdges = [
          ...updatedEdges,
          ...updatePrevNode.filter(
            (edge) =>
              !edge.id.startsWith("n") ||
              edge.target === primaryActionID.current,
          ),
          newEdge,
        ];

        // Remove duplicates based on edge.id
        return combinedEdges.filter(
          (edge, index, self) =>
            index === self.findIndex((e) => e.id === edge.id),
        );
      };

      setEdges(updateEdges);
    },
    [], //handleOpenSheet
  );

  const InitializeActionNode = useCallback(
    (node: Node) => {
      let newNodeId = "";
      let lastNodeId = 1;
      let existingActionNodes: Node[] = [];
      setNodes((currentNodes: Node[]) => {
        existingActionNodes = currentNodes.filter(
          (n) => n.type === "actionNode",
        );

        /*        const isDuplicate = existingActionNodes.some(
                    (n: Node) => n.data.title === node.data.title,
                  );

                  if (isDuplicate) {
                    setDuplicateNode(true);
                    return currentNodes;
                  }*/

        lastNodeId =
          existingActionNodes.length > 0
            ? extractNumericId(existingActionNodes[0].id)
            : 0;
        newNodeId = `a${(lastNodeId + 1).toString()}`;

        /*        const newNode: Node = {
                        ...node,
                        id: newNodeId,
                        type: "actionNode",
                        position: { x: 0, y: 0 },
                      };*/

        const newNode: Node = {
          ...node,
          id: newNodeId,
          type: "actionNode",
          data: {
            ...node.data,
            onButtonClick: () => {
              showNodeData(newNode as IActionNode);
            },
          },
        };
        (newNode as IActionNode).data.icon =
          nodeIcons[(node as IActionNode).data.node_name];

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

        initialEdge.id = `n0-${primaryActionID.current}`;
        initialEdge.target = primaryActionID.current;

        const newEdge: Edge = {
          id: `${newNodeId}-${existingActionNodes[1].id.toString()}`,
          source: newNodeId,
          target: existingActionNodes[1].id.toString(),
          type: "actionEdge",
          animated: false,
          data: { onButtonClick: handleOpenSheet },
        };

        const combinedEdges = () => {
          return [
            ...updatedEdges,
            ...currentEdges.filter(
              (edge) =>
                !edge.id.startsWith("n") ||
                edge.target === primaryActionID.current,
            ),
            initialEdge,
            newEdge,
          ].filter(
            (edge, index, self) =>
              index === self.findIndex((e) => e.id === edge.id),
          );
        };
        // Usage
        return combinedEdges();
      });
    },
    [], //handleOpenSheet old
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const [editWorkFolder] = useEditFolderMutation(undefined);

  const handleSave = async () => {
    try {
      const workflowData: GetEditFolderPayload = {
        id: workflowID,
        name: inputValue,
      };
      await editWorkFolder(workflowData).unwrap();
      setWorkName(inputValue);
      setOpenWorkName(!openWorkName);

      // If no errors are thrown, consider it successful
      toast({
        title: "Workflow renamed successfully",
        variant: "success",
      });
    } catch (e: unknown) {
      toast({
        title: "Workflow rename failed",
        variant: "destructive",
        description: "An unknown error occurred",
      });
      getErrorMessage(e);
    }
  };

  const edgeTypes = {
    actionEdge: ActionEdge,
    defaultEdge: DefaultEdge,
  };

  const handleAddNodeClick = (node: Node, isEdit?: boolean) => {
    if (isEdit) {
      updateNode(node as IActionNode | ITriggerNode);
    } else {
      AddNode(node);
    }
    setOpenSheet(false);
  };
  const handleAddActionNodeClick = (node: Node, isEdit?: boolean) => {
    if (isEdit) {
      updateNode(node as IActionNode | ITriggerNode);
    } else {
      AddActionNode(node);
    }
    setOpenSheet(false);
  };

  // INTEGRATION PART
  const filterSchema = z.object({
    filter: z.string().min(1, { message: "filter is required" }),
    value: z.string().min(1, { message: "value is required" }),
  });

  const contentSchema = z.object({
    filters: z.array(filterSchema).optional(),
  });
  const actionFilterSchema = z.object({
    subject: z.string().min(1, { message: "Subject is required" }).optional(),
    message: z.string().min(1, { message: "Message is required" }).optional(),
  });

  const triggerSchema = z.object({
    id: z.string().min(1, "Trigger ID is required"),
    title: z.string().min(1, "Trigger name is required"),
    node_name: z.string().min(1, "Node name is required"),
    node_type_id: z.string().min(1, "Node Type ID is required"),
    content: contentSchema,
  });

  const actionSchema = z.object({
    id: z.string().min(1, "Trigger ID is required"),
    title: z.string().min(1, "Trigger name is required"),
    node_name: z.string().min(1, "Node name is required"),
    node_type_id: z.string().min(1, "Node Type ID is required"),
    content: actionFilterSchema,
  });

  const formSchema = z.object({
    id: z.string().min(4, "Invalid ID"),
    trigger: z.array(triggerSchema),
    action: z.array(actionSchema),
  });

  /*  console.log("edges", edges);
    console.log("nodes", nodes);*/
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: workflowID,
      trigger: [
        {
          id: "",
          title: "",
          node_name: "",
          node_type_id: "",
          content: {
            filters: [
              {
                filter: "",
                value: "",
              },
            ],
          },
        },
      ],
      action: [
        {
          id: "",
          title: "",
          node_name: "",
          node_type_id: "",
          content: {
            subject: "",
            message: "",
          },
        },
      ],
    },
  });

  const [saveWorkflow] = useSaveWorkflowMutation();
  const SaveWorkflow = async () => {
    try {
      const existingActionNodes = nodes.filter(
        (n) => n.type === "actionNode" && n.id !== "a0",
      );

      const existingTriggerNodes = nodes.filter(
        (n) => n.type === "triggerNode" && n.id !== "n0",
      );

      if (existingTriggerNodes.length > 0) {
        const triggers = existingTriggerNodes.map(
          (node) => node.data as z.infer<typeof triggerSchema>,
        );
        form.setValue("trigger", triggers); // Assuming trigger can accept an array
      }

      // Set values for all action nodes
      if (existingActionNodes.length > 0) {
        const actions = existingActionNodes.map(
          (node) => node.data as z.infer<typeof actionSchema>,
        );
        form.setValue("action", actions); // Assuming action can accept an array
      }

      /*
            await createWorkflow(form.getValues()).unwrap();
      */

      const response = await saveWorkflow(form.getValues()).unwrap();

      if ((response as { name: string }).name) {
        // Handle successful submission
        toast({
          title: "Workflow saved Successfully",
          description: "New workflow has been saved.",
          variant: "success",
        });
        form.reset();
      } else {
        // Handle submission failure
        toast({
          title: "Saving of Workflow Failed",
          description: "Failed to save workflow",
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

  /*  const hasInitialized = useRef(false);

  useEffect(() => {
    // && !hasInitialized.current add this to condition --default
    if (!isLoading && workflow && !hasInitialized.current) {
      initializeSampleData();
      hasInitialized.current = true; // Mark as initialized
    }
  }, [workflow, isLoading]);*/

  /*  const clearWorkflow = () => {
      setEdges([]); // Clear edges
      setNodes([]); // Clear nodes
    };*/

  const initializeSampleData = () => {
    if (workflow) {
      // Handle triggers
      const combinedNodes = [...triggerNodes, ...actionNodes];
      setNodes(combinedNodes);

      if (workflow.trigger.length + workflow.action.length === 0) {
        setEdges([initialEdge]);
      }

      workflow.trigger.map((trigger) => {
        const triggerTemplate: Node = {
          id: trigger.id,
          type: "triggerNode",
          data: {
            title: trigger.title,
            node_name: trigger.node_name,
            node_type_id: trigger.node_type_id,
            onButtonClick: () => {
              showNodeData(triggerTemplate as ITriggerNode);
            },
            content: trigger.content,
          },
          position: { x: 200, y: 0 },
        };
        AddNode(triggerTemplate);
        return triggerTemplate;
      });

      // Handle actions
      workflow.action.map((action) => {
        const actionTemplate = {
          id: action.id,
          type: "actionNode",
          data: {
            title: action.title,
            node_name: action.node_name,
            node_type_id: action.node_type_id,
            onButtonClick: () => {
              showNodeData(actionTemplate as IActionNode);
            },
            content: action.content,
          },
          position: { x: 400, y: 0 },
        };
        InitializeActionNode(actionTemplate);
        return actionTemplate;
      });

      /*      if (workflow.action.length === 0) {
       setEdges((prevState) => [...prevState, initialEdge]);
      }*/
    }
  };

  // this certain code is for publish
  useEffect(() => {
    setIsPublished(workflow?.isPublished);
    initializeSampleData();
  }, [workflow]);

  const [publishWorkflow] = usePublishWorkflowMutation();
  const [isPublished, setIsPublished] = useState(workflow?.isPublished);

  const handlePublish = async () => {
    try {
      const response = await publishWorkflow({
        id: workflowID,
        //published: isPublished ? "false" : "true",
        published: !workflow?.isPublished,
      }).unwrap();

      const result: string = !isPublished ? "Published" : "Unpublished";
      if ((response as { name: string }).name) {
        setIsPublished(!isPublished); // Toggle the local state
        // Handle successful submission

        toast({
          title: `${result} Successfully`,
          description: `Workflow has been ${result}.`,
          variant: "success",
        });
        form.reset();
      } else {
        // Handle submission failure
        toast({
          title: "Failed",
          description: `Failed to ${result} workflow`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Publish Workflow Error",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  };
  // console.log(hasInitialized);

  //console.log(nodes, edges);

  return (
    <div className="m-4 h-full rounded-xl bg-white px-4">
      <div className="border-5 h-[725px] w-full border-gray-900">
        <div className="flex w-full items-center justify-between gap-2 rounded-md bg-white p-4">
          <Link href="/dashboard/workflows" passHref>
            <Button variant="outline">Return Hub</Button>
          </Link>
          <div className="flex space-x-2">
            <p className="font-semibold">Workflow: {workflow?.name}</p>
            <Dialog open={openWorkName} onOpenChange={setOpenWorkName}>
              <DialogTrigger>
                <Edit className="size-6 cursor-pointer stroke-current" />
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Change Workflow Name</DialogTitle>

                <DialogDescription className="hidden" />
                <Separator />
                <Input placeholder={workName} onChange={handleInputChange} />
                <Button onClick={handleSave}>Save</Button>
              </DialogContent>
            </Dialog>
          </div>

          <div className="right-5 flex items-center space-x-4">
            <Button className="rounded px-4" onClick={SaveWorkflow}>
              Save
            </Button>
            {/*          <Button className="rounded px-4" onClick={SaveWorkflow}>
            Publish
          </Button>*/}
            <div className="flex items-center space-x-2">
              <p className="font-poppins text-[14px] font-semibold text-slate-600">
                Publish
              </p>
              <Switch
                className="bg-primary"
                defaultChecked={isPublished}
                /*                onCheckedChange={() => {
                  setIsPublished(!isPublished);
                }}*/
                checked={isPublished}
                onClick={handlePublish}
              />
            </div>
          </div>
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <SidebarSelection
            ref={sidebarRef}
            openSheet={openSheet}
            isTriggers={isTriggers}
            setOpenSheet={setOpenSheet}
            addActionNode={handleAddActionNodeClick}
            addTriggerNode={handleAddNodeClick}
            deleteNode={deleteNode}
          />
          <Background className="rounded-xl !bg-slate-200" />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}
