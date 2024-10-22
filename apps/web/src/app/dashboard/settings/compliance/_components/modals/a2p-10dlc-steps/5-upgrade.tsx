import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Button,
  Slider,
} from "@repo/ui/components/ui";
import type { FormComponentProps } from "@/src/types/settings";
import { type upgradeSchema } from "../../schemas/a2p-10dlc-registration-schemas";

export default function Upgrade({
  form,
}: FormComponentProps<typeof upgradeSchema>) {
  if (!form) return null;

  return (
    <>
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
    </>
  );
}
