import {
  Alert,
  AlertTitle,
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui";
import { AlertCircle } from "lucide-react";
import React from "react";
import { type businessLocationSchema } from "@/src/app/dashboard/settings/compliance/_components/schemas/business-profile-schemas.ts";
import type { FormComponentProps } from "@/src/types/settings";

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "other", label: "Other" },
  // Add more countries as needed
];

export default function BusinessLocation({
  form,
}: FormComponentProps<typeof businessLocationSchema>) {
  if (!form) return null;

  return (
    <>
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
    </>
  );
}
