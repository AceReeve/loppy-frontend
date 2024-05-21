import type { InviteUserResponse } from "@/src/endpoints/types/user";

export interface TeamsSetupStepsProps {
  emails?: InviteUserResponse["emails"];
  handleSubmitInvitedList: (_emails: string[]) => void;
  handleSubmitPermissions: () => void;
}
