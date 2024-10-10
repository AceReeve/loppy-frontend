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
import { useGetAllInboxesQuery } from "@repo/redux-utils/src/endpoints/inboxes.ts";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { InboxAssignmentType } from "@repo/redux-utils/src/endpoints/enums/inbox.enums.ts";
import { useGetMembersQuery } from "@repo/redux-utils/src/endpoints/settings-user.ts";
import type { FormComponentProps } from "@/src/types/settings";
import { assignInboxSchema } from "../../schemas/buy-number-schemas.ts";

export default function AssignInbox({
  setSaveEnabled,
  id,
  onSubmit,
}: FormComponentProps) {
  const {
    data: members,
    isLoading: isMembersLoading,
    error,
  } = useGetMembersQuery(undefined);

  const { data: inboxesList, isLoading: isInboxesLoading } =
    useGetAllInboxesQuery(undefined);

  const form = useForm<z.infer<typeof assignInboxSchema>>({
    resolver: zodResolver(assignInboxSchema),
    defaultValues: {
      inbox_name: "",
      inbox_owner: members ? members.users[0].email : "",
    },
  });

  const inboxType = form.watch("inbox_assignment_type") as InboxAssignmentType;
  const inboxOwner = form.watch("inbox_owner");

  useEffect(() => {
    setSaveEnabled(form.formState.isValid);
  }, [form.formState.isValid]);

  useEffect(() => {
    if (members) {
      form.setValue("inbox_owner", members.users[0].email);
    }
  }, [members]);

  useEffect(() => {
    form.setValue("inbox_members", []);
  }, [inboxOwner]);

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
                        {isInboxesLoading ? <LoadingSpinner /> : null}
                        {inboxesList?.map((inbox) => (
                          <SelectItem key={inbox.inbox_name} value={inbox._id}>
                            {inbox.inbox_name}
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
                        value={field.value}
                      >
                        <SelectTrigger variant="outline">
                          <SelectValue placeholder="Select inbox owner" />
                        </SelectTrigger>
                        <SelectContent>
                          {isMembersLoading ? <LoadingSpinner /> : null}
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
                          {isMembersLoading ? <LoadingSpinner /> : null}
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
