"use client";
import Image from "next/image";
import {
  Button,
  Form,
  /*  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,*/
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@repo/ui/components/ui";
/*import { useForm } from "react-hook-form";
import { any, z } from "zod";*/
import React from "react";

export default function ProfileTab() {
  return (
    <div className="font-poppins">
      <div className=" space-x-10 p-8 ">
        <div className="flex w-[200px] w-full items-center justify-between border-2 border-gray-300 px-10 py-6">
          <div className="flex items-center space-x-10">
            <div className="my-4 flex h-[120px] w-[120px] flex-col content-center rounded-full bg-slate-200 shadow-lg">
              <Image
                src="/assets/images/logo.png"
                alt=""
                width={138}
                height={141}
                className="m-auto size-[100px] w-[100px] object-contain transition-all duration-500"
              />
            </div>
            <div>
              <h1 className="text-xl">Raphael Adrian</h1>
              <div className="w-[100px] rounded-md bg-orange-500">
                <p className="text-center text-white">Admin</p>
              </div>
            </div>
          </div>
          <div className="flex w-[190px] flex-col justify-center">
            <Button variant="outline" className="rounded-none">
              Upload Image
            </Button>
            <p className=" text-center text-[12px] italic text-slate-300">
              We recommend an image of at least 512x512 resolution.
            </p>
          </div>
        </div>
      </div>

      <div>
        <Form>
          <form className="space-y-12 px-10 py-2">
            <div className="space-y-2">
              <h1 className="text-xl text-slate-600">Personal Information</h1>
              <Separator />
              <div className="grid grid-cols-9 gap-10 p-4">
                <div className="col-span-4 space-y-2">
                  <p className="text-sm">First Name</p>
                  <Input
                    autoComplete="off"
                    placeholder="First Name"
                    defaultValue="Raphael"
                  />
                </div>
                <div className="col-span-4 space-y-2">
                  <p className="text-sm">Last Name</p>
                  <Input
                    autoComplete="off"
                    placeholder="Last Name"
                    defaultValue="Adrian"
                  />
                </div>
                <div className="col-span-4 space-y-2">
                  <p className="text-sm">Birth Date</p>
                  <Input
                    autoComplete="off"
                    placeholder="Birth Date"
                    defaultValue="April 1, 2012"
                  />
                </div>
                <div className="col-span-4 space-y-2">
                  <p className="text-sm">Gender</p>
                  <Select defaultValue="male">
                    <SelectTrigger
                      className="text-md h-[40px] text-slate-500"
                      variant="outline"
                    >
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {/*    <FormField
                  //control={form.control}
                  //name="first_name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />*/}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-xl text-slate-600">Contact Information</h1>
              <Separator />
              <div className="grid grid-cols-9 gap-10 p-4">
                <div className="col-span-4 space-y-2">
                  <p className="text-sm">Phone Number</p>
                  <Input
                    autoComplete="off"
                    placeholder="First Name"
                    defaultValue="+63 992844728"
                  />
                </div>
                <div className="col-span-4 space-y-2">
                  <p className="text-sm">City</p>
                  <Input autoComplete="off" defaultValue="Tokyo" />
                </div>
                <div className="col-span-4 space-y-2">
                  <p className="text-sm">State</p>
                  <Input autoComplete="off" defaultValue="Kanto" />
                </div>
                <div className="col-span-2 space-y-2">
                  <p className="text-sm">Zip Code</p>
                  <Input autoComplete="off" defaultValue="2009" />
                </div>
                <div className="col-span-8 space-y-2">
                  <p className="text-sm"> Address</p>
                  <Input
                    autoComplete="off"
                    placeholder="Address"
                    defaultValue="#1 Japan Two Three 45 Street Nippon, Edo Earth"
                  />
                  {/*    <FormField
                  //control={form.control}
                  //name="first_name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />*/}
                </div>
              </div>
              <div className="flex items-end justify-end">
                <Button className="w-[150px]">Update</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
