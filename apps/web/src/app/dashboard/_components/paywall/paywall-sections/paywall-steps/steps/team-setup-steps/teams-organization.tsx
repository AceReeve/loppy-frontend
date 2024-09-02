import { ArrowRightIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@repo/ui/components/ui";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { OrganizationSchema } from "@/src/schemas";
import type { TeamsSetupStepsProps } from "@/src/app/dashboard/_components/paywall/paywall.d.ts";

export default function TeamsOrganization(props: TeamsSetupStepsProps) {
  const form = useForm<z.infer<typeof OrganizationSchema>>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      organization_name: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          props.handleSubmitOrganization(data);
        })}
        className="flex w-full flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="organization_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="What do you want us to call your organization?"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us more about your organization."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!form.formState.isValid}
          type="submit"
          className="gap-2"
          size="lg"
        >
          Next
          <ArrowRightIcon className="size-4" />
        </Button>
      </form>
    </Form>
  );
}
