import * as z from "zod";

export const campaignUseCaseSchema = z.object({
  useCase: z.string().min(1, "Use case is required"),
  description: z.string().min(1, "Description is required"),
});

export const sampleMessagesSchema = z.object({
  message1: z.string().min(1, "Sample message 1 is required"),
  message2: z.string().min(1, "Sample message 2 is required"),
});

export const optInMethodSchema = z.object({
  method: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  messageFlow: z
    .array(z.string())
    .refine((value) => value.every((item) => item.trim()), {
      message: "Message should not be empty",
    }),
  imageUrl: z.array(z.array(z.any())).refine((value) =>
    value.every((item) => item.length > 0, {
      message: "Image should not be empty",
    }),
  ),
  // imageUrl: z.array(z.string().url("Invalid URL")).refine((value) =>
  //   value.every((item) => item.trim(), {
  //     message: "Image should not be empty",
  //   }),
  // ),
});

export const optInImageSchema = z.object({
  imageUrl: z.string().url("Invalid URL"),
});

export const upgradeSchema = z.object({
  messagesPerMonth: z.array(
    z
      .number()
      .min(500, "Minimum 500 messages required")
      .max(10000, "Maximum 10000 messages allowed"),
  ),

  billingCycle: z.enum(["Monthly", "Annually"], {
    required_error: "Billing cycle is required",
  }),
});
