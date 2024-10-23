/* eslint-disable -- will do later after merge */
"use client";

import { useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  type DropzoneOptions,
  FileInput,
  FileUploader,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  toast,
} from "@repo/ui/components/ui";
import { RegisterDetailsSchema } from "@/src/schemas";
import { usePaywallState } from "@/src/providers/paywall-provider.tsx";
import { useSearchParams } from "next/navigation";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { handleRegisterDetails } from "@/src/actions/login-actions.ts";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useRegisterDetailsMutation } from "@repo/redux-utils/src/endpoints/register.ts";

export default function RegisterDetails() {
  const { setViewIndex } = usePaywallState();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const errorParam = searchParams.get("error");
  const onHandleProceed = () => {
    startTransition(() => {
      handleRegisterDetails(form.getValues())
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            //setProcess(1);
            // setOpenDetails(true);
            setViewIndex(1);
          }
        })
        .catch((e: unknown) => {
          toast({
            description: getErrorMessage(e),
          });
        });
    });

    //setOpenDetails(false);
    //setProcess(step);
    /*handleCredentialsSignIn(form.getValues(), callbackUrl)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
        } else {
          //setProcess(1);
          // setOpenDetails(true);
        }
      })
      .catch((e) => {
        setError(e.message || e.statusText);
      });*/
  };

  const registerSchema = RegisterDetailsSchema;
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      contact_no: "",
      birthday: "",
      gender: "",
    },
  });
  const { register, formState } = form;
  const { errors } = formState;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [registerDetails, { isLoading }] = useRegisterDetailsMutation();

  const onSubmit = async () => {
    try {
      const formData = form.getValues();
      const newData = {
        ...formData,
        contact_no: parseInt(formData.contact_no),
        zipCode: parseInt(formData.zipCode),
      };

      const response = await registerDetails(newData);

      // Check if response has data property
      if (response.data) {
        // Handle successful submission
        setViewIndex(1);
        toast({
          title: "Updated Successfully",
          description: "User TeamDetails has been created.",
          variant: "success",
        });
        form.reset();
      } else if (response.error) {
        // Handle submission failure
        toast({
          title: "Create User TeamDetails Error",
          description:
            //response.error
            //? response.error.toString() :
            "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Create User Error",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  interface Props {
    setOpen: (open: boolean) => void;
  }

  function FileSvgDraw() {
    return (
      <>
        <svg
          aria-hidden="true"
          className="mb-3 h-8 w-8 text-gray-500 dark:text-gray-400"
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
        <div className="m-5 flex  min-h-[800px] rounded-[29px] bg-white">
          <div className=" w-full  px-10 py-20 ">
            <div className="flex flex-col justify-between gap-5">
              <div className="text-left">
                <h1 className="font-montserrat text-2xl font-bold text-primary sm:text-[42px]">
                  Complete your profile details
                </h1>
                <p className="mt-2 text-[13px] font-normal text-gray-500">
                  Welcome to Service Hero
                </p>
              </div>
              <div className="grid grid-cols-4 gap-5">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => {
                    return (
                      <FormItem className="col-span-2">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input autoComplete={"off"} {...field} />
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
                      <FormItem className="col-span-2">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input autoComplete={"off"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>Birth Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Input type="date" className="" {...field} />
                        </PopoverTrigger>
                      </Popover>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div></div>
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="h-[40px] grid-cols-2  content-center "
                        >
                          <FormItem
                            className="flex items-center
                           space-x-3 space-y-0"
                          >
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

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => {
                    return (
                      <FormItem className="col-span-4">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input autoComplete={"off"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => {
                    return (
                      <FormItem className="col-span-2">
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input autoComplete={"off"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => {
                    return (
                      <FormItem className="col-span-1">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input autoComplete={"off"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => {
                    return (
                      <FormItem className="col-span-1">
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input
                            type={"number"}
                            autoComplete={"off"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="contact_no"
                  render={({ field }) => {
                    return (
                      <FormItem className="col-span-4">
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input autoComplete={"off"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
          </div>

          <div className=" flex w-3/5 flex-col gap-10 border-l-2 py-20">
            <Dialog>
              <DialogTrigger>
                <div className="mx-auto h-[200px] w-[200px] rounded-full bg-slate-300"></div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <p>Upload Profile Photo</p>
                </DialogHeader>
                {/*  @ts-ignore -- will add later */}
                <FileUploader
                  className="relative rounded-lg p-2"
                  dropzoneOptions={dropZoneConfig}
                  //onValueChange={props.setFiles}
                  // value={props.files}
                >
                  <FileInput className="py-10">
                    <div className="flex w-full flex-col items-center justify-center pb-4 pt-3">
                      <FileSvgDraw />
                    </div>
                  </FileInput>
                </FileUploader>
                <div className="flex justify-end">
                  <Button>Submit</Button>
                </div>
              </DialogContent>
            </Dialog>
            <p className="mt-2 text-center text-[13px] font-normal text-gray-500">
              Please select your image
            </p>
            <Button
              className="mx-auto h-[50px] w-[200px] text-lg"
              type="submit"
            >
              {isPending ? <LoadingSpinner /> : null}
              Proceed
            </Button>
            {error ? (
              <div
                className="mb-5 rounded border-s-4 border-red-500 bg-red-50 p-4"
                role="alert"
              >
                <p className="text-sm text-red-700">{error}</p>
              </div>
            ) : null}
          </div>
        </div>
      </form>
    </Form>

    //</div>
  );
}
