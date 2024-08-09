import * as z from "zod";
import { InboxAssignmentType } from "@repo/redux-utils/src/endpoints/enums/inbox.enums.ts";

export const chooseNumberSchema = z.object({
  country: z.string({
    required_error: "Please select a country",
  }),
  state: z.string({
    required_error: "Please select a state",
  }),
  area_code: z.string({
    required_error: "Please select an area code",
  }),
  selectedNumber: z.string().min(1, "Please select a number"),
});

export const assignInboxSchema = z
  .object({
    inbox_assignment_type: z.string({
      required_error: "Please select an inbox",
    }),
    selected_inbox: z
      .string({
        required_error: "Please select an inbox",
      })
      .optional(),
    inbox_name: z
      .string({
        required_error: "Please select an inbox",
      })
      .optional(),
    inbox_owner: z
      .string({
        required_error: "Please select an inbox",
      })
      .optional(),
    inbox_members: z
      .string({
        required_error: "Please select an inbox",
      })
      .array()
      .optional(),
  })
  .refine((data) => {
    const type = data.inbox_assignment_type as InboxAssignmentType;
    if (type === InboxAssignmentType.EXISTING) {
      return Boolean(data.selected_inbox);
    }

    if (type === InboxAssignmentType.NEW) {
      return data.inbox_name && data.inbox_owner && data.inbox_members?.length;
    }

    return true;
  });
