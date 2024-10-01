"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
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
} from "@repo/ui/components/ui";
import dynamic from "next/dynamic";

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
  id: UniqueIdentifier;
  title: string;
  itemOrder: number;
  leads: Lead[];
}

export interface Lead {
  id: UniqueIdentifier;
  description: string;
  category: string;
  itemOrder: number;
  amount: number;
}

// schemas
const FormSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
});

export default function Home() {
  const makeid = (length: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newData = {
      ...data,
      id: `opportunity-${makeid(5)}`,
      itemOrder: opportunities.length + 1,
      leads: [],
    };

    onAddOpportunity(newData);

    form.reset();
  }

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: `opportunity-${makeid(5)}`,
      title: "Survery Filled Out",
      itemOrder: 1,
      leads: [
        {
          id: `item-${makeid(5)}`,
          description: "HVAC Pricing Servey",
          category: "Facebook Lead",
          itemOrder: 1,
          amount: 1800,
        },
        {
          id: `item-${makeid(5)}`,
          description: "HVAC Pricing Servey",
          category: "Facebook Lead",
          itemOrder: 2,
          amount: 500,
        },
      ],
    },
    {
      id: `opportunity-${makeid(5)}`,
      title: "Customer Responded",
      itemOrder: 2,
      leads: [
        {
          id: `item-${makeid(5)}`,
          description: "HVAC Pricing Servey",
          category: "Facebook Lead",
          itemOrder: 1,
          amount: 1000,
        },
        {
          id: `item-${makeid(5)}`,
          description: "HVAC Pricing Servey",
          category: "Facebook Lead",
          itemOrder: 2,
          amount: 500,
        },
      ],
    },
    {
      id: `opportunity-${makeid(5)}`,
      title: "Follow Up",
      itemOrder: 3,
      leads: [],
    },
    {
      id: `opportunity-${makeid(5)}`,
      title: "Booked Lead",
      itemOrder: 4,
      leads: [],
    },
    {
      id: `opportunity-${makeid(5)}`,
      title: "Sold Lead",
      itemOrder: 5,
      leads: [],
    },
  ]);
  const [preservedOpportunities, setPreservedOpportunities] = useState<
    Opportunity[]
  >([]);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const onAddOpportunity = (data: Opportunity) => {
    setOpportunities([...opportunities, data]);
  };

  const onAddLead = (opportunityId: UniqueIdentifier, data: Lead) => {
    // const leadName = "Lead 1";
    // const id = `item-${makeid(5)}`;
    const opportunity = opportunities.find((item) => item.id === opportunityId);
    if (!opportunity) return;
    opportunity.leads.push(data);
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
    );

    if (output.length > 0) {
      // eslint-disable-next-line no-console -- TODO: Remove no-console
      console.log(output);
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
          updatedOpps.push(opp);
        }
      } else if (opp.leads.length !== prev[index].leads.length) {
        // Check if the length of leads has changed
        if (!updatedOpps.some((existingOpp) => existingOpp.id === opp.id)) {
          updatedOpps.push(opp);
        }
      } else {
        // Check if the ID of leads has changed
        opp.leads.forEach((lead, leadIndex) => {
          if (lead.id !== prev[index].leads[leadIndex].id) {
            if (!updatedOpps.some((existingOpp) => existingOpp.id === opp.id)) {
              updatedOpps.push(opp);
            }
          }
        });
      }
    });

    return updatedOpps;
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
          <Dialog>
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
                  <div>
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
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mx-auto w-full py-10">
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
                          <PipelineLead lead={i} id={i.id} key={i.id} />
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
                    <PipelineLead id={activeId} lead={findLead(activeId)} />
                  )
                : null}
              {/* Drag Overlay For Opportunity */}
              {activeId
                ? activeId.toString().includes("opportunity") && (
                    <PipelineOpportunity
                      id={activeId}
                      opportunity={findOpportunity(activeId)}
                      onAddLead={onAddLead}
                    >
                      {findOpportunityLeads(activeId).map((i) => (
                        <PipelineLead key={i.id} lead={i} id={i.id} />
                      ))}
                    </PipelineOpportunity>
                  )
                : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
