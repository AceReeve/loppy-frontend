"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  DndContext,
  type DragEndEvent,
  type DragMoveEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  type UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  toast,
} from "@repo/ui/components/ui";
import dynamic from "next/dynamic";
import { CirclePicker, type ColorResult } from "react-color";
import {
  useCreateOpportunityMutation,
  useGetAllPipelinesQuery,
  useGetPipelineQuery,
  useUpdateLeadStatusMutation,
  useUpdateOpportunitiesMutation,
} from "@repo/redux-utils/src/endpoints/pipelines";
import {
  type CreateOpportunityPayload,
  type UpdateOpportunitiesPayload,
} from "@repo/redux-utils/src/endpoints/types/pipelines";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { Pipette } from "lucide-react";
import { ArrowDown2 } from "iconsax-react";
// eslint-disable-next-line import/no-named-as-default -- Using exported name 'ReactConfetti' as identifier for default import.(import/no-named-as-default)
import ReactConfetti from "react-confetti";
import PipelineStatus from "@/src/app/dashboard/pipelines/_components/pipeline-status.tsx";
import CreatePipeline from "./_components/create-pipeline";
import ExportPipelines from "./_components/export-pipelines";
import ImportPipelines from "./_components/import-pipelines";
import DeletePipeline from "./_components/delete-pipeline";

const PipelineOpportunity = dynamic(
  () => import("./_components/pipeline-opportunity"),
  {
    ssr: false,
  },
);

const PipelineLead = dynamic(() => import("./_components/pipeline-lead"), {
  ssr: false,
});

export interface Opportunity {
  _id?: string;
  id: UniqueIdentifier;
  title: string;
  color: string;
  lead_value: number;
  itemOrder: number;
  leads: Lead[];
}

export interface OpportunityWithoutId {
  _id?: string;
  title: string;
  itemOrder: number;
  leads: Lead[];
}

export interface Lead {
  _id?: string;
  id: UniqueIdentifier;
  owner_id?: Owner;
  stage_id?: string;
  pipeline_id?: string;
  primary_contact_name_id?: string;
  opportunity_name: string;
  opportunity_source: string;
  status: string;
  opportunity_value: number;
  primary_contact_name?: string;
  primary_email?: string;
  primary_phone?: string;
  additional_contacts?: string;
  followers?: string;
  business_name?: string;
  tags?: string[];
  created_at?: string;
}

interface Owner {
  _id: string;
  email: string;
  name: string;
}

// schemas
const FormSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  color: z.string().min(1, { message: "Required" }),
});

