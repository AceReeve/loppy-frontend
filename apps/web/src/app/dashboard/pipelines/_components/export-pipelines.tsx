/* eslint-disable -- will do later after redesign since this is a lot */

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  toast,
} from "@repo/ui/components/ui";
import React from "react";
import { useLazyExportPipelinesQuery } from "@repo/redux-utils/src/endpoints/pipelines";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import moment from "moment";
import { CalendarIcon } from "lucide-react";
import { cn } from "@repo/ui/utils";

// schemas
const FormSchema = z.object({
  dateFrom: z.string().min(1, { message: "Required" }),
  dateTo: z.string().min(1, { message: "Required" }),
});

export default function ExportPipelines() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateFrom: moment().subtract(7, "days").format("YYYY-MM-DD"),
      dateTo: moment().format("YYYY-MM-DD"),
    },
  });

  const [sendRequest] = useLazyExportPipelinesQuery();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // await sendRequest(data)
    //   .unwrap()
    //   .then(() => {
    //     toast({
    //       description: "Pipeline created successfully",
    //     });
    //   })
    //   .catch((e: unknown) => {
    //     toast({
    //       description: getErrorMessage(e),
    //     });
    //   });

    try {
      const payload = {
        //dateFrom: form.getValues("dateFrom").toString(),
        // dateTo: form.getValues("dateTo").toString(),
        all: true,
      };

      const res = await sendRequest(payload).unwrap();

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Export</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Export Pipelines</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
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
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              moment(field.value).format("l")
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
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              moment(field.value).format("l")
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
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
