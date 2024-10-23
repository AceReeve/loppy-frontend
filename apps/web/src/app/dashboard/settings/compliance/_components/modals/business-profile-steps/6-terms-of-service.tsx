import React from "react";
import {
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui";
import Link from "next/link";
import { type FormComponentProps } from "@/src/types/settings";
import { type termsOfServiceSchema } from "@/src/app/dashboard/settings/compliance/_components/schemas/business-profile-schemas.ts";

export default function TermsOfService({
  form,
}: FormComponentProps<typeof termsOfServiceSchema>) {
  if (!form) return null;

  return (
    <>
      <p className="mt-2 text-gray-500">
        Servihero will process your personal data according to the{" "}
        <Link
          href="https://www.twilio.com/legal/privacy"
          className="text-primary"
        >
          Twilio Privacy Statement
        </Link>
      </p>

      <FormField
        control={form.control}
        name="agreedToTOS"
        render={({ field }) => (
          <FormItem>
            <div className="mt-4 flex gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">
                I declare that the information provided is accurate. I
                acknowledge that Twilio will be processing the information
                provided for the purposes of identity verification, and that
                Twilio reserves the right to retain the Business Profile
                information after account closure in the case of a traceback
                from a regulatory authority or equivalent.
              </FormLabel>
            </div>
            <FormMessage className="ml-6 text-sm font-normal" />
          </FormItem>
        )}
      />
    </>
  );
}
