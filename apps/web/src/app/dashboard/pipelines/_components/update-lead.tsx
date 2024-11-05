import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ReactSelectCreate from "react-select/creatable";
import ReactSelect from "react-select";
import { z } from "zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { useUpdateLeadMutation } from "@repo/redux-utils/src/endpoints/pipelines";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { type UniqueIdentifier } from "@dnd-kit/core";
import { useGetAllUsersQuery } from "@repo/redux-utils/src/endpoints/user";
import { useGetAllContactQuery } from "@repo/redux-utils/src/endpoints/contacts";
import React from "react";
import { pipelineItems } from "@/src/app/dashboard/pipelines/_components/pipeline-items.tsx";
import { type Lead } from "../page";

interface UpdateLeadType {
  lead: Lead | null;
  onUpdateLead: (leadId: UniqueIdentifier, data: Lead) => void;
  isOpen: boolean;
  onClose: () => void;
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

export default function UpdateLead({
  lead,
  onUpdateLead,
  isOpen,
  onClose,
}: UpdateLeadType) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      owner_id: lead?.owner_id?._id ?? "",
      primary_contact_name_id: lead?.primary_contact_name_id ?? "",
      opportunity_name: lead?.opportunity_name ?? "",
      opportunity_source: lead?.opportunity_source ?? "",
      status: lead?.status ?? "",
      opportunity_value: lead?.opportunity_value.toString() ?? "",
      primary_email: lead?.primary_email ?? "",
      primary_phone: lead?.primary_phone ?? "",
      additional_contacts: lead?.additional_contacts ?? "",
      followers: lead?.followers ?? "",
      business_name: lead?.business_name ?? "",
      tags: lead?.tags ?? [],
    },
  });

  const [sendRequest, { isLoading }] = useUpdateLeadMutation();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const newData = {
      ...data,
      opportunity_value: Number(data.opportunity_value),
    };

    await sendRequest({ leadId: lead?._id ?? "", payload: newData })
      .unwrap()
      .then((res: unknown) => {
        const response = structuredClone(res) as Lead;
        response.id = `item-${response._id ?? "unknown"}`;
        toast({
          description: "Opportunity updated successfully",
        });
        onUpdateLead(lead?.id ?? "", response);
        onClose();
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  const { data: users } = useGetAllUsersQuery(undefined);
  const { data: contacts } = useGetAllContactQuery(undefined);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update Opportunity</DialogTitle>
              <DialogDescription className="hidden" />
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
                        defaultValue={lead?.status}
                      >
                        <FormControl>
                          <SelectTrigger variant="outline">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {pipelineItems.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.id}
                            </SelectItem>
                          ))}
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

                {/* <FormField
                  control={form.control}
                  name="owner_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="owner_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner *</FormLabel>
                      <FormControl>
                        {/* <Input {...field} placeholder="John Doe" /> */}
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
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
