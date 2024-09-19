import * as z from "zod";

export const createInboxSchema = z.object({
  inbox_name: z
    .string({
      required_error: "Please set an inbox name",
    })
    .min(1, "Inbox name is required"),
  inbox_owner: z.string({
    required_error: "Please select an inbox owner",
  }),
  inbox_members: z.string().array().optional(),
});
