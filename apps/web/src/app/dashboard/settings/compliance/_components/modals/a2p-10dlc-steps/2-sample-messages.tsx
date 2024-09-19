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
  Input,
} from "@repo/ui/components/ui";
import type { z } from "zod";
import type { FormComponentProps } from "@/src/types/settings";
import { sampleMessagesSchema } from "../../schemas/a2p-10dlc-registration-schemas.ts";

export default function SampleMessages({
  setFormData,
  setSaveEnabled,
}: FormComponentProps) {
  const form = useForm<z.infer<typeof sampleMessagesSchema>>({
    resolver: zodResolver(sampleMessagesSchema),
  });

  const onSubmit = (data: z.infer<typeof sampleMessagesSchema>) => {
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sample Message</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter a sample message" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
