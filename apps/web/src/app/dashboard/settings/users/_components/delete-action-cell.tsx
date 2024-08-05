import { useCancelInviteMutation } from "@repo/redux-utils/src/endpoints/settings-user";
import { DropdownMenuItem, toast } from "@repo/ui/components/ui";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";

interface ActionCellProps {
  email: string;
}
export default function ActionCell(props: ActionCellProps) {
  //const email = { props.email }; // Extract email from row data
  const [cancelInvite] = useCancelInviteMutation();

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
      <DropdownMenuItem
        onClick={handleCancelInvite}
        className="h-full w-full cursor-pointer"
      >
        <p>Revoke Invite</p>
        {/* <p>Cancel</p> {isLoading ? <LoadingSpinner /> : null}*/}
      </DropdownMenuItem>
    </div>
  );
}
