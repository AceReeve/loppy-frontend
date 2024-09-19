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
import { optInImageSchema } from "../../schemas/a2p-10dlc-registration-schemas.ts";

export default function OptInImage({
  setFormData,
  setSaveEnabled,
}: FormComponentProps) {
  const form = useForm<z.infer<typeof optInImageSchema>>({
    resolver: zodResolver(optInImageSchema),
  });

  const onSubmit = (data: z.infer<typeof optInImageSchema>) => {
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
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Please provide images of the opt-in process and what a
                subscriber is agreeing to.
              </FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
