import { useCancelInviteMutation } from "@repo/redux-utils/src/endpoints/settings-user";
import { Button, toast } from "@repo/ui/components/ui";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import React, { useState } from "react";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";

interface ActionCellProps {
  email: string;
}
export default function ActionCell(props: ActionCellProps) {
  //const email = { props.email }; // Extract email from row data
  const [cancelInvite, { isLoading }] = useCancelInviteMutation();

  const handleCancelInvite = async () => {
    try {
      await cancelInvite(props)
        .unwrap()
        .then(() => {
          toast({
            description: props.email + " invite has been cancelled",
            variant: "success",
          });
        })
        .catch((e: unknown) => {
          toast({
            description: getErrorMessage(e),
            variant: "destructive",
          });
        });
    } catch (error: unknown) {
      return <div>isError + {getErrorMessage(error)}</div>;
    }
  };

  return (
    <div className="inline flex h-8 flex-col items-end">
      <Button
        variant={"destructive"}
        onClick={handleCancelInvite}
        className="space-x-2 px-4 py-2"
      >
        <p>Cancel</p> {isLoading ? <LoadingSpinner /> : null}
      </Button>
    </div>
  );
}
