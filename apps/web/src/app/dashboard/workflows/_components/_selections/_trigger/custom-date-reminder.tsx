import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui";
import React, { useState } from "react";
import moment from "moment/moment";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ITriggerNode } from "@repo/redux-utils/src/endpoints/types/nodes";
import { CreateDateReminder } from "@/src/schemas";

interface CustomDateReminderProps {
  onHandleClick: (node: ITriggerNode) => void;
  onNodeClick: (node: ITriggerNode) => void;
  icon: React.ReactNode;
}

export default function CustomDateReminder(prop: CustomDateReminderProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  //const [selectedDate, setSelectedDate] = useState<Date>();

  /*
    const handleDateChange = (date: Date) => {
      setSelectedDate(date);
      setCalendarOpen(false); // Close the calendar after selecting a date
    };
  */

  const onSubmit = () => {
    prop.onHandleClick(customDateNode as ITriggerNode);
  };

  const formSchema = CreateDateReminder;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      custom_date: new Date(),
    },
  });

  const {
    formState: { errors },
  } = form;

  const customDateNode = {
    id: "1",
    type: "triggerNode",
    data: {
      title: "Custom Date Reminder",
      content: moment(form.getValues("custom_date")).format("L"),
      icon: prop.icon,
      onButtonClick: () => {
        onNodeClick();
      },
    },
  };
  const onNodeClick = () => {
    prop.onNodeClick(customDateNode as ITriggerNode);
  };
  const today = new Date(Date.now());
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-2 p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="custom_date"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel className="my-2">Custom Date</FormLabel>
                  <Popover onOpenChange={setCalendarOpen} open={calendarOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full pl-3 text-left font-normal"
                        >
                          {moment(field.value).format("L")}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        //onSelect={field.onChange}
                        onSelect={(date) => {
                          field.onChange(date);
                          setCalendarOpen(!calendarOpen); // Close the calendar after selecting a date
                        }}
                        disabled={(date) =>
                          date < new Date("1900-01-01") ||
                          date.toDateString() === today.toDateString()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.custom_date ? (
                    <p className="mt-2 text-[0.8rem] font-medium text-error">
                      {errors.custom_date.message}
                    </p>
                  ) : null}
                </FormItem>
              );
            }}
          />
          <div className="mt-5 flex justify-end ">
            <Button
              /* onClick={handleAddNode}*/
              type="submit"
              className="rounded px-4"
            >
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
