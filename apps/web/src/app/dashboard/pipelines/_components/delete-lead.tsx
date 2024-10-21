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
import { useDeleteLeadMutation } from "@repo/redux-utils/src/endpoints/pipelines";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { type UniqueIdentifier } from "@dnd-kit/core";
import { type Lead } from "../page";

interface DeleteLeadType {
  lead: Lead | null;
  onDeleteLead: (leadId: UniqueIdentifier) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteLead({
  lead,
  onDeleteLead,
  isOpen,
  onClose,
}: DeleteLeadType) {
  const [sendRequest, { isLoading }] = useDeleteLeadMutation();
  const onSubmit = async () => {
    await sendRequest(lead?._id ?? "")
      .unwrap()
      .then(() => {
        toast({
          description: "Lead deleted successfully",
        });
        onDeleteLead(lead?.id ?? "");
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
            &quot;{lead?.opportunity_name}&quot;
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
