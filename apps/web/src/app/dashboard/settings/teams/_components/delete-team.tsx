"use client";

import { useState } from "react";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useDeleteTeamMutation } from "@repo/redux-utils/src/endpoints/manage-team";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  toast,
} from "@repo/ui/components/ui";

interface DeleteTeamProps {
  teamId: string;
  refetchTeamList: () => void;
}

export default function DeleteTeam(props: DeleteTeamProps) {
  const [open, setOpen] = useState(false);
  const [sendRequest, { isLoading }] = useDeleteTeamMutation();

  const handleDeleteTeam = async () => {
    await sendRequest(props.teamId)
      .unwrap()
      .then(() => {
        toast({
          description: "Team has been deleted successfully",
        });
        props.refetchTeamList();
        setOpen(false); // Close the dialog after success
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Team</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this team? This action cannot be
            undone, and all associated data will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={() => {
              void handleDeleteTeam();
            }}
          >
            Delete Team
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
