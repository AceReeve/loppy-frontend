import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Email is invalid",
    }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Email is invalid",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const TwilioCredentialsSchema = z.object({
  ssid: z.string().min(1, {
    message: "SSID is required",
  }),
  auth_token: z.string().min(1, {
    message: "Auth Token is required",
  }),
  twilio_number: z.string().min(1, {
    message: "Twilio Number is required",
  }),
});

export const SendInviteSingleItemSchema = z
  .string()
  .min(1, {
    message: "Email is required",
  })
  .email({
    message: "Email is invalid",
  });
const tagSchema = z.object({
  tag_name: z.string(),
});

export const CreateContactsFormSchema = z.object({
  first_name: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  phone_number: z
    .string()
    .min(11, {
      message: "Invalid Phone Number",
    })
    .transform((value) => parseInt(value)),
  source: z.string().min(2, {
    message: "Source must be at least 2 characters.",
  }),
  lifetime_value: z
    .string()
    .min(1, {
      message: "Invalid Lifetime Value",
    })
    .transform((value) => parseInt(value)),
  last_campaign_ran: z.string().min(1, {
    message: "Last Campaign Ran must be at least 1 character.",
  }),
  last_interaction: z.string().min(1, {
    message: "Last Interaction must be at least 1 character.",
  }),

  tags: z.array(tagSchema).optional(),
});
