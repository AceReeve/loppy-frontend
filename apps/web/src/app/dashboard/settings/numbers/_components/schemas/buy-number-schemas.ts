import * as z from "zod";
import { InboxAssignmentType } from "@repo/redux-utils/src/endpoints/enums/inbox.enums.ts";
import { NumberType } from "@repo/redux-utils/src/endpoints/enums/numbers.enums.ts";

export const chooseNumberSchema = z
  .object({
    type: z.string(),
    country: z
      .string({
        required_error: "Please select a country",
      })
      .optional(),
    state: z
      .string({
        required_error: "Please select a state",
      })
      .optional(),
    area_code: z
      .string({
        required_error: "Please select an area code",
      })
      .optional(),
    selectedNumber: z.string().min(1, "Please select a number"),
  })
  .refine((data) => {
    const type = data.type as NumberType;

    if (type === NumberType.LOCAL) {
      return data.country && data.state && data.area_code;
    }

    return true;
  });

export const assignInboxSchema = z
  .object({
    inbox_assignment_type: z.string({
      required_error: "Please select an assignment type",
    }),
    selected_inbox: z
      .string({
        required_error: "Please select an inbox",
      })
      .optional(),
    inbox_name: z
      .string({
        required_error: "Please type an inbox name",
      })
      .optional(),
    inbox_owner: z
      .string({
        required_error: "Please select an inbox owner",
      })
      .optional(),
    inbox_members: z
      .string({
        required_error: "Please select add inbox members",
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
