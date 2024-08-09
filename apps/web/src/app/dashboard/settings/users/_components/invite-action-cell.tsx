import { useSendInviteUserMutation } from "@repo/redux-utils/src/endpoints/settings-user";
import { DropdownMenuItem, toast } from "@repo/ui/components/ui";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import type { GetSendInviteUserPayload } from "@repo/redux-utils/src/endpoints/types/settings-user";
import React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendInviteUsersSchema } from "@/src/schemas";

interface ActionCellProps {
  email: string;
  role: string;
}
export default function InviteActionCell(props: ActionCellProps) {
  //const email = { props.email }; // Extract email from row data
  const [inviteUser] = useSendInviteUserMutation();
  const formSchema = SendInviteUsersSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      users: [
        {
          email: props.email,
          role: props.role,
        },
      ],
    },
  });
  const handleResendInvite = async () => {
    try {
      const userInvite: GetSendInviteUserPayload = form.getValues();
      await inviteUser(userInvite)
        .unwrap()
        .then(() => {
          toast({
            description: `${props.email} invite has been cancelled`,
            variant: "success",
          });
        })
        .catch((e: unknown) => {
          toast({
            description: getErrorMessage(e),
            variant: "destructive",
          });
        });
    } catch (error) {
      return <div>isError + {getErrorMessage(error)}</div>;
    }
  };
  return (
    <div className="inline flex h-8 flex-col items-end">
      <DropdownMenuItem
        onClick={handleResendInvite}
        className="h-full w-full cursor-pointer"
      >
        <p>Resend Invite</p>
        {/* <p>Cancel</p> {isLoading ? <LoadingSpinner /> : null}*/}
      </DropdownMenuItem>
    </div>
  );
}
