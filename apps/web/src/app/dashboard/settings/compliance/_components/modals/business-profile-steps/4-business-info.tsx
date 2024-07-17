import React, { useEffect } from "react";
import {
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@repo/ui/components/ui";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessInfoSchema } from "@/src/app/dashboard/settings/compliance/_components/schemas/business-profile-schemas.ts";
import type { StepComponentProps } from "@/src/types/settings";

export default function BusinessInfo({
  setFormData,
  setSaveEnabled,
}: StepComponentProps) {
  const form = useForm<z.infer<typeof businessInfoSchema>>({
    resolver: zodResolver(businessInfoSchema),
  });
  const onSubmit = (data: z.infer<typeof businessInfoSchema>) => {
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
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Type</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger variant="outline">
                      <SelectValue placeholder="e.g. LLC" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="llc">LLC</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="sole_proprietorship">
                        Sole Proprietorship
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="businessIndustry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Industry</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger variant="outline">
                      <SelectValue placeholder="e.g. Online" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="e.g. https://example.com"
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
