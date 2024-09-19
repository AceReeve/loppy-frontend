import { DropdownMenuItem, toast } from "@repo/ui/components/ui";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useDeleteFolderMutation } from "@repo/redux-utils/src/endpoints/workflow.ts";

interface DeleteActionCellProps {
  id: string;
}
export default function DeleteActionCell(props: DeleteActionCellProps) {
  //const email = { props.email }; // Extract email from row data
  const [deleteFolder] = useDeleteFolderMutation();

  const handleDeleteFolder = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
        .catch((error: unknown) => {
          toast({
            description: getErrorMessage(error),
            variant: "destructive",
          });
        });
    } catch (error: unknown) {
      return <div>isError + {getErrorMessage(error)}</div>;
    }
  };

  return (
    <DropdownMenuItem onClick={handleDeleteFolder} className="cursor-pointer">
      Delete
      {/* <p>Cancel</p> {isLoading ? <LoadingSpinner /> : null}*/}
    </DropdownMenuItem>
  );
}
