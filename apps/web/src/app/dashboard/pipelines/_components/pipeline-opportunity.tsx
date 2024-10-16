import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from "@repo/ui/components/ui";
import { EllipsisVertical, GripVerticalIcon } from "lucide-react";
import { useCreateLeadMutation } from "@repo/redux-utils/src/endpoints/pipelines";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { type Lead, type Opportunity } from "../page";
import DeleteOpportunity from "./delete-opportunity";
import UpdateOpportunity from "./update-opportunity";

export interface PipelineOpportunityProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  opportunity: Opportunity | null;
  onAddLead: (containerId: UniqueIdentifier, data: Lead) => void;
  onDeleteOpportunity: (containerId: UniqueIdentifier) => void;
  onUpdateOpportunity: (
    containerId: UniqueIdentifier,
    data: Opportunity,
  ) => void;
}

// schemas
const FormSchema = z.object({
  master: z.string().min(1, { message: "Required" }),
  description: z.string().min(1, { message: "Required" }),
  category: z.string().min(1, { message: "Required" }),
  amount: z
    .string()
    .min(1, { message: "Required" })
    .refine((val) => !isNaN(Number(val)), { message: "Must be a number" }),
  status: z.string().min(1, { message: "Required" }),
});

export default function PipelineOpportunity({
  id,
  children,
  opportunity,
  onAddLead,
  onDeleteOpportunity,
  onUpdateOpportunity,
}: PipelineOpportunityProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      master: "",
      description: "",
      category: "",
      amount: "",
      status: "",
    },
  });

  const [isCreateLeadOpen, setIsCreateLeadOpen] = useState(false);
  const [sendRequest, { isLoading }] = useCreateLeadMutation();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const newData = {
      ...data,
      opportunity_id: opportunity?._id ?? "",
      amount: Number(data.amount),
    };

    await sendRequest(newData)
      .unwrap()
      .then((res: unknown) => {
        const response = structuredClone(res) as Lead;

        if (response.amount) {
          response.amount = Number(response.amount);
        }
        response.id = `item-${response._id ?? "unknown"}`;

        onAddLead(id, response);

        toast({
          description: "Lead added successfully",
        });
        form.reset();
        setIsCreateLeadOpen(false);
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

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

  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

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
        <div
          className="mb-auto mt-2 min-h-[70px] w-full content-center rounded-2xl border-4 bg-white px-5 py-2 shadow-xl drop-shadow-lg"
          style={{
            borderTopColor: opportunity?.color ?? "#03a9f4",
          }}
        >
          <div className="flex items-center justify-between">
            <h1 className="flex content-center items-center font-roboto text-[14px] font-medium">
              <span className="cursor-move" {...listeners}>
                <GripVerticalIcon size={16} />
              </span>
              {opportunity?.title}
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="p-0 px-2" variant="ghost" size="sm">
                  <EllipsisVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      setIsEditDialogOpen(true);
                    }}
                  >
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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

      <Dialog
        open={isCreateLeadOpen}
        onOpenChange={() => {
          setIsCreateLeadOpen(!isCreateLeadOpen);
        }}
      >
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
                  name="master"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Master</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger variant="outline">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Stalled">Stalled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <UpdateOpportunity
        opportunity={opportunity}
        onUpdateOpportunity={onUpdateOpportunity}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
        }}
      />
      <DeleteOpportunity
        opportunity={opportunity}
        onDeleteOpportunity={onDeleteOpportunity}
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
        }}
      />
    </div>
  );
}
