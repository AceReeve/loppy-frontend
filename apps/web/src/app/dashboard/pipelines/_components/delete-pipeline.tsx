import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  toast,
} from "@repo/ui/components/ui";
import { useDeletePipelineMutation } from "@repo/redux-utils/src/endpoints/pipelines";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";

interface DeletePipelineType {
  isOpen: boolean;
  onClose: () => void;
  pipelineId: string;
  refetch: () => void;
}

export default function DeletePipeline({
  isOpen,

  onClose,
  pipelineId,
  refetch,
}: DeletePipelineType) {
  const [sendRequest, { isLoading }] = useDeletePipelineMutation();
  const onSubmit = async () => {
    if (pipelineId === "") {
      toast({
        description: "No pipeline selected",
      });
      return;
    }

    await sendRequest(pipelineId)
      .unwrap()
      .then(() => {
        toast({
          description: "Pipeline deleted successfully",
        });
        refetch();
        onClose();
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Pipeline</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this pipeline?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            type="submit"
            onClick={() => {
              void onSubmit();
            }}
            disabled={isLoading}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
