import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Button,
  Slider,
} from "@repo/ui/components/ui";
import type { z } from "zod";
import type { FormComponentProps } from "@/src/types/settings";
import { upgradeSchema } from "../../schemas/a2p-10dlc-registration-schemas";

export default function Upgrade({
  setFormData,
  setSaveEnabled,
}: FormComponentProps) {
  const form = useForm<z.infer<typeof upgradeSchema>>({
    resolver: zodResolver(upgradeSchema),
    defaultValues: {
      messagesPerMonth: [500],
    },
  });

  const onSubmit = (data: z.infer<typeof upgradeSchema>) => {
    setFormData?.((prevState) => ({ ...prevState, ...data }));
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
        <FormField
          control={form.control}
          name="messagesPerMonth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How many messages will you send per month?</FormLabel>
              <FormControl>
                <Slider min={500} max={10000} step={500} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billingCycle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Cycle</FormLabel>
              <FormControl>
                <Button variant="outline" {...field}>
                  Monthly
                </Button>
              </FormControl>
              <FormControl>
                <Button variant="outline" {...field}>
                  Annually
                </Button>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
