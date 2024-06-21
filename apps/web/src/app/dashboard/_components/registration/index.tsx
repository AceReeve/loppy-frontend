"use client";

import { useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import React from "react";
import {
    Button, Calendar, Dialog, DialogContent, DialogHeader, DialogTrigger,
    type DropzoneOptions, FileInput, FileUploader,
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input, Popover, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem
} from "@repo/ui/components/ui";
import {cn} from "@repo/ui/utils";
import moment from "moment";
import { RegisterDetailsSchema } from "@/src/schemas";

export default function Registration() {
  const onSubmit = () => {
    // console.log("Submitted");
  };
  const registerSchema = RegisterDetailsSchema;
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      address: "",
      company: "",
      phone_number: "",
      birth_date: "",
      sex: "",
    },
  });

  interface Props {
    setOpen: (open: boolean) => void;
  }

  function FileSvgDraw() {
    return (
      <>
        <svg
          aria-hidden="true"
          className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
          fill="none"
          viewBox="0 0 20 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span>
          &nbsp; or drag and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          PNG, JPG, WEBM
        </p>
      </>
    );
  }

  const dropZoneConfig = {
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxSize: 4 * 1024 * 1024,
  } satisfies DropzoneOptions;

  return (
    //<div className="relative m-auto p-8 flex min-h-[85%] max-h-full h-full w-full max-w-[1283px] flex-col rounded-[29px] border border-neutral-300 bg-gradient-to-b from-indigo-950 to-purple-950">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="rounded-[29px] min-h-[800px]  bg-white flex m-5">
          <div className=" w-full  px-10 py-20 ">
            <div className="justify-between flex flex-col gap-5">
              <div className="text-left">
                <h1 className="font-montserrat text-2xl font-bold text-primary sm:text-[42px]">
                  Complete your profile details
                </h1>
                <p className="mt-2 text-[13px] font-normal text-gray-500">
                  Welcome to Service Hero
                </p>
              </div>
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input autoComplete="off" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input autoComplete="off" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input autoComplete="off" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input autoComplete="off" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input autoComplete="off" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <div className="flex justify-start gap-28">
                <FormField
                  control={form.control}
                  name="birth_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Birth Date</FormLabel>
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
                  name="sex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-10"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Male" />
                            </FormControl>
                            <FormLabel className="font-nunito ">Male</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Female" />
                            </FormControl>
                            <FormLabel className="font-nunito">
                              Female
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className=" w-3/5 flex flex-col gap-10 py-20 border-l-2">
            <Dialog>
              <DialogTrigger>
                <div className="rounded-full w-[200px] h-[200px] bg-slate-300 mx-auto" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <p>Upload Profile Photo</p>
                </DialogHeader>
                <FileUploader
                  className="relative rounded-lg p-2"
                  dropzoneOptions={dropZoneConfig}
                  //onValueChange={props.setFiles}
                  // value={props.files}
                >
                  <FileInput className="outline-dashed outline-1 outline-gray-500 py-10">
                    <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full">
                      <FileSvgDraw />
                    </div>
                  </FileInput>
                </FileUploader>
                <div className="flex justify-end">
                  <Button>Submit</Button>
                </div>
              </DialogContent>
            </Dialog>
            <p className="mt-2 text-[13px] font-normal text-gray-500 text-center">
              Please select your image
            </p>
            <Button
              className="mx-auto w-[200px] h-[50px] text-lg"
              type="submit"
            >
              Proceed
            </Button>
          </div>
        </div>
      </form>
    </Form>
    //</div>
  );
}
