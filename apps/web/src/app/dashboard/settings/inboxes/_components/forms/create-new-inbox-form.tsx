import React, { useEffect } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
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
import { type createInboxSchema } from "@/src/app/dashboard/settings/inboxes/_components/schemas/create-inbox-schemas.ts";
import type { FormComponentProps } from "@/src/types/settings";

export default function CreateNewInboxForm({
  form,
  isActive,
}: FormComponentProps<typeof createInboxSchema>) {
  const { data: members, isLoading, error } = useGetMembersQuery(undefined);

  const inboxOwner = form?.watch("inbox_owner");

  useEffect(() => {
    if (members && form && isActive) {
      form.setValue("inbox_owner", members.users[0].email);
    }
  }, [members, isActive]);

  useEffect(() => {
    form?.setValue("inbox_members", []);
  }, [inboxOwner]);

  if (!form) return null;

  return (
    <>
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
              <Select onValueChange={field.onChange} value={field.value}>
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
            <FormLabel>Additional Inbox Members</FormLabel>
            <FormControl>
              <MultiSelector
                values={field.value ?? []}
                onValuesChange={field.onChange}
              >
                <MultiSelectorTrigger>
                  <MultiSelectorInput placeholder="Select additional inbox members" />
                </MultiSelectorTrigger>
                <MultiSelectorContent>
                  <MultiSelectorList>
                    {members?.users
                      .filter((user) => user.email !== inboxOwner)
                      .map((option) => (
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
    </>
  );
}
