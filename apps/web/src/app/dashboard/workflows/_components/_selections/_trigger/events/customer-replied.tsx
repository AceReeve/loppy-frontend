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
import React, { useEffect } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import type { z } from "zod";
import { TrashIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ITriggerNode } from "@repo/redux-utils/src/endpoints/types/nodes";
import { TriggerContentSchema } from "@/src/schemas";
import { CustomTriggerProps } from "@/src/app/dashboard/workflows/_components/_custom-nodes/trigger-node.tsx";

export default function CustomerReplied(prop: CustomTriggerProps) {
  const filterSelections = [
    {
      id: 0,
      filter: "Replied to Workflow",
      value: "Replied to Workflow",
      selections: [
        {
          id: 0,
          title: "12inf12923basx",
          value: "12inf12923basx",
        },
        {
          id: 1,
          title: "910254nasjgf1",
          value: "910254nasjgf1",
        },
      ],
    },
    {
      id: 1,
      filter: "Has a Tag",
      value: "Has a Tag",
      selections: [
        {
          id: 2,
          title: "ChatGPT",
          value: "ChatGPT",
        },
        {
          id: 3,
          title: "Facebook",
          value: "Facebook",
        },
      ],
    },
  ];

  const onSubmit = () => {
    const isEditMode = Boolean(prop.node);
    prop.onHandleClick(customerRepliedNode as ITriggerNode, isEditMode);
  };

  const formSchema = TriggerContentSchema;

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

  const watchedFilters = useWatch({
    control: form.control,
    name: "filters",
  });

  useEffect(() => {
    // This effect will trigger whenever filters are updated in the form
    // console.log("Updated filters:", watchedFilters);
    // You can perform other actions here to update your UI with the new form values
  }, [watchedFilters]);

  const customerRepliedNode = {
    id: prop.node ? prop.node.id : "1",
    type: "triggerNode",
    data: {
      title: form.getValues("title"),
      node_name: "Customer Replied",
      node_type_id: "Customer Replied",
      content: {
        filters: form.getValues("filters"),
      },
    },
  };

  const filterWatch = form.watch("filters");

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-start">
        <p>Customer Replied Trigger</p>
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
              <Button
                type="button"
                onClick={() => {
                  append({ filter: "", value: "" });
                }}
                variant="outline"
              >
                Add Filter
              </Button>
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
                              <SelectItem
                                key={filter.id}
                                value={filter.id.toString()}
                              >
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
                            <SelectValue placeholder="Select Value" />
                          </SelectTrigger>
                          {/* {errors.filters.filter?.[index]?.value ? (
                        <p className="mt-2 text-[0.8rem] font-medium text-error">
                          {errors.users[index].role.message}
                        </p>
                      ) : null}*/}
                          <SelectContent>
                            {filterSelections[
                              Number(filterWatch[index].filter)
                            ]?.selections.map((filter) => (
                              <SelectItem key={filter.id} value={filter.value}>
                                {filter.title}
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
            <Button type="submit" className="rounded px-4">
              {prop.node ? "Update Trigger" : "Add Trigger"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
