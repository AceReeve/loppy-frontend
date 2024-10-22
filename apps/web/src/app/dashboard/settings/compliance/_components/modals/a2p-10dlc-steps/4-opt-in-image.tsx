import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
} from "@repo/ui/components/ui";
import type { FormComponentProps } from "@/src/types/settings";
import { type optInImageSchema } from "../../schemas/a2p-10dlc-registration-schemas.ts";

export default function OptInImage({
  form,
}: FormComponentProps<typeof optInImageSchema>) {
  if (!form) return null;
  return (
    <FormField
      control={form.control}
      name="imageUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Please provide images of the opt-in process and what a subscriber is
            agreeing to.
          </FormLabel>
          <FormControl>
            <Input type="file" accept="image/*" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
