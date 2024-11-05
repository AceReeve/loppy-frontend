import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
  Textarea,
} from "@repo/ui/components/ui";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IActionNode } from "@repo/redux-utils/src/endpoints/types/nodes";
import { useWorkflow } from "@/src/app/dashboard/workflows/providers/workflow-provider.tsx";
import type { CustomTriggerProps } from "@/src/app/dashboard/workflows/_components/_custom-nodes/trigger-node.tsx";
import { CreateUpdateOpportunitySchema } from "@/src/schemas";
import { pipelineItems } from "@/src/app/dashboard/pipelines/_components/pipeline-items.tsx";

/*interface ContentPayload {
  pipeline_id: string;
  stage_id: string;
  user: string;
  description: string;
  category: string;
  status: string;
  lead_value: string;
}*/

export default function CreateUpdateOpportunity(prop: CustomTriggerProps) {
  const formSchema = CreateUpdateOpportunitySchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: prop.node
      ? {
          title: prop.node.data.title,
          content: {
            pipeline_id: prop.node.data.content.pipeline_id,
            stage_id: prop.node.data.content.stage_id,
            user: prop.node.data.content.user,
            opportunity_name: prop.node.data.content.opportunity_name,
            opportunity_source: prop.node.data.content.opportunity_source,
            status: prop.node.data.content.status,
            lead_value: prop.node.data.content.lead_value,
          },
        }
      : {
          title: "",
          content: {
            pipeline_id: "",
            stage_id: "",
            user: "",
            opportunity_name: "",
            opportunity_source: "",
            status: "",
            lead_value: "",
          },
        },
  });
  const {
    formState: { errors },
  } = form;

  const createUpdateOpportunityNode = {
    id: prop.node ? prop.node.id : "13",
    type: "actionNode",
    data: {
      title: form.getValues("title"),
      node_name: "Create Update Opportunity",
      node_type_id: "Create Update Opportunity",
      content: form.getValues("content"),
    },
  };

  const onSubmit = () => {
    const isEditMode = Boolean(prop.node);
    prop.onHandleClick(createUpdateOpportunityNode as IActionNode, isEditMode);
  };

  const { pipeline } = useWorkflow();

  // Watch the selected pipeline ID
  const selectedPipelineId = useWatch({
    control: form.control,
    name: "content.pipeline_id", // Adjust this based on your form structure
  });

  const selectedPipeline = pipeline?.pipelines.find(
    (p) => p.id === selectedPipelineId,
  );

  const availableOpportunities = selectedPipeline
    ? selectedPipeline.opportunities
    : [];

  return (
    <div className="space-y-4 rounded ">
      <div className="flex flex-col justify-start">
        <p>Create or Update Opportunity Action</p>
        <p className="content-center font-nunito text-sm text-gray-500">
          Sets a Workflow that adds the contact upon execution.
        </p>
      </div>
      <Separator className="my-5" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Action Name</FormLabel>
                  <FormControl>
                    <Input
                      className="resize-none bg-slate-100/50 font-light leading-7"
                      placeholder="Enter action name"
                      {...field}
                    />
                  </FormControl>
                  {errors.title ? (
                    <p className="mt-2 text-[0.8rem] font-medium text-error">
                      {errors.title.message}
                    </p>
                  ) : null}
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="content.pipeline_id"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>In Pipeline</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      {/*                    <Input
                      className="resize-none bg-slate-100/50 font-light leading-7"
                      placeholder="ServiHero"
                      {...field}
                    />*/}
                      <SelectTrigger variant="outline">
                        <SelectValue placeholder="Select a pipeline" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Pipelines</SelectLabel>
                        {pipeline?.pipelines.map((pip) => (
                          <SelectItem key={pip.id} value={pip.id}>
                            {pip.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.content?.pipeline_id ? (
                    <p className="mt-2 text-[0.8rem] font-medium text-error">
                      {errors.content.pipeline_id.message}
                    </p>
                  ) : null}
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="content.stage_id"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Pipeline Stage</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger variant="outline">
                          <SelectValue placeholder="Select an opportunity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Opportunities</SelectLabel>
                          {availableOpportunities.map((opp) => (
                            <SelectItem key={opp.id} value={opp.id}>
                              {opp.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.content?.stage_id ? (
                    <p className="mt-2 text-[0.8rem] font-medium text-error">
                      {errors.content.stage_id.message}
                    </p>
                  ) : null}
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="content.user"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>User</FormLabel>
                  <FormControl>
                    <Input
                      className="resize-none bg-slate-100/50 font-light leading-7"
                      placeholder="User"
                      {...field}
                    />
                  </FormControl>
                  {errors.content?.user ? (
                    <p className="mt-2 text-[0.8rem] font-medium text-error">
                      {errors.content.user.message}
                    </p>
                  ) : null}
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="content.opportunity_name"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Opportunity Name</FormLabel>
                  <FormControl>
                    <Textarea
                      className="mt-2 h-[140px] resize-none bg-slate-100/50 font-light leading-7"
                      placeholder="Write your description here..."
                      {...field}
                    />
                  </FormControl>
                  {errors.content?.opportunity_name ? (
                    <p className="mt-2 text-[0.8rem] font-medium text-error">
                      {errors.content.opportunity_name.message}
                    </p>
                  ) : null}
                </FormItem>
              );
            }}
          />{" "}
          <FormField
            control={form.control}
            name="content.opportunity_source"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Opportunity Source</FormLabel>
                  <FormControl>
                    <Input
                      className="resize-none bg-slate-100/50 font-light leading-7"
                      placeholder="Source"
                      {...field}
                    />
                  </FormControl>
                  {errors.content?.opportunity_source ? (
                    <p className="mt-2 text-[0.8rem] font-medium text-error">
                      {errors.content.opportunity_source.message}
                    </p>
                  ) : null}
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="content.status"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
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
                      {pipelineItems.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.content?.status ? (
                    <p className="mt-2 text-[0.8rem] font-medium text-error">
                      {errors.content.status.message}
                    </p>
                  ) : null}
                </FormItem>
              );
            }}
          />{" "}
          <FormField
            control={form.control}
            name="content.lead_value"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Lead Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="resize-none bg-slate-100/50 font-light leading-7"
                      placeholder="Status"
                      {...field}
                    />
                  </FormControl>
                  {errors.content?.lead_value ? (
                    <p className="mt-2 text-[0.8rem] font-medium text-error">
                      {errors.content.lead_value.message}
                    </p>
                  ) : null}
                </FormItem>
              );
            }}
          />
          <Separator />
          <div
            className={`mt-5 flex ${!prop.node ? "justify-end" : "justify-between"} `}
          >
            <div className={`flex space-x-2 ${prop.node ? "" : "hidden"}`}>
              <Button
                onClick={() => {
                  if (prop.node && prop.onHandleDelete) {
                    prop.onHandleDelete(prop.node);
                  }
                }}
                variant="destructive"
                className={` rounded px-4 ${prop.node ? "" : "hidden"}`}
              >
                Delete
              </Button>

              <Button
                variant="outline"
                className={` rounded px-4 ${prop.node ? "" : "hidden"}`}
              >
                Cancel
              </Button>
            </div>
            <Button type="submit" className="rounded px-4">
              {prop.node ? "Update Trigger" : "Add Trigger"}
            </Button>
          </div>
        </form>
      </Form>

      {/*      <div className="flex justify-end ">
        <Button onClick={handleAddActionNode} className="rounded">
          Add Action
        </Button>
      </div>*/}
    </div>
  );
}
