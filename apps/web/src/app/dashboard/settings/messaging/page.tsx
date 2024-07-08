"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "@repo/ui/components/ui";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import {
  useGetTwilioCredentialsQuery,
  useSetTwilioCredentialsMutation,
} from "@repo/redux-utils/src/endpoints/messaging.ts";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";

const MessagingCredsSchema = z.object({
  twilio_account_sid: z.string().min(1),
  twilio_chat_service_sid: z.string().min(1),
  twilio_api_key_sid: z.string().min(1),
  twilio_api_key_secret: z.string().min(1),
  twilio_auth_token: z.string().min(1),
  twilio_number: z.string().min(1),
});

export default function Page() {
  const { data: twilioCredentials, isLoading: isGetLoading } =
    useGetTwilioCredentialsQuery(undefined);

  const [setTwilioCredentials, { isLoading: isSetLoading }] =
    useSetTwilioCredentialsMutation();

  const form = useForm<z.infer<typeof MessagingCredsSchema>>({
    resolver: zodResolver(MessagingCredsSchema),
    values: twilioCredentials,
  });

  const inputs: z.infer<typeof MessagingCredsSchema> = {
    twilio_account_sid: "Twilio Account SID",
    twilio_auth_token: "Twilio Auth Token",
    twilio_number: "Twilio Proxy Number",
    twilio_chat_service_sid: "Twilio Chat Service SID",
    twilio_api_key_sid: "Twilio API Key SID",
    twilio_api_key_secret: "Twilio API Key Secret",
  };

  const isLoading = isSetLoading || isGetLoading;

  const onSubmit = (values: z.infer<typeof MessagingCredsSchema>) => {
    setTwilioCredentials(values)
      .then(() => {
        toast({
          description: "Successfully saved",
        });
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
          variant: "destructive",
        });
      });
  };

  return (
    <>
      <div className="relative">
        <div className="font-inter text-lg font-semibold leading-normal text-gray-800">
          Twilio Credentials
        </div>
        <div className="w-[604px] font-inter text-sm font-normal leading-normal text-gray-600">
          Enter twilio credentials manually to access messaging features
        </div>
      </div>

      <Form {...form}>
        <form
          className="mt-4 grid grid-cols-2 gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {Object.entries(inputs).map(([key, value]) => (
            <div className="relative w-full" key={key}>
              <FormField
                control={form.control}
                name={key as keyof typeof inputs}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-inter text-sm font-normal text-gray-500">
                      {value}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={value} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <div className="col-span-2 mt-3 flex w-full justify-end">
            <Button
              className="mt-2 min-w-[100px] gap-2"
              type="submit"
              disabled={isLoading || !form.formState.isDirty}
            >
              {isLoading ? <LoadingSpinner /> : null}
              Save
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
