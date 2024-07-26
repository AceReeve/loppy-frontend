"use client";

import React, { useEffect } from "react";
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui";
import { cn } from "@repo/ui/utils";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import { usePaywallState } from "@/src/providers/paywall-provider.tsx";
import { states } from "@/src/data/us-states";

export default function PaywallUserInformation() {
  const { setNextStepEnabled, form } = usePaywallState();

  useEffect(() => {
    setNextStepEnabled(form.formState.isValid);
  }, [form.formState.isValid]);

  return (
    <Form {...form}>
      <form className="grid grid-cols-12 gap-4">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => {
            return (
              <FormItem className="col-span-6">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    {...field}
                    placeholder="Enter your first name"
                  />
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
              <FormItem className="col-span-6">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    {...field}
                    placeholder="Enter your last name"
                  />
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
            <FormItem className="col-span-6">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "min-h-10 w-full text-left",
                        !field.value && "text-gray-400",
                      )}
                      onBlur={field.onBlur}
                    >
                      {field.value ? (
                        moment(field.value).format("LL")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 font-light text-gray-700" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={field.value}
                    initialFocus
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    fromYear={1960}
                    toYear={new Date().getFullYear()}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger variant="outline" onBlur={field.onBlur}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => {
            return (
              <FormItem className="col-span-full">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    {...field}
                    placeholder="Enter your address line 1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="address2"
          render={({ field }) => {
            return (
              <FormItem className="col-span-full">
                <FormLabel>Address Line 2</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    {...field}
                    placeholder="Enter your address line 2 (Optional)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>State</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger variant="outline">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => {
            return (
              <FormItem className="col-span-6">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    {...field}
                    placeholder="Enter your city"
                  />
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
              <FormItem className="col-span-6">
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    autoComplete="off"
                    {...field}
                    placeholder="Enter your zip code"
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
              <FormItem className="col-span-6">
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    {...field}
                    placeholder="Enter your mobile number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </form>
    </Form>
  );
}
