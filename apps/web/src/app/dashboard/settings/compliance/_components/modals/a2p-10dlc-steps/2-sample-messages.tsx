import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Textarea,
  Alert,
  AlertDescription,
} from "@repo/ui/components/ui";
import { AlertCircle } from "lucide-react";
import type { FormComponentProps } from "@/src/types/settings";
import { type sampleMessagesSchema } from "../../schemas/a2p-10dlc-registration-schemas.ts";

export default function SampleMessages({
  form,
}: FormComponentProps<typeof sampleMessagesSchema>) {
  if (!form) return null;

  return (
    <>
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Maintain consistency in sample messages and use cases. If you register
          a <b>Marketing</b> campaign, but sample messages say “Here’s your
          one-time passcode: 123456”, your campaign will be rejected.
          <br />
          <br />
          The following is needed:
          <ul>
            <li> - Identify message sender (brand)</li>
            <li> - Indicate templated fields with brackets</li>
            <li>
              - Please consider adding language such as “Please reply STOP to
              opt out” in one of your sample messages
            </li>
          </ul>
        </AlertDescription>
      </Alert>
      <FormField
        control={form.control}
        name="message1"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sample Message 1</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Provide message example highlighting use case"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="message2"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sample Message 2</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Provide another message example highlighting use case"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
