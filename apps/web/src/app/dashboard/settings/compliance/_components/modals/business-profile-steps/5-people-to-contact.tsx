import React, { useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
} from "@repo/ui/components/ui";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { peopleToContactSchema } from "@/src/app/dashboard/settings/compliance/_components/schemas/business-profile-schemas.ts";
import type { StepComponentProps } from "@/src/types/settings";

export default function PeopleToContact({
  setFormData,
  setSaveEnabled,
}: StepComponentProps) {
  const form = useForm<z.infer<typeof peopleToContactSchema>>({
    resolver: zodResolver(peopleToContactSchema),
  });
  const onSubmit = (data: z.infer<typeof peopleToContactSchema>) => {
    setFormData((prevState) => ({ ...prevState, ...data }));
  };

  useEffect(() => {
    setSaveEnabled(form.formState.isValid);
  }, [form.formState.isValid]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
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
      </form>
    </Form>
  );
}
