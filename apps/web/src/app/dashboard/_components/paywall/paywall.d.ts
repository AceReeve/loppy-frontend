import type { z } from "zod";
import {
  type OrganizationSchema,
  type SendInviteUsersSchema,
} from "@/src/schemas";

export interface TeamsSetupStepsProps {
  handleSubmitOrganization: (data: z.infer<typeof OrganizationSchema>) => void;
  handleSubmitInvitedList: (
    data: z.infer<typeof SendInviteUsersSchema>,
  ) => void;
  handleSubmitPermissions: () => void;
  handleFinalSubmit: () => void;
  setStepIndex: (number) => void;
  onPrevClicked: () => void;
  onNextClicked: () => void;
}
