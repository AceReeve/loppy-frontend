import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";
import { type UniqueIdentifier } from "@dnd-kit/core";
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
import { GripVerticalIcon } from "lucide-react";
import { type Lead, type Opportunity } from "../page";

export interface PipelineOpportunityProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  opportunity: Opportunity | null;
  onAddLead: (containerId: UniqueIdentifier, data: Lead) => void;
}

// schemas
const FormSchema = z.object({
  description: z.string().min(1, { message: "Required" }),
  category: z.string().min(1, { message: "Required" }),
  amount: z
    .string()
    .min(1, { message: "Required" })
    .refine((val) => !isNaN(Number(val)), { message: "Must be a number" }),
});

export default function PipelineOpportunity({
  id,
  children,
  opportunity,
  onAddLead,
}: PipelineOpportunityProps) {
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
      description: "",
      category: "",
      amount: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newData = {
      ...data,
      amount: Number(data.amount),
      id: `item-${makeid(5)}`,
      itemOrder: opportunity ? opportunity.leads.length + 1 : 1,
    };
    onAddLead(id, newData);
  }

  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "container",
    },
  });
  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "col-span-1 flex h-full w-full cursor-default flex-col gap-y-4 rounded-xl",
        isDragging && "opacity-50",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="mb-auto mt-2 min-h-[70px] w-full content-center rounded-2xl border-4 border-t-blue-600 bg-white px-5  py-2 shadow-xl drop-shadow-lg ">
          <h1 className="flex content-center items-center font-roboto text-[14px] font-medium">
            <span className="cursor-move" {...listeners}>
              <GripVerticalIcon size={16} />
            </span>
            {opportunity?.title}
          </h1>
          <div className="my-1 border-b-2" />
          <h1 className=" font-roboto text-[14px] font-medium">
            {" "}
            <span className="text-[14px] text-gray-400">
              {opportunity?.leads.length} Leads{" "}
            </span>{" "}
            ${opportunity?.leads.reduce((sum, item) => sum + item.amount, 0)}
          </h1>
        </div>
      </div>

      {children}

      <Dialog>
        <DialogTrigger asChild>
          <button
            className="w-full border-2 border-dashed border-fuchsia-950 py-5 text-fuchsia-950 hover:border-solid hover:bg-gray-200"
            type="button"
          >
            + Add New Lead
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>{opportunity?.title}</DialogTitle>
                <DialogDescription>
                  Add a new lead to this opportunity
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Facebook Lead" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
