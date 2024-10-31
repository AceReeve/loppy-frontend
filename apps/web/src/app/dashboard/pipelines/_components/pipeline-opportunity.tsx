import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";
import { type UniqueIdentifier } from "@dnd-kit/core";
import ReactSelectCreate from "react-select/creatable";
import ReactSelect from "react-select";
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
  Separator,
  toast,
} from "@repo/ui/components/ui";
import { EllipsisVertical, GripVerticalIcon } from "lucide-react";
import { useCreateLeadMutation } from "@repo/redux-utils/src/endpoints/pipelines";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useGetAllUsersQuery } from "@repo/redux-utils/src/endpoints/user";
import { useGetAllContactQuery } from "@repo/redux-utils/src/endpoints/contacts";
import { type Lead, type Opportunity } from "../page";
import DeleteOpportunity from "./delete-opportunity";
import UpdateOpportunity from "./update-opportunity";

export interface PipelineOpportunityProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  pipelineId: string;
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
  owner_id: z.string().min(1, { message: "Required" }),
  primary_contact_name_id: z.string().min(1, { message: "Required" }),
  opportunity_name: z.string().min(1, { message: "Required" }),
  opportunity_source: z.string().min(1, { message: "Required" }),
  status: z.string().min(1, { message: "Required" }),
  opportunity_value: z
    .string()
    .min(1, { message: "Required" })
    .refine((val) => !isNaN(Number(val)), { message: "Must be a number" }),
  primary_email: z.string(),
  primary_phone: z.string(),
  additional_contacts: z.string(),
  followers: z.string(),
  business_name: z.string(),
  tags: z.array(z.string()),
});

export default function PipelineOpportunity({
  id,
  children,
  pipelineId,
  opportunity,
  onAddLead,
  onDeleteOpportunity,
  onUpdateOpportunity,
}: PipelineOpportunityProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      owner_id: "",
      primary_contact_name_id: "",
      opportunity_name: "",
      opportunity_source: "",
      status: "",
      opportunity_value: "",
      primary_email: "",
      primary_phone: "",
      additional_contacts: "",
      followers: "",
      business_name: "",
      tags: [],
    },
  });

  const [isCreateLeadOpen, setIsCreateLeadOpen] = useState(false);
  const [sendRequest, { isLoading }] = useCreateLeadMutation();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const newData = {
      ...data,
      stage_id: opportunity?._id ?? "",
      pipeline_id: pipelineId,
      opportunity_value: Number(data.opportunity_value),
    };

    await sendRequest(newData)
      .unwrap()
      .then((res: unknown) => {
        const response = structuredClone(res) as Lead;

        if (response.opportunity_value) {
          response.opportunity_value = Number(response.opportunity_value);
        }
        response.id = `item-${response._id ?? "unknown"}`;

        onAddLead(id, response);

        toast({
          description: "Opportunity added successfully",
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

  const { data: users } = useGetAllUsersQuery(undefined);
  const { data: contacts } = useGetAllContactQuery(undefined);

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "flex h-full w-full cursor-default flex-col gap-y-4 rounded-xl",
        isDragging && "opacity-50",
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className="shadow- mb-auto mt-2 min-h-[70px] w-full content-center rounded-2xl border-4 bg-white px-5 py-2 drop-shadow-lg"
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
                <Button className="p-0 px-1" variant="ghost" size="sm">
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
          <h1 className=" flex justify-between font-roboto text-[14px] font-medium">
            {" "}
            <span className="text-[14px] text-gray-400">
              {opportunity?.leads.length} Leads{" "}
            </span>{" "}
            <span>
              $
              {opportunity?.leads.reduce(
                (sum, item) => sum + item.opportunity_value,
                0,
              )}
            </span>
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
            + Add New Opportunity
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[800px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>{opportunity?.title}</DialogTitle>
                <DialogDescription>
                  Add a new opportunity to this stage
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="opportunity_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opportunity Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="HVAC Pricing Survey" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status *</FormLabel>
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
                    name="opportunity_value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opportunity Value *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="1800" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="owner_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner *</FormLabel>
                        <FormControl>
                          <ReactSelect
                            options={users}
                            styles={{
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- temp
                              control: (provided) => ({
                                ...provided,
                                borderRadius: "12px",
                                borderColor: "#ddd",
                                boxShadow: "none",
                                "&:active": {
                                  borderColor: "#aaa",
                                },
                              }),
                            }}
                            value={users?.find(
                              (option) => option.value === field.value,
                            )}
                            onChange={(selectedOption) => {
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- temp
                              field.onChange(selectedOption?.value);
                            }}
                            onBlur={field.onBlur}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="opportunity_source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opportunity Source *</FormLabel>
                        <FormControl>
                          <Input placeholder="Facebook Lead" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="business_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="ServiHero" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="followers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Followers</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <ReactSelectCreate
                            styles={{
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- temp
                              control: (provided) => ({
                                ...provided,
                                borderRadius: "12px",
                                borderColor: "#ddd",
                                boxShadow: "none",
                                "&:active": {
                                  borderColor: "#aaa",
                                },
                              }),
                            }}
                            isMulti
                            value={field.value.map((tag) => ({
                              value: tag,
                              label: tag,
                            }))}
                            onChange={(selectedOptions) => {
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment -- temp,
                              const values = selectedOptions.map(
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access -- temp
                                (option) => option.value,
                              );
                              field.onChange(values);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <h4 className="col-span-2 font-bold">Contact Details</h4>
                  <Separator className="col-span-2" />
                  <FormField
                    control={form.control}
                    name="primary_contact_name_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Contact Name *</FormLabel>
                        <FormControl>
                          <ReactSelect
                            options={contacts}
                            styles={{
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- temp
                              control: (provided) => ({
                                ...provided,
                                borderRadius: "12px",
                                borderColor: "#ddd",
                                boxShadow: "none",
                                "&:active": {
                                  borderColor: "#aaa",
                                },
                              }),
                            }}
                            value={contacts?.find(
                              (option) => option.value === field.value,
                            )}
                            onChange={(selectedOption) => {
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- temp
                              field.onChange(selectedOption?.value);
                            }}
                            onBlur={field.onBlur}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="primary_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="primary_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additional_contacts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Contacts</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
