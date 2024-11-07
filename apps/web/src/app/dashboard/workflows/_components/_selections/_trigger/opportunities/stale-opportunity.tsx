import {
  Button,
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
} from "@repo/ui/components/ui";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ITriggerNode } from "@repo/redux-utils/src/endpoints/types/nodes";
import { TrashIcon } from "lucide-react";
import { useWorkflow } from "@/src/app/dashboard/workflows/providers/workflow-provider.tsx";
import type { CustomTriggerProps } from "@/src/app/dashboard/workflows/_components/_custom-nodes/trigger-node.tsx";
import { CreateBirthReminderSchema } from "@/src/schemas";
import statusSelection from "@/src/app/dashboard/workflows/_components/status-selection.tsx";

/*interface ContentPayload {
  pipeline_id: string;
  stage_id: string;
  user: string;
  description: string;
  category: string;
  status: string;
  lead_value: string;
}*/

export default function StaleOpportunity(prop: CustomTriggerProps) {
  const formSchema = CreateBirthReminderSchema;

  const { workflow } = useWorkflow();
  const tags = workflow?.tags;
  //const workflows = workflow?.workflows;
  const { pipeline } = useWorkflow();

  const filterSelections = [
    {
      id: 0,
      filter: "In Pipeline",
      value: "In Pipeline",
      selections: pipeline?.pipelines,
    },
    {
      id: 1,
      filter: "Has a Tag",
      value: "Has a Tag",
      selections: tags,
    },
    {
      id: 2,
      filter: "Lead Value",
      value: "Lead Value",
      selections: [],
    },
    {
      id: 3,
      filter: "Assigned To",
      value: "Assigned To",
      selections: pipeline?.members,
    },
    {
      id: 4,
      filter: "Moved from status",
      value: "Moved from status",
      selections: statusSelection,
    },
    {
      id: 5,
      filter: "Moved to status",
      value: "Moved to status",
      selections: statusSelection,
    },
    /*    {
              id: 6,
              filter: "Lost Reason",
              value: "Lost Reason",
              selections: statusSelection,
            },*/
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: prop.node
      ? {
          title: prop.node.data.title,
          filters: prop.node.data.content.filters,
        }
      : {
          title: "",
          filters: [{ filter: "", value: "" }],
        },
  });

  const {
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "filters",
  });

  const filterWatch = form.watch("filters");

  const opportunityStatusChangedNode = {
    id: prop.node ? prop.node.id : "1",
    type: "triggerNode",
    data: {
      title: form.getValues("title"),
      node_name: "Stale Opportunity",
      node_type_id: "Stale Opportunity",
      content: {
        filters: form.getValues("filters"),
      },
    },
  };
  /*  filters: [
        //67210553edf3b4e54a0f7ed5
        { filter: "In Pipeline", value: "67210553edf3b4e54a0f7ed5" },
        { filter: "Has a Tag", value: "Facebook" },
        { filter: "Lead Value", value: "1" },
        { filter: "Moved from status", value: "In Progress" },
        { filter: "Moved to status", value: "Good" },
      ],*/
  const onSubmit = () => {
    const isEditMode = Boolean(prop.node);
    prop.onHandleClick(
      opportunityStatusChangedNode as ITriggerNode,
      isEditMode,
    );
  };

  // const { pipeline } = useWorkflow();

  /*
      const selectedPipeline = pipeline?.find((p) => p._id === selectedPipelineId);
      const availableOpportunities = selectedPipeline
        ? selectedPipeline.opportunities
        : [];
    */

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-start">
        <p>Stale Opportunity</p>
        <p className="content-center font-nunito text-sm text-gray-500">
          Initiates a workflow that adds a contact when specific weather
          conditions are met, streamlining engagement and ensuring timely
          interactions.
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
                <FormItem className="col-span-1">
                  <FormLabel>Workflow Trigger Name</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="space-y-2">
            <div className="mt-2 flex items-center justify-between ">
              <p className="font-semibold">Filters</p>
              {filterWatch.length ? (
                <Button
                  type="button"
                  onClick={() => {
                    append({ filter: "", value: "" });
                  }}
                  variant="outline"
                >
                  Add Filter
                </Button>
              ) : null}
            </div>
            <Separator />
            {fields.map((filterField, index) => (
              <div key={filterField.id} className="flex items-start gap-2">
                <Controller
                  /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- will check later */
                  name={`filters.${index}.filter`}
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <div className="w-full">
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className="h-[40px] text-slate-500"
                            variant="outline"
                          >
                            <SelectValue placeholder="Select Filter" />
                          </SelectTrigger>
                          {/* {errors.filters.filter?.[index]?.value ? (
                        <p className="mt-2 text-[0.8rem] font-medium text-error">
                          {errors.users[index].role.message}
                        </p>
                      ) : null}*/}
                          <SelectContent>
                            {filterSelections.map((filter) => (
                              <SelectItem value={filter.filter} key={filter.id}>
                                {filter.value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.filters?.[index]?.filter ? (
                          <p className="mt-2 text-[0.8rem] font-medium text-error">
                            {errors.filters[index].filter.message}
                          </p>
                        ) : null}
                      </div>
                    );
                  }}
                />

                <Controller
                  /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- will check later */
                  name={`filters.${index}.value`}
                  control={form.control}
                  render={({ field }) => {
                    function FieldType() {
                      switch (filterWatch[index].filter) {
                        case "Lead Value":
                          return (
                            <Input autoComplete="off" type="text" {...field} />
                          );

                        default:
                          return (
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                className="h-[40px] text-slate-500"
                                variant="outline"
                              >
                                <SelectValue placeholder="Select Value" />
                              </SelectTrigger>
                              <SelectContent>
                                {filterSelections
                                  .filter(
                                    (selection) =>
                                      selection.filter ===
                                      filterWatch[index]?.filter,
                                  ) // Match by filter name
                                  .map((filteredSelection) =>
                                    filteredSelection.selections?.map(
                                      (selection) => (
                                        <SelectItem
                                          key={selection.id}
                                          value={selection.id.toString()} // Use `selection.id` as the value (converted to string)
                                        >
                                          {selection.name}{" "}
                                          {/* Display the name of the selection */}
                                        </SelectItem>
                                      ),
                                    ),
                                  )}
                              </SelectContent>
                            </Select>
                          );
                      }
                    }

                    return (
                      <div className="w-full">
                        <FieldType />
                        {errors.filters?.[index]?.filter ? (
                          <p className="mt-2 text-[0.8rem] font-medium text-error">
                            {errors.filters[index].filter.message}
                          </p>
                        ) : null}
                      </div>
                    );
                  }}
                />

                {fields.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => {
                      remove(index);
                    }}
                    variant="outline"
                  >
                    <TrashIcon />
                  </Button>
                )}
              </div>
            ))}
          </div>

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
    </div>
  );
}
