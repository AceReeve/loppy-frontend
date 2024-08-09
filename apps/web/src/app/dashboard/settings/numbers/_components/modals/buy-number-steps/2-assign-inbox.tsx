import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui";
import { AlertCircle } from "lucide-react";
import React, { useEffect } from "react";
import { type z } from "zod";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useGetAvailableInboxesQuery } from "@repo/redux-utils/src/endpoints/inboxes.ts";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { InboxAssignmentType } from "@repo/redux-utils/src/endpoints/enums/inbox.enums.ts";
import type { StepComponentProps } from "@/src/types/settings";
import { assignInboxSchema } from "../../schemas/buy-number-schemas.ts";

export default function AssignInbox({
  setFormData,
  setSaveEnabled,
}: StepComponentProps) {
  const form = useForm<z.infer<typeof assignInboxSchema>>({
    resolver: zodResolver(assignInboxSchema),
  });
  const {
    data: availableInboxes,
    isLoading,
    error,
  } = useGetAvailableInboxesQuery({
    limit: "10",
    type: "tollFree",
    countryCode: "US",
  });

  const inboxType = form.watch("inbox_assignment_type") as InboxAssignmentType;

  const onSubmit = (data: z.infer<typeof assignInboxSchema>) => {
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
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{getErrorMessage(error)}</AlertDescription>
          </Alert>
        ) : null}
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="inbox_assignment_type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger variant="outline">
                      <SelectValue placeholder="Select an inbox" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(InboxAssignmentType).map((inbox) => (
                        <SelectItem key={inbox} value={inbox}>
                          {inbox}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {inboxType === InboxAssignmentType.EXISTING ? (
            <FormField
              control={form.control}
              name="selected_inbox"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose Inbox</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger variant="outline">
                        <SelectValue placeholder="Select an inbox" />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoading ? <LoadingSpinner /> : null}
                        {availableInboxes?.map((inbox) => (
                          <SelectItem
                            key={inbox.phoneNumber}
                            value={inbox.phoneNumber}
                          >
                            {inbox.friendlyName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}

          {inboxType === InboxAssignmentType.NEW ? (
            <>
              <FormField
                control={form.control}
                name="inbox_name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Inbox Name</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="Enter Inbox Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="inbox_owner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inbox Owner</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger variant="outline">
                          <SelectValue placeholder="Select an inbox" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoading ? <LoadingSpinner /> : null}
                          {availableInboxes?.map((inbox) => (
                            <SelectItem
                              key={inbox.phoneNumber}
                              value={inbox.phoneNumber}
                            >
                              {inbox.friendlyName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inbox_members"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inbox Members</FormLabel>
                    <FormControl>
                      <MultiSelector
                        values={field.value ?? []}
                        onValuesChange={field.onChange}
                      >
                        <MultiSelectorTrigger>
                          <MultiSelectorInput placeholder="Select your framework" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {availableInboxes?.map((option) => (
                              <MultiSelectorItem
                                key={option.phoneNumber}
                                value={option.phoneNumber}
                              >
                                {option.friendlyName}
                              </MultiSelectorItem>
                            ))}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : null}
        </div>
        <span className="text-sm text-gray-600">
          Today you will be charged $4.08 for the discounted pro-rated cost of a
          new number.
        </span>
      </form>
    </Form>
  );
}
