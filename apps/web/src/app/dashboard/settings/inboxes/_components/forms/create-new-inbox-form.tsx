import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
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
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { useGetMembersQuery } from "@repo/redux-utils/src/endpoints/settings-user.ts";
import { createInboxSchema } from "@/src/app/dashboard/settings/inboxes/_components/schemas/create-inbox-schemas.ts";
import type { FormComponentProps } from "@/src/types/settings";

export default function CreateNewInboxForm({
  setSaveEnabled,
  id,
  onSubmit,
}: FormComponentProps) {
  const { data: members, isLoading, error } = useGetMembersQuery(undefined);

  const schema = createInboxSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      inbox_name: "",
    },
  });

  useEffect(() => {
    setSaveEnabled(form.formState.isValid);
  }, [form.formState.isValid, onSubmit]);

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
        className="flex flex-col gap-4"
        id={id}
      >
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{getErrorMessage(error)}</AlertDescription>
          </Alert>
        ) : null}
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
                    <SelectValue placeholder="Select inbox owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoading ? <LoadingSpinner /> : null}
                    {members?.users.map((member) => (
                      <SelectItem key={member._id} value={member.email}>
                        {member.email}
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
                    <MultiSelectorInput placeholder="Select inbox members" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {members?.users.map((option) => (
                        <MultiSelectorItem
                          key={option._id}
                          value={option.email}
                        >
                          {option.email}
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
      </form>
    </Form>
  );
}
