import type { InviteUserResponse } from "@repo/redux-utils/src/endpoints/types/user";

export interface TeamsSetupStepsProps {
  emails?: InviteUserResponse["emails"];
  handleSubmitInvitedList: (_emails: string[]) => void;
  handleSubmitPermissions: () => void;
  handleFinalSubmit: () => void;
  setStepIndex: (number) => void;
}
