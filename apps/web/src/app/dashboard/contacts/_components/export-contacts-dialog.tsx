"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  Separator,
  toast,
} from "@/src/components/ui";
import {
  useExportContactsMutation,
  useExportContactsQuery,
} from "@/src/endpoints/contacts.ts";

const FormSchema = z.object({
  dateFrom: z.date({
    required_error: "Required.",
  }),
  dateTo: z.date({
    required_error: "Required.",
  }),
});

function onSubmit(data: z.infer<typeof FormSchema>) {}

export default function ExportContactsDialogForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateFrom: new Date(),
      dateTo: new Date(),
    },
  });
  const { data, error, isLoading, refetch } = useExportContactsQuery();

  const handleExport = async () => {
    try {
      if (!data) {
        await refetch();
        return;
      }

      const payload = {
        dateFrom: form.getValues("dateFrom"),
        dateTo: form.getValues("dateTo"),
        all: true,
        contactsData: data,
      };

      console.log("Exporting contacts", payload);
    } catch (error) {
      // Handle errors
      console.error("Export failed", error);
    }
  };
  return (
    <DialogContent className="p-5 min-w-[600px]">
      <DialogHeader className="font-bold">Export Contacts</DialogHeader>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between gap-5">
            <FormField
              control={form.control}
              name="dateFrom"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date From</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateTo"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date To</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="justify-items-end flex"
              onClick={handleExport}
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
