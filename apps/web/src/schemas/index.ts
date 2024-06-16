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

export const RegisterDetailsSchema = z.object({
  first_name: z.string().min(3, { message: "First Name is required" }),
  last_name: z.string().min(3, { message: "Last Name is required" }),
  address: z.string().min(3, { message: "Address is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  sex: z.string().min(1, { message: "Gender is required" }),
  phone_number: z.string().regex(/^\d{6,}$/, {
    message: "Mobile Number must be numeric and at least 6 digits",
  }),
  birth_date: z.string().min(1, {
    message: "Date of Birth must be a valid date",
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

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirmation password must be at least 6 characters long",
    }),
    /*    name: z.string().min(1, {
      message: "Name is required",
    }),*/
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
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
    .min(4, {
      message: "Invalid Phone Number",
    })
    .transform((value) => parseInt(value)),
  source: z.string().min(2, {
    message: "Source must be at least 2 characters.",
  }),
  lifetime_value: z
    .string()
    .min(4, {
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
