import { DropdownMenuItem, toast } from "@repo/ui/components/ui";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useDeleteFolderMutation } from "@repo/redux-utils/src/endpoints/workflow.ts";

interface DeleteActionCellProps {
  id: string;
}
export default function DeleteActionCell(props: DeleteActionCellProps) {
  //const email = { props.email }; // Extract email from row data
  const [deleteFolder] = useDeleteFolderMutation();

  const handleDeleteFolder = async () => {
    try {
      await deleteFolder(props)
        .unwrap()
        .then(() => {
          toast({
            title: "Deleted Successfully",
            description: `Folder has been deleted`,
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
        onClick={handleDeleteFolder}
        className="h-full w-full cursor-pointer"
      >
        <p>Delete</p>
        {/* <p>Cancel</p> {isLoading ? <LoadingSpinner /> : null}*/}
      </DropdownMenuItem>
    </div>
  );
}