export default function Home() {
  const [isPipelineImportOpen, setIsPipelineImportOpen] = useState(false);
  const [isPipelineExportOpen, setIsPipelineExportOpen] = useState(false);
  const [isPipelineDeleteOpen, setIsPipelineDeleteOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const {
    data: pipelines = [],
    isFetching: pipelinesIsLoading,
    refetch: refetchPipelines,
  } = useGetAllPipelinesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    skip: false,
  });

  // State to hold the selected pipeline ID
  const [selectedPipelineId, setSelectedPipelineId] = useState("");

  // Fetch pipeline data based on the selected pipeline ID
  const {
    data: pipeline,
    refetch: refetchPipeline,
    isFetching: pipelineIsLoading,
  } = useGetPipelineQuery(
    { pipelineId: selectedPipelineId },
    {
      skip: !selectedPipelineId, // Skip query until a pipeline is selected
    },
  );

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [preservedOpportunities, setPreservedOpportunities] = useState<
    Opportunity[]
  >([]);
  const [isDragging, setIsDragging] = useState(false);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const pipelineStatus = [
    {
      id: "status-area-1",
      description: "Lost",
    },
    {
      id: "status-area-2",
      description: "Abandoned",
    },
    {
      id: "status-area-3",
      description: "Won",
    },
  ];

  // Handle the select change event
  const handlePipelineChange = (value: string) => {
    setSelectedPipelineId(value);
  };

  useEffect(() => {
    if (!selectedPipelineId) {
      if (pipelines.length > 0) {
        setSelectedPipelineId(pipelines[0]._id);
      }
    } else if (pipelines.length > 0) {
      if (selectedPipelineId !== pipelines[0]._id) {
        setSelectedPipelineId(pipelines[0]._id);
      }
    } else {
      setSelectedPipelineId("");
    }
  }, [pipelines]);

  useEffect(() => {
    if (selectedPipelineId) {
      void refetchPipeline();
    }
  }, [selectedPipelineId, refetchPipeline]);

  useEffect(() => {
    if (pipeline) {
      const mutableData = pipeline.opportunities.map((item) => ({
        ...item,
        leads: item.leads.map((lead) => ({ ...lead })),
      }));

      setOpportunities(mutableData);
    }
  }, [pipeline]);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000); // Wait for 3 seconds

      // Cleanup function to clear the timer if the component unmounts or showConfetti changes
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showConfetti, setShowConfetti]);

  const onAddOpportunity = (data: Opportunity) => {
    setOpportunities([...opportunities, data]);
  };

  // create opportunity
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      color: "#03a9f4",
    },
  });

  const [isCreateOpportunityOpen, setIsCreateOpportunityOpen] = useState(false);

  const [createOpportunityRequest, { isLoading: isLoadingCreateOpportunity }] =
    useCreateOpportunityMutation();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!selectedPipelineId) {
      toast({
        description: "Please create a pipeline first before creating a stage",
      });
      return;
    }

    const newData = {
      ...data,
      itemOrder: opportunities.length + 1,
      pipeline_id: selectedPipelineId,
      lead_value: 0,
    } as CreateOpportunityPayload;

    await createOpportunityRequest(newData)
      .unwrap()
      .then((res: unknown) => {
        const response = structuredClone(res) as Opportunity;

        response.id = `opportunity-${response._id ?? "opportunity-unknown"}`;

        onAddOpportunity(response);

        toast({
          description: "Stage added successfully",
        });
        form.reset();
        setIsCreateOpportunityOpen(false);
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  // update opportunities
  const [updateOpportunutiesRequest] = useUpdateOpportunitiesMutation();
  const updateOpps = async (data: UpdateOpportunitiesPayload) => {
    await updateOpportunutiesRequest(data)
      .unwrap()
      .then(() => {
        toast({
          description: "Pipeline updated successfully",
        });
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  const onUpdateOpportunity = (id: UniqueIdentifier, data: Opportunity) => {
    const opportunity = opportunities.find((item) => item.id === id);
    if (!opportunity) return;
    opportunity.title = data.title;
    opportunity.color = data.color;
    opportunity.lead_value = data.lead_value;
    opportunity.itemOrder = data.itemOrder;
    setOpportunities([...opportunities]);
  };

  const onDeleteOpportunity = (id: UniqueIdentifier) => {
    const opportunity = opportunities.find((item) => item.id === id);
    if (!opportunity) return;
    setOpportunities(opportunities.filter((item) => item.id !== id));
  };

  const onAddLead = (opportunityId: UniqueIdentifier, data: Lead) => {
    const opportunity = opportunities.find((item) => item.id === opportunityId);
    if (!opportunity) return;
    opportunity.leads.push(data);

    setOpportunities([...opportunities]);
  };

  const onDeleteLead = (leadId: UniqueIdentifier) => {
    const opportunity = opportunities.find((item) =>
      item.leads.find((i) => i.id === leadId),
    );
    if (!opportunity) return;
    opportunity.leads = opportunity.leads.filter((item) => item.id !== leadId);
    setOpportunities([...opportunities]);
  };

  const onUpdateLead = (leadId: UniqueIdentifier, data: Lead) => {
    const opportunity = opportunities.find((item) =>
      item.leads.find((i) => i.id === leadId),
    );
    if (!opportunity) return;
    opportunity.leads = opportunity.leads.map((item) => {
      if (item.id === leadId) {
        return data;
      }
      return item;
    });
    setOpportunities([...opportunities]);
  };

  // Find the value of the items
  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === "opportunity") {
      return opportunities.find((item) => item.id === id);
    }
    if (type === "item") {
      return opportunities.find((opportunity) =>
        opportunity.leads.find((item) => item.id === id),
      );
    }
  }

  const findLead = (id: UniqueIdentifier | undefined) => {
    const opportunity = findValueOfItems(id, "item");
    if (!opportunity) return null;
    const item = opportunity.leads.find((i) => i.id === id);
    if (!item) return null;
    return item;
  };

  const findOpportunity = (id: UniqueIdentifier | undefined) => {
    const opportunity = findValueOfItems(id, "opportunity");
    if (!opportunity) return null;
    return opportunity;
  };

  const findOpportunityLeads = (id: UniqueIdentifier | undefined) => {
    const opportunity = findValueOfItems(id, "opportunity");
    if (!opportunity) return [];
    return opportunity.leads;
  };

  const [updateLeadStatus] = useUpdateLeadStatusMutation();
  const updateStatus = async (_id: string, leadStatus: string) => {
    const update = { id: _id, status: leadStatus };
    try {
      //const response = await updateLeadStatus(update).unwrap(); // Use unwrap to handle success/error
      await updateLeadStatus(update).unwrap(); // Use unwrap to handle success/error

      //console.log("Update successful:", response);
      if (leadStatus === "Won") {
        setShowConfetti(true);
      }
    } catch (error) {
      //console.error("Failed to update status:", error);
    }
  };

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
    setIsDragging(true);
    setPreservedOpportunities(structuredClone(opportunities));
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    // Handle Items Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active.id !== over.id
    ) {
      // Find the active opportunity and over opportunity
      const activeOpportunity = findValueOfItems(active.id, "item");
      const overOpportunity = findValueOfItems(over.id, "item");

      // If the active or over opportunity is not found, return
      if (!activeOpportunity || !overOpportunity) return;

      // Find the index of the active and over opportunity
      const activeOpportunityIndex = opportunities.findIndex(
        (opportunity) => opportunity.id === activeOpportunity.id,
      );
      const overOpportunityIndex = opportunities.findIndex(
        (opportunity) => opportunity.id === overOpportunity.id,
      );

      // Find the index of the active and over item
      const activeitemIndex = activeOpportunity.leads.findIndex(
        (item) => item.id === active.id,
      );
      const overitemIndex = overOpportunity.leads.findIndex(
        (item) => item.id === over.id,
      );
      // In the same opportunity
      if (activeOpportunityIndex === overOpportunityIndex) {
        const newItems = [...opportunities];
        newItems[activeOpportunityIndex].leads = arrayMove(
          newItems[activeOpportunityIndex].leads,
          activeitemIndex,
          overitemIndex,
        );

        setOpportunities(newItems);
      } else {
        // In different opportunities
        const newItems = [...opportunities];
        const [removeditem] = newItems[activeOpportunityIndex].leads.splice(
          activeitemIndex,
          1,
        );
        newItems[overOpportunityIndex].leads.splice(
          overitemIndex,
          0,
          removeditem,
        );
        setOpportunities(newItems);
      }
    }

    // Handling Item Drop Into a Opportunity
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("opportunity") &&
      active.id !== over.id
    ) {
      // Find the active and over opportunity
      const activeOpportunity = findValueOfItems(active.id, "item");
      const overOpportunity = findValueOfItems(over.id, "opportunity");

      // If the active or over opportunity is not found, return
      if (!activeOpportunity || !overOpportunity) return;

      // Find the index of the active and over opportunity
      const activeOpportunityIndex = opportunities.findIndex(
        (opportunity) => opportunity.id === activeOpportunity.id,
      );
      const overOpportunityIndex = opportunities.findIndex(
        (opportunity) => opportunity.id === overOpportunity.id,
      );

      // Find the index of the active and over item
      const activeitemIndex = activeOpportunity.leads.findIndex(
        (item) => item.id === active.id,
      );

      // Remove the active item from the active opportunity and add it to the over opportunity
      const newItems = [...opportunities];
      const [removeditem] = newItems[activeOpportunityIndex].leads.splice(
        activeitemIndex,
        1,
      );
      newItems[overOpportunityIndex].leads.push(removeditem);
      setOpportunities(newItems);
    }
  };

  // This is the function that handles the sorting of the opportunities and items when the user is done dragging.
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    let currentOpportunities: Opportunity[] | null = null;

    // Handling Opportunity Sorting
    if (
      active.id.toString().includes("opportunity") &&
      over?.id.toString().includes("opportunity") &&
      active.id !== over.id
    ) {
      // Find the index of the active and over opportunity
      const activeOpportunityIndex = opportunities.findIndex(
        (opportunity) => opportunity.id === active.id,
      );
      const overOpportunityIndex = opportunities.findIndex(
        (opportunity) => opportunity.id === over.id,
      );
      // Swap the active and over opportunity
      let newItems = [...opportunities];
      newItems = arrayMove(
        newItems,
        activeOpportunityIndex,
        overOpportunityIndex,
      );
      setOpportunities(newItems);
      currentOpportunities = newItems;
    }

    // Handling item Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active.id !== over.id
    ) {
      // Find the active and over opportunity
      const activeOpportunity = findValueOfItems(active.id, "item");
      const overOpportunity = findValueOfItems(over.id, "item");

      // If the active or over opportunity is not found, return
      if (!activeOpportunity || !overOpportunity) return;
      // Find the index of the active and over opportunity
      const activeOpportunityIndex = opportunities.findIndex(
        (opportunity) => opportunity.id === activeOpportunity.id,
      );
      const overOpportunityIndex = opportunities.findIndex(
        (opportunity) => opportunity.id === overOpportunity.id,
      );
      // Find the index of the active and over item
      const activeitemIndex = activeOpportunity.leads.findIndex(
        (item) => item.id === active.id,
      );
      const overitemIndex = overOpportunity.leads.findIndex(
        (item) => item.id === over.id,
      );

      // In the same opportunity
      if (activeOpportunityIndex === overOpportunityIndex) {
        const newItems = [...opportunities];
        newItems[activeOpportunityIndex].leads = arrayMove(
          newItems[activeOpportunityIndex].leads,
          activeitemIndex,
          overitemIndex,
        );
        setOpportunities(newItems);
        currentOpportunities = newItems;
      } else {
        // In different opportunities
        const newItems = [...opportunities];
        const [removeditem] = newItems[activeOpportunityIndex].leads.splice(
          activeitemIndex,
          1,
        );
        newItems[overOpportunityIndex].leads.splice(
          overitemIndex,
          0,
          removeditem,
        );
        setOpportunities(newItems);
        currentOpportunities = newItems;
      }
    }

    // Handling item dropping into status
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("status") &&
      active.id !== over.id
    ) {
      // Find the active and over opportunity
      const activeOpportunity = findValueOfItems(active.id, "item");

      // If the active or over opportunity is not found, return
      if (!activeOpportunity) return;
      // Find the index of the active and over opportunity

      // Find the index of the active and over item
      const activeitemIndex = activeOpportunity.leads.findIndex(
        (item) => item.id === active.id,
      );

      const removeItemPrefix = (itemId: string) => {
        return itemId.replace(/^item-/, "");
      };

      /*      const lead = updateStatus(active.id.toString(), over.id.toString());
      console.log(lead);*/

      const getStatusDescription = (id: string) => {
        const status = pipelineStatus.find((item) => item.id === id);
        return status ? status.description : null; // Return the description or null if not found
      };

      const overDescription = getStatusDescription(over.id.toString());
      if (overDescription !== null) {
        const cleanId: string = removeItemPrefix(active.id.toString());
        updateStatus(cleanId, overDescription)
          .then(() => {
            //Set handling
            const lead = activeOpportunity.leads[activeitemIndex];
            lead.status = overDescription;
            // const newItems = [...opportunities];
            //onUpdateLead(lead.id, lead);
            setOpportunities([...opportunities]);

            currentOpportunities = [...opportunities];
          })
          .catch(() => {
            // Handle the error appropriately here
          });
        /*  const activeOpportunityIndex = opportunities.findIndex(
          (opportunity) => opportunity.id === activeOpportunity.id,
        );*/

        /*    const newItems = [...opportunities];


        newItems[activeOpportunityIndex].leads[activeitemIndex].status =
          overDescription;

        setOpportunities(newItems);
        currentOpportunities = newItems;

        console.log(newItems, opportunities);*/
      }
      // setOpportunities(updatedOpportunities);
    }
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("opportunity") &&
      active.id !== over.id
    ) {
      // Handling item dropping into Opportunity
      // Find the active and over opportunity
      const activeOpportunity = findValueOfItems(active.id, "item");
      const overOpportunity = findValueOfItems(over.id, "opportunity");

      // If the active or over opportunity is not found, return
      if (!activeOpportunity || !overOpportunity) return;
      // Find the index of the active and over opportunity
      const activeOpportunityIndex = opportunities.findIndex(
        (opportunity) => opportunity.id === activeOpportunity.id,
      );
      const overOpportunityIndex = opportunities.findIndex(
        (opportunity) => opportunity.id === overOpportunity.id,
      );
      // Find the index of the active and over item
      const activeitemIndex = activeOpportunity.leads.findIndex(
        (item) => item.id === active.id,
      );

      const newItems = [...opportunities];
      const [removeditem] = newItems[activeOpportunityIndex].leads.splice(
        activeitemIndex,
        1,
      );
      newItems[overOpportunityIndex].leads.push(removeditem);
      setOpportunities(newItems);
      currentOpportunities = newItems;
    }
    setActiveId(null);

    const output = getUpdatedOpportunities(
      preservedOpportunities,
      currentOpportunities ?? opportunities,
    ) as UpdateOpportunitiesPayload;

    if (output.updated_items.length > 0) {
      void updateOpps(output);
    }
    setIsDragging(false);
  }

  const getUpdatedOpportunities = (
    prev: Opportunity[],
    current: Opportunity[],
  ) => {
    const updatedOpps: Opportunity[] = [];

    const pipelineOpps = current.map((item) => item._id);

    current.forEach((opp, index) => {
      // Check if the ID of opportunities has changed
      if (opp.id !== prev[index].id) {
        if (!updatedOpps.some((existingOpp) => existingOpp.id === opp.id)) {
          opp.itemOrder = index + 1;
          updatedOpps.push(opp);
        }
      } else if (opp.leads.length !== prev[index].leads.length) {
        // Check if the length of leads has changed
        if (!updatedOpps.some((existingOpp) => existingOpp.id === opp.id)) {
          opp.itemOrder = index + 1;
          updatedOpps.push(opp);
        }
      } else {
        // Check if the ID of leads has changed
        opp.leads.forEach((lead, leadIndex) => {
          if (lead.id !== prev[index].leads[leadIndex].id) {
            if (!updatedOpps.some((existingOpp) => existingOpp.id === opp.id)) {
              opp.itemOrder = index + 1;
              updatedOpps.push(opp);
            }
          }
        });
      }
    });

    // get only the ids of leads
    const updatedData = updatedOpps.map((opportunity) => {
      return {
        ...opportunity,
        leads: opportunity.leads.map((lead) => lead._id),
      };
    });

    return {
      pipeline_id: selectedPipelineId,
      pipeline_opportunities: pipelineOpps,
      updated_items: updatedData,
    };
  };

  // const updateItemOrder = (op: Opportunity[]) => {
  //   // Update the itemOrder of opportunities
  //   op.forEach((o, index) => {
  //     o.itemOrder = index + 1;

  //     // Update the itemOrder of leads
  //     o.leads.forEach((lead, leadIndex) => {
  //       lead.itemOrder = leadIndex + 1;
  //     });
  //   });

  //   return op;
  // };

  const NoResultsComponent = (
    <div className="flex w-full flex-col items-center justify-center px-4 py-28">
      <div className="text-center font-montserrat text-4xl font-medium leading-[48px] text-gray-800">
        Supercharge Your Sales with a Winning Pipeline!
      </div>
      <div className="mt-4 max-w-[641px] text-center font-nunito text-sm font-normal leading-normal text-gray-700">
        A well-structured sales pipeline is your roadmap to success! By creating
        a pipeline, you gain clear visibility into your sales process, allowing
        you to manage leads more effectively and identify opportunities for
        improvement. It helps you prioritize tasks, forecast sales accurately,
        and ultimately close deals faster. Don’t leave your success to
        chance—build a sales pipeline and watch your revenue soar!
      </div>
      <img
        className="h-[149px] w-[126px]"
        src="/assets/icons/icon-no-data-contacts.svg"
        alt="No Data"
      />
    </div>
  );

  const NoOpportunitiesComponent = (
    <div className="col-span-5 flex w-full flex-col items-center justify-center px-4 py-28">
      <div className="text-center font-montserrat text-2xl font-medium leading-[48px] text-gray-800">
        Unlock Your Next Big Opportunity
      </div>
      <div className="text-center font-montserrat text-4xl font-medium leading-[48px] text-gray-800">
        Start Building Your Sales Pipeline Today!
      </div>
      <div className="mt-4 max-w-[641px] text-center font-nunito text-sm font-normal leading-normal text-gray-700">
        Don&apos;t miss out on potential leads. Take the first step in growing
        your business by creating an opportunity and filling your sales pipeline
        with valuable prospects.
      </div>
      <img
        className="h-[149px] w-[126px]"
        src="/assets/icons/icon-no-data-contacts.svg"
        alt="No Data"
      />
    </div>
  );

  // if (oppListIsLoading) {
  if (pipelinesIsLoading) {
    return (
      <div className="m-auto flex h-full flex-col items-center justify-center space-y-6 p-6">
        <LoadingSpinner />
        <p>Loading, please wait...</p>
      </div>
    );
  }
  const ConfettiWon = (
    <>
      <ReactConfetti className="w-full" />
      <h1 className="absolute inset-0 z-[100] flex items-center justify-center text-center text-7xl font-bold text-gray-400">
        Congratulations
      </h1>
    </>
  );

  return (
    <div className="rounded-xl bg-card p-10">
      {showConfetti ? ConfettiWon : null}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-end gap-3">
          <div className="font-poppins text-4xl font-medium text-gray-800">
            Pipelines
          </div>
          <Select
            value={selectedPipelineId}
            onValueChange={handlePipelineChange}
          >
            <SelectTrigger variant="outline" className="w-[180px]">
              <SelectValue placeholder="Select a pipeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pipelines</SelectLabel>
                {pipelines.map((pip) => (
                  <SelectItem key={pip._id} value={pip._id}>
                    {pip.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="gap-2 rounded-xl"
                variant="outline"
                disabled={!selectedPipelineId}
              >
                Actions
                <ArrowDown2
                  size={12}
                  variant="Bold"
                  className="stroke-current"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setIsPipelineImportOpen(true);
                }}
              >
                Import
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsPipelineExportOpen(true);
                }}
              >
                Export
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsPipelineDeleteOpen(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ImportPipelines
            isOpen={isPipelineImportOpen}
            onClose={() => {
              setIsPipelineImportOpen(false);
            }}
          />
          <ExportPipelines
            isOpen={isPipelineExportOpen}
            onClose={() => {
              setIsPipelineExportOpen(false);
            }}
          />
          <DeletePipeline
            isOpen={isPipelineDeleteOpen}
            onClose={() => {
              setIsPipelineDeleteOpen(false);
            }}
            pipelineId={selectedPipelineId}
            refetch={refetchPipelines}
          />
          <CreatePipeline />
        </div>

        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Search Opportunities"
            onInput={(e) => {
              setSearchQuery(e.currentTarget.value);
            }}
            value={searchQuery}
          />
          <Dialog
            open={isCreateOpportunityOpen}
            onOpenChange={() => {
              setIsCreateOpportunityOpen(!isCreateOpportunityOpen);
            }}
          >
            <DialogTrigger asChild>
              <Button variant="default" disabled={!selectedPipelineId}>
                + Stage
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Create Stage</DialogTitle>
                    <DialogDescription>
                      Create a new stage to your pipeline
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stage Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stage Color</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <Input
                                style={{
                                  backgroundColor: field.value,
                                }}
                                readOnly
                                {...field}
                              />
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    className={`bg-${field.value}`}
                                    variant="outline"
                                    size="icon"
                                  >
                                    <Pipette />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <CirclePicker
                                    onChangeComplete={(color: ColorResult) => {
                                      field.onChange(color.hex);
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isLoadingCreateOpportunity}>
                      Save
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* loading pipeline */}
      {pipelineIsLoading ? (
        <div className="m-auto flex h-full flex-col items-center justify-center space-y-6">
          <LoadingSpinner />
          <p>Loading, please wait...</p>
        </div>
      ) : null}
      {/* pipeline loaded */}
      <div className="mx-auto w-full py-10" hidden={pipelineIsLoading}>
        {pipelines.length > 0 ? (
          <div className="grid w-full grid-cols-[repeat(auto-fill,_minmax(300px,300px))] gap-6">
            {opportunities.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={opportunities.map((i) => i.id)}>
                  {opportunities.map((opportunity) => (
                    <PipelineOpportunity
                      id={opportunity.id}
                      pipelineId={selectedPipelineId}
                      opportunity={opportunity}
                      key={opportunity.id}
                      onAddLead={onAddLead}
                      onDeleteOpportunity={onDeleteOpportunity}
                      onUpdateOpportunity={onUpdateOpportunity}
                    >
                      <SortableContext
                        items={opportunity.leads.map((i) => i.id)}
                      >
                        {opportunity.leads
                          .filter((i) => {
                            return (
                              i.opportunity_name
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                              i.opportunity_source
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                              i.tags?.includes(searchQuery)
                            );
                          })
                          .map((i) => (
                            <PipelineLead
                              lead={i}
                              id={i.id}
                              key={i.id}
                              onDeleteLead={onDeleteLead}
                              onUpdateLead={onUpdateLead}
                            />
                          ))}
                      </SortableContext>
                    </PipelineOpportunity>
                  ))}
                </SortableContext>
                <DragOverlay adjustScale={false}>
                  {/* Drag Overlay For item Item */}
                  {activeId
                    ? activeId.toString().includes("item") && (
                        <PipelineLead
                          id={activeId}
                          lead={findLead(activeId)}
                          onDeleteLead={onDeleteLead}
                          onUpdateLead={onUpdateLead}
                        />
                      )
                    : null}
                  {/* Drag Overlay For Opportunity */}
                  {activeId
                    ? activeId.toString().includes("opportunity") && (
                        <PipelineOpportunity
                          id={activeId}
                          pipelineId={selectedPipelineId}
                          opportunity={findOpportunity(activeId)}
                          onAddLead={onAddLead}
                          onDeleteOpportunity={onDeleteOpportunity}
                          onUpdateOpportunity={onUpdateOpportunity}
                        >
                          {findOpportunityLeads(activeId).map((i) => (
                            <PipelineLead
                              key={i.id}
                              lead={i}
                              id={i.id}
                              onDeleteLead={onDeleteLead}
                              onUpdateLead={onUpdateLead}
                            />
                          ))}
                        </PipelineOpportunity>
                      )
                    : null}
                </DragOverlay>
                <div
                  className={` absolute bottom-10 right-0 flex h-[200px] w-full justify-center ${isDragging ? "flex" : "hidden"} gap-5`}
                >
                  {pipelineStatus.map((status) => (
                    <PipelineStatus
                      key={status.id}
                      id={status.id}
                      status={status.description}
                    />
                  ))}
                </div>
              </DndContext>
            ) : (
              NoOpportunitiesComponent
            )}
          </div>
        ) : (
          NoResultsComponent
        )}
      </div>
    </div>
  );
}
