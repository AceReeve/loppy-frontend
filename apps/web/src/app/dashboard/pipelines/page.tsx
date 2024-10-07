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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  toast,
} from "@repo/ui/components/ui";
import dynamic from "next/dynamic";
import {
  useCreateOpportunityMutation,
  useGetAllOpportunitiesQuery,
  useUpdateOpportunitiesMutation,
} from "@repo/redux-utils/src/endpoints/pipelines";
import {
  type CreateOpportunityPayload,
  type UpdateOpportunitiesPayload,
} from "@repo/redux-utils/src/endpoints/types/pipelines";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";

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
  master: string;
  description: string;
  category: string;
  status: string;
  amount: number;
  created_at?: string;
}

// schemas
const FormSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
});

export default function Home() {
  const { data: oppList, isFetching: oppListIsLoading } =
    useGetAllOpportunitiesQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      skip: false,
    });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [preservedOpportunities, setPreservedOpportunities] = useState<
    Opportunity[]
  >([]);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  useEffect(() => {
    if (oppList) {
      const mutableData = oppList.map((item) => ({
        ...item,
        leads: item.leads.map((lead) => ({ ...lead })),
      }));

      setOpportunities(mutableData);
    }
  }, [oppList]);

  const onAddOpportunity = (data: Opportunity) => {
    setOpportunities([...opportunities, data]);
  };

  // create opportunity
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  const [isCreateOpportunityOpen, setIsCreateOpportunityOpen] = useState(false);

  const [createOpportunityRequest, { isLoading: isLoadingCreateOpportunity }] =
    useCreateOpportunityMutation();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const newData = {
      ...data,
      itemOrder: opportunities.length + 1,
    } as CreateOpportunityPayload;

    await createOpportunityRequest(newData)
      .unwrap()
      .then((res: unknown) => {
        const response = structuredClone(res) as Opportunity;

        response.id = `opportunity-${response._id ?? "opportunity-unknown"}`;

        onAddOpportunity(response);

        toast({
          description: "Opportunity added successfully",
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
  const updateOpps = async (data: UpdateOpportunitiesPayload[]) => {
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
    // Handling item dropping into Opportunity
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
    ) as UpdateOpportunitiesPayload[];

    if (output.length > 0) {
      void updateOpps(output);
    }
  }

  const getUpdatedOpportunities = (
    prev: Opportunity[],
    current: Opportunity[],
  ) => {
    const updatedOpps: Opportunity[] = [];

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

    return updatedData;
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

  if (oppListIsLoading) {
    return (
      <div className="m-auto flex h-full flex-col items-center justify-center space-y-6">
        <LoadingSpinner />
        <p>Loading, please wait...</p>
      </div>
    );
  }

  return (
    <div className="m-10 rounded-xl bg-card p-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-end gap-3">
          <div className="font-poppins text-4xl font-medium text-gray-800">
            Pipelines
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Search Leads"
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
              <Button variant="default">+ Opportunity</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Create Opportunity</DialogTitle>
                    <DialogDescription>
                      Create a new opportunity to your pipeline
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
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

      <div className="mx-auto w-full py-10">
        {opportunities.length > 0 ? (
          <div className="grid w-full grid-cols-5 gap-6">
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
                    opportunity={opportunity}
                    key={opportunity.id}
                    onAddLead={onAddLead}
                    onDeleteOpportunity={onDeleteOpportunity}
                    onUpdateOpportunity={onUpdateOpportunity}
                  >
                    <SortableContext items={opportunity.leads.map((i) => i.id)}>
                      <div className="flex flex-col items-start gap-y-4">
                        {opportunity.leads
                          .filter((i) => {
                            if (
                              i.description
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                            ) {
                              return true;
                            }
                            return false;
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
                      </div>
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
            </DndContext>
          </div>
        ) : (
          NoResultsComponent
        )}
      </div>
    </div>
  );
}
