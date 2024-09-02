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
import type { CustomNode } from "@repo/redux-utils/src/endpoints/types/workflow";
import { CreateBirthReminderSchema } from "@/src/schemas";

interface BirthdayReminderProps {
  onHandleClick: (node: CustomNode) => void;
  onAddNodes: () => void;
}

export default function BirthdayReminder(prop: BirthdayReminderProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  //const [selectedDate, setSelectedDate] = useState<Date>();

  /*
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setCalendarOpen(false); // Close the calendar after selecting a date
  };
*/

  const onSubmit = () => {
    prop.onHandleClick(birthdayNode as CustomNode);
    prop.onAddNodes();
  };

  const formSchema = CreateBirthReminderSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthDate: new Date(),
    },
  });

  const birthdayNode = {
    id: "1",
    type: "triggerNode",
    data: {
      title: "Birthday Reminder",
      content: moment(form.getValues("birthDate")).format("L"),
    },
    position: { x: 0, y: 0 },
  };

  return (
    <div className="space-y-2 p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel className="my-2">Birth Date</FormLabel>
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
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
