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
  Checkbox,
} from "@repo/ui/components/ui";
import type { z } from "zod";
import type { StepComponentProps } from "@/src/types/settings";
import { optInMethodSchema } from "../../schemas/a2p-10dlc-registration-schemas.ts";

const optInMethods = [
  { value: "text", label: "Text" },
  { value: "online-form", label: "Online Form" },
  // Add more countries as needed
];

export default function OptInMethod({
  setFormData,
  setSaveEnabled,
}: StepComponentProps) {
  const form = useForm<z.infer<typeof optInMethodSchema>>({
    resolver: zodResolver(optInMethodSchema),
    defaultValues: {
      method: [],
    },
  });

  const onSubmit = (data: z.infer<typeof optInMethodSchema>) => {
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
        <FormField
          control={form.control}
          name="method"
          render={() => (
            <FormItem>
              <FormLabel>
                Select one or more of the options below for how your customers
                opt-in to receive text messages.
              </FormLabel>
              {optInMethods.map((item) => (
                <FormField
                  key={item.value}
                  control={form.control}
                  name="method"
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
