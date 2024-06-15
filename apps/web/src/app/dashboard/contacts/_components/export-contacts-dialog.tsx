"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, number, string, z } from "zod";
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
  useCreateContactMutation,
  useLazyExportContactsQuery,
} from "@/src/endpoints/contacts.ts";
import {
  ExportContactsPayload,
  ExportContactsResponse,
} from "@/src/endpoints/types/contacts";
import LoadingSpinner from "@/src/loading/loading-spinner.tsx";
import React from "react";

export default function ExportContactsDialogForm() {
  const FormSchema = z.object({
    from: z.date().refine(
      (date) => {
        // Ensure date is valid
        return !isNaN(date.getTime());
      },
      {
        message: "Last Interaction must be a valid date.",
      },
    ),
    to: z.date().refine(
      (date) => {
        // Ensure date is valid
        return !isNaN(date.getTime());
      },
      {
        message: "Last Interaction must be a valid date.",
      },
    ),
    all: z.boolean(),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {}
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      from: new Date(),
      to: new Date(),
      all: boolean,
    },
  });
  const [exportContacts, { data: contactData, isError, isLoading }] =
    useLazyExportContactsQuery(form);

  const handleExport = async () => {
    try {
      const payload = {
        dateFrom: form.getValues("from").toString(),
        dateTo: form.getValues("to").toString(),
        all: true,
      };

      const res = await exportContacts(payload).unwrap();

      const link = document.createElement("a");
      link.href = res.url;
      link.download = res.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(res.url);
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  return (
    <>
      <DialogContent className="p-5 min-w-[600px] min-h-[200px]">
        {isLoading ? (
          <div className="m-auto inline">
            <div className="h-[50px] w-[15px] content-center m-auto">
              <LoadingSpinner />
            </div>
            <p>Exporting Contacts</p>
          </div>
        ) : (
          <>
            <DialogHeader className="font-bold">Export Contacts</DialogHeader>
            <Separator />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex justify-between gap-5">
                  <FormField
                    control={form.control}
                    name="from"
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
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
                    name="to"
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
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
          </>
        )}
      </DialogContent>
    </>
  );
}
