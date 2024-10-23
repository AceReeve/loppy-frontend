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
import type { CustomTriggerProps } from "@/src/app/dashboard/workflows/_components/_custom-nodes/trigger-node.tsx";
import { CreateBirthReminderSchema } from "@/src/schemas";

export default function WeatherReminder(prop: CustomTriggerProps) {
  //const [selectedDate, setSelectedDate] = useState<Date>();

  /*
    const handleDateChange = (date: Date) => {
      setSelectedDate(date);
      setCalendarOpen(false); // Close the calendar after selecting a date
    };
  */

  const onSubmit = () => {
    const isEditMode = Boolean(prop.node);
    prop.onHandleClick(birthdayNode as ITriggerNode, isEditMode);
  };

  const formSchema = CreateBirthReminderSchema;

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
  const filterWatch = form.watch("filters");

  useEffect(() => {
    // This effect will trigger whenever filters are updated in the form
    // console.log("Updated filters:", watchedFilters);
    // You can perform other actions here to update your UI with the new form values
  }, [watchedFilters]);

  const birthdayNode = {
    id: prop.node ? prop.node.id : "1",
    type: "triggerNode",
    data: {
      title: form.getValues("title"),
      node_name: "Weather Reminder",
      node_type_id: "Weather Reminder",
      content: {
        filters: form.getValues("filters"),
      },
    },
  };

  const today = new Date(Date.now());
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-start">
        <p>Weather Reminder Trigger</p>
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
                            <SelectItem value="Below Temp">Below °F</SelectItem>
                            <SelectItem value="Above Temp">Above °F</SelectItem>
                            <SelectItem value="Above Wind">
                              Above Wind Speed
                            </SelectItem>
                            <SelectItem value="Below Wind">
                              Above Wind Speed
                            </SelectItem>
                            <SelectItem value="Above Pressure">
                              Above Pressure
                            </SelectItem>
                            <SelectItem value="Below Pressure">
                              Below Pressure
                            </SelectItem>
                            <SelectItem value="Weather Type">
                              Weather Type
                            </SelectItem>
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
                    function FilterType() {
                      switch (filterWatch[index].filter) {
                        case "WeatherType":
                          return (
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
                              <SelectContent>
                                <SelectItem value="Clear">Clear</SelectItem>
                                <SelectItem value="Sun">Sun</SelectItem>
                                <SelectItem value="Clouds">Clouds</SelectItem>
                                <SelectItem value="Rain">Rain</SelectItem>
                                <SelectItem value="Drizzle">Drizzle</SelectItem>
                                <SelectItem value="Thunderstorm">
                                  Thunderstorm
                                </SelectItem>
                                <SelectItem value="Snow">Snow</SelectItem>
                                <SelectItem value="Atmosphere">
                                  Atmosphere
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          );
                        default:
                          return <Input placeholder="Value" {...field} />;
                      }
                    }

                    return (
                      <div className="w-full">
                        <FilterType />
                        {errors.filters?.[index]?.value ? (
                          <p className="mt-2 text-[0.8rem] font-medium text-error">
                            {errors.filters[index].value.message}
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
