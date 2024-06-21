"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { useLazyExportContactsQuery } from "@repo/redux-utils/src/endpoints/contacts.ts";
import {
  Button,
  Calendar,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "@repo/ui/components/ui";
import { cn } from "@repo/ui/utils";
import moment from "moment";

export default function ExportContactsDialogForm() {
  const FormSchema = z.object({
    dateFrom: z.date({
      required_error: "Required.",
    }),
    dateTo: z.date({
      required_error: "Required.",
    }),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {}
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateFrom: "",
      dateTo: "",
    },
  });
  const [exportContacts, { data: contactData, isError, isLoading }] =
    useLazyExportContactsQuery();

  const handleExport = async () => {
    try {
      const payload = {
        //dateFrom: form.getValues("dateFrom").toString(),
        // dateTo: form.getValues("dateTo").toString(),
        all: true,
      };

      const res = await exportContacts(payload).unwrap();

      const link = document.createElement("a");
      link.download = res.fileName;
      link.href = res.url;
      link.click();
      link.remove();
      URL.revokeObjectURL(res.url);
    } catch (error) {
      console.error("Export failed", error);
    }
  };
  return (
    <DialogContent className="min-w-[600px] p-5">
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
                          variant="outline"
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                              moment(field.value).format("PPP")
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
                  <FormDescription />
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
                          variant="outline"
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                              moment(field.value).format("PPP")
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
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="flex justify-items-end"
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
