import {
  Alert,
  AlertTitle,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui";
import { AlertCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessLocationSchema } from "@/src/app/dashboard/settings/compliance/_components/schemas/business-profile-schemas.ts";
import type { FormComponentProps } from "@/src/types/settings";

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "other", label: "Other" },
  // Add more countries as needed
];

export default function BusinessLocation({
  setFormData,
  setSaveEnabled,
}: FormComponentProps) {
  const form = useForm<z.infer<typeof businessLocationSchema>>({
    resolver: zodResolver(businessLocationSchema),
    defaultValues: {
      business_locations: [],
    },
    mode: "onBlur",
  });

  const onSubmit = (data: z.infer<typeof businessLocationSchema>) => {
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
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="flex w-full justify-between text-sm font-semibold">
            Which country do you want to send messages to?
          </AlertTitle>
        </Alert>
        <FormField
          control={form.control}
          name="business_locations"
          render={() => (
            <FormItem>
              {countries.map((item) => (
                <FormField
                  key={item.value}
                  control={form.control}
                  name="business_locations"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.value}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(item.value)}
                            onCheckedChange={(checked) => {
                              checked
                                ? field.onChange([...field.value, item.value])
                                : field.onChange(
                                    field.value.filter(
                                      (value) => value !== item.value,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
