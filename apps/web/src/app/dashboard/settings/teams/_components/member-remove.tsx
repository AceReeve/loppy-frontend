"use client";

import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useDeleteTeamMemberMutation } from "@repo/redux-utils/src/endpoints/manage-team";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  toast,
} from "@repo/ui/components/ui";
import { type Row } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";

interface TeamMembers {
  _id: string;
  email: string;
  role_name: string;
  status: string;
}

export default function MemberRemove({ row }: { row: Row<TeamMembers> }) {
  const [sendRequest, { isLoading }] = useDeleteTeamMemberMutation();
  const user = row.original;

  const handleRemove = () => {
    sendRequest({ teamId: "66e434bdcc5c3ec712833bd9", memberId: user._id })
      .unwrap()
      .then(() => {
        toast({
          description: "Member removed successfully",
        });
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleRemove} disabled={isLoading}>
            Remove Member
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
