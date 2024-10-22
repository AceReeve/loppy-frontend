import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
} from "@repo/ui/components/ui";
import type { FormComponentProps } from "@/src/types/settings";
import { type peopleToContactSchema } from "@/src/app/dashboard/settings/compliance/_components/schemas/business-profile-schemas.ts";

export default function PeopleToContact({
  form,
}: FormComponentProps<typeof peopleToContactSchema>) {
  if (!form) return null;
  return (
    <>
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="businessTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Business Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="jobPosition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Position</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Job Position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="businessEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Business Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="mobilePhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Mobile Phone Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
