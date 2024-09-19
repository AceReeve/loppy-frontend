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
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@repo/ui/components/ui";
import type { z } from "zod";
import { campaignUseCaseSchema } from "@/src/app/dashboard/settings/compliance/_components/schemas/a2p-10dlc-registration-schemas";
import type { FormComponentProps } from "@/src/types/settings";

export default function CampaignUseCase({
  setFormData,
  setSaveEnabled,
}: FormComponentProps) {
  const form = useForm<z.infer<typeof campaignUseCaseSchema>>({
    resolver: zodResolver(campaignUseCaseSchema),
  });

  const onSubmit = (data: z.infer<typeof campaignUseCaseSchema>) => {
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
          name="useCase"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select the use case for your account</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger variant="outline">
                    <SelectValue placeholder="Select use case" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low_volume_mixed">
                      Low Volume Mixed
                    </SelectItem>
                    <SelectItem value="high_volume_mixed">
                      High Volume Mixed
                    </SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
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
              <FormLabel>Use Case Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Add a detailed description of how the use case you selected applies for your business."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
