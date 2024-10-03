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
import { useDeleteOpportunityMutation } from "@repo/redux-utils/src/endpoints/pipelines";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { type UniqueIdentifier } from "@dnd-kit/core";
import { type Opportunity } from "../page";

interface DeleteOpportunityType {
  opportunity: Opportunity | null;
  onDeleteOpportunity: (opportunityId: UniqueIdentifier) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteOpportunity({
  opportunity,
  onDeleteOpportunity,
  isOpen,
  onClose,
}: DeleteOpportunityType) {
  const [sendRequest, { isLoading }] = useDeleteOpportunityMutation();
  const onSubmit = async () => {
    await sendRequest(opportunity?._id ?? "")
      .unwrap()
      .then(() => {
        toast({
          description: "Opportunity deleted successfully",
        });
        onDeleteOpportunity(opportunity?.id ?? "");
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
          <DialogTitle>Delete Opportunity</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this opportunity?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <h2 className="text-center text-2xl text-slate-500">
            &quot;{opportunity?.title}&quot;
          </h2>
        </div>
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
