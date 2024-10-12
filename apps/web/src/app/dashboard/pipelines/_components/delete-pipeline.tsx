import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  toast,
} from "@repo/ui/components/ui";
import { useDeletePipelineMutation } from "@repo/redux-utils/src/endpoints/pipelines";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useState } from "react";

interface DeletePipelineType {
  pipelineId: string;
  refetch: () => void;
}

export default function DeletePipeline({
  pipelineId,
  refetch,
}: DeletePipelineType) {
  const [isOpen, setIsOpen] = useState(false);

  const [sendRequest, { isLoading }] = useDeletePipelineMutation();
  const onSubmit = async () => {
    await sendRequest(pipelineId)
      .unwrap()
      .then(() => {
        toast({
          description: "Pipeline deleted successfully",
        });
        refetch();
        setIsOpen(false);
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive" type="button">
          Delete
        </Button>
      </DialogTrigger>
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
