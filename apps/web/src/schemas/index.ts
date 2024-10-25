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
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  contact_no: z.string().regex(/^\d{6,}$/, {
    message: "Mobile Number must be numeric and at least 6 digits",
  }),

  birthday: z
    .date({
      required_error: "A date of birth is required.",
    })
    .optional(),
  zipCode: z
    .string()
    // eslint-disable-next-line prefer-named-capture-group -- disregard lint error
    .regex(/(^\d{5}$)|(^\d{5}-\d{4}$)/, { message: "Invalid zip code" }),
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

export const SendPasswordVerification = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
export const SetNewPasswordSchema = z
  .object({
    token: z.string(),
    password: z
      .string()
      .min(6, {
        message: "Minimum 6 characters required",
      })
      .max(32, { message: "Maximum of 32 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
    confirm_password: z.string().min(6, {
      message: "Confirmation password must be at least 6 characters long",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirm_password"],
        message: "Passwords do not match",
      });
    }
  });

export const SendRegisterOTPSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const ConfirmOTPSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  otp: z.string().min(6, { message: "Invalid OTP" }),
});

export const RegisterSchema = z
  .object({
    email: SendRegisterOTPSchema.shape.email,
    password: z
      .string()
      .min(6, {
        message: "Minimum 6 characters required",
      })
      .max(32, { message: "Maximum of 32 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
    confirm_password: z.string().min(6, {
      message: "Confirmation password must be at least 6 characters long",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirm_password"],
        message: "Passwords do not match",
      });
    }
  });

export const VerifyOTPSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  otp: z.string().min(4, { message: "Invalid OTP" }),
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
  phone_number: z.string().min(4, {
    message: "Invalid Phone Number",
  }),
  // .transform((value) => parseInt(value)),
  source: z.string().min(2, {
    message: "Source must be at least 2 characters.",
  }),

  last_campaign_ran: z.string().min(1, {
    message: "Last Campaign Ran must be at least 1 character.",
  }),

  last_interaction: z.date().refine(
    (date) => {
      // Ensure date is valid
      return !isNaN(date.getTime());
    },
    {
      message: "Last Interaction must be a valid date.",
    },
  ),

  /*  last_interaction: z.string().min(1, {
    message: "Last Interaction must be at least 1 character.",
  }),*/

  tags: z.array(tagSchema).optional(),
});

export const CreateWorkFolderSchema = z.object({
  id: z.string(),
  name: z.string().min(4, { message: "Minimum of 4 Characters" }),
});
export const EditWorkFolderSchema = z.object({
  id: z.string().min(4),
  name: z.string().min(4, { message: "Minimum of 4 Characters" }),
});

export const BaseNodeSchema = z.object({
  title: z.string().min(4, { message: "Invalid Node Name" }),
});

const filterSchema = z.object({
  filter: z.string().min(1, { message: "Filter is required" }),
  value: z.string().min(1, { message: "Value is required" }),
});
export const CreateBirthReminderSchema = BaseNodeSchema.extend({
  filters: z
    .array(filterSchema)
    .min(1, { message: "At least one filter is required" }),
});

export const TriggerContentSchema = BaseNodeSchema.extend({
  filters: z
    .array(filterSchema)
    .min(1, { message: "At least one filter is required" }),
});
export const CreateDateReminder = z.object({
  custom_date: z.date().refine((date) => {
    // Ensure date is valid
    return !isNaN(date.getTime());
  }),
});
export const CreateEmailActionSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(1, {
    message: "Message is Required",
  }),
});
export const CreateUpdateOpportunitySchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.object({
    pipeline_id: z.string().min(1, { message: "Pipeline is required" }),
    stage_id: z.string().min(1, { message: "Stage is required" }),
    user: z.string().min(1, { message: "User is required" }),
    opportunity_name: z
      .string()
      .min(1, { message: "Opportunity Name is required" }),
    opportunity_source: z
      .string()
      .min(1, { message: "Opportunity Source is required" }),
    status: z.string().min(1, {
      message: "Status is Required",
    }),
    lead_value: z.string().min(1, { message: "Lead Value is required" }),
  }),
});
export const OpportunityStatusChangedSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.object({
    pipeline_id: z.string().min(1, { message: "Pipeline is required" }),
    assigned_to: z.string().min(1, { message: "Assigned To is required" }),
    stage_id: z.string().min(1, { message: "Stage is required" }),
    lost_reason: z.string().min(1, { message: "Opportunity Name is required" }),
    moved_from: z
      .string()
      .min(1, { message: "Opportunity Source is required" }),
    moved_to: z.string().min(1, {
      message: "Status is Required",
    }),
    lead_value: z.string().min(1, { message: "Lead Value is required" }),
  }),
});

export const SendInviteUserSchema = z.object({
  email: z.string().min(1, {
    message: "Email is Required",
  }),
  role: z.string().min(1, {
    message: "Role is Required!",
  }),
});

export const SendInviteUsersSchema1 = z.object({
  users: z.array(SendInviteUserSchema),
});

export const SendInviteUsersSchema = z.object({
  users: z.array(
    z.object({
      email: z
        .string()
        .min(1, { message: "Email is Required" })
        .email({ message: "Invalid email format" }),
      role: z.string().min(4, { message: "Role is Required" }),
    }),
  ),
});

export const OrganizationSchema = z.object({
  organization_name: z.string().trim().min(1, {
    message: "Organization name is required",
  }),
  description: z.string().trim().min(1, {
    message: "Description is required",
  }),
});
