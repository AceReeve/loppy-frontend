import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Separator,
} from "@repo/ui/components/ui";
import React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IActionNode } from "@repo/redux-utils/src/endpoints/types/nodes";
import type { CustomTriggerProps } from "@/src/app/dashboard/workflows/_components/_custom-nodes/trigger-node.tsx";
import { CreateUpdateOpportunitySchema } from "@/src/schemas";

export default function CreateUpdateOpportunity(prop: CustomTriggerProps) {
  const formSchema = CreateUpdateOpportunitySchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: prop.node
      ? {
          title: prop.node.data.title,
          pipeline: prop.node.data.content.pipeline,
          opportunity_name: prop.node.data.content.opportunity_name,
          opportunity_source: prop.node.data.content.opportunity_source,
          status: prop.node.data.content.status,
        }
      : {
          title: "",
          pipeline: "",
          opportunity_name: "",
          opportunity_source: "",
          status: "",
        },
  });
  const {
    formState: { errors },
  } = form;

  const createUpdateOpportunityNode = {
    id: prop.node ? prop.node.id : "1",
    type: "actionNode",
    data: {
      title: form.getValues("title"),
      node_name: "Create Update Opportunity",
      node_type_id: "Create Update Opportunity",
      content: {
        pipeline: form.getValues("pipeline"),
        opportunity_name: form.getValues("opportunity_name"),
        opportunity_source: form.getValues("opportunity_source"),
        status: form.getValues("status"),
      },
    },
  };
  const onSubmit = () => {
    const isEditMode = Boolean(prop.node);
    prop.onHandleClick(createUpdateOpportunityNode as IActionNode, isEditMode);
  };

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
            name="pipeline"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>In Pipeline</FormLabel>
                  <FormControl>
                    <Input
                      className="resize-none bg-slate-100/50 font-light leading-7"
                      placeholder="ServiHero"
                      {...field}
                    />
                  </FormControl>
                  {errors.pipeline ? (
                    <p className="mt-2 text-[0.8rem] font-medium text-error">
                      {errors.pipeline.message}
                    </p>
                  ) : null}
                </FormItem>
              );
            }}
          />{" "}
          <FormField
            control={form.control}
            name="opportunity_name"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Opportunity Name</FormLabel>
                  <FormControl>
                    <Input
                      className="resize-none bg-slate-100/50 font-light leading-7"
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  {errors.opportunity_name ? (
                    <p className="mt-2 text-[0.8rem] font-medium text-error">
                      {errors.opportunity_name.message}
                    </p>
                  ) : null}
                </FormItem>
              );
            }}
          />{" "}
          <FormField
            control={form.control}
            name="opportunity_source"
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
                  {errors.opportunity_source ? (
                    <p className="mt-2 text-[0.8rem] font-medium text-error">
                      {errors.opportunity_source.message}
                    </p>
                  ) : null}
                </FormItem>
              );
            }}
          />{" "}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input
                      className="resize-none bg-slate-100/50 font-light leading-7"
                      placeholder="Status"
                      {...field}
                    />
                  </FormControl>
                  {errors.status ? (
                    <p className="mt-2 text-[0.8rem] font-medium text-error">
                      {errors.status.message}
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
