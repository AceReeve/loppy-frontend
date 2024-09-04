import * as z from "zod";

export const profileSchema = z.object({
  // personal information
  first_name: z.string().min(1, "First Name is required"),
  last_name: z.string().min(1, "Last Name is required"),
  birthday: z.string().min(1, "Birth Date is required"),
  gender: z.string().min(1, "Gender is required"),

  // contact information
  contact_no: z
    .string()
    .min(1, "Phone Number is required")
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z
    .string()
    .min(1, "Zip Code is required")
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  address: z.string().min(1, "Address is required"),
});

export const securitySchema = z
  .object({
    current_password: z.string().min(1, "Please enter your current password"),

    new_password: z
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
    confirm_new_password: z.string().min(6, {
      message: "Confirmation password must be at least 6 characters long",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.new_password !== data.confirm_new_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirm_new_password"],
        message: "Passwords do not match",
      });
    }
  });
