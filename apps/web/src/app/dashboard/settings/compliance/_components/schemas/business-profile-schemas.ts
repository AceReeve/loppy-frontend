import * as z from "zod";

export const chooseNumberSchema = z.object({
  country: z.string({
    required_error: "Please select a country",
  }),
  state: z.string({
    required_error: "Please select a state",
  }),
  areaCode: z.string({
    required_error: "Please select an area code",
  }),
  selectedNumber: z.string().min(1, "Please select a number"),
});

export const businessLocationSchema = z.object({
  business_locations: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

export const generalInfoSchema = z.object({
  country: z.string({
    required_error: "Please select a country",
  }),
  ein: z.string().min(1, "EIN is required"),
  businessName: z.string().min(1, "Business name is required"),
  streetAddress1: z.string().min(1, "Street Address 1 is required"),
  streetAddress2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
});

export const businessInfoSchema = z.object({
  businessType: z.string().min(1, "Business Type is required"),
  businessIndustry: z.string().min(1, "Business Industry is required"),
  websiteUrl: z.string().url("Invalid URL"),
  socialMediaProfile: z.string().url("Invalid URL").optional(),
  businessRegionsOfOperations: z
    .string()
    .min(1, "Business of Operations is required"),
});

export const peopleToContactSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  businessTitle: z.string().min(1, "Business Title is required"),
  jobPosition: z.string().min(1, "Job Position is required"),
  businessEmail: z.string().email("Invalid email"),
  mobilePhoneNumber: z.string().min(1, "Mobile Phone Number is required"),
});

export const termsOfServiceSchema = z.object({
  agreedToTOS: z
    .boolean({})
    .refine((value) => value, "You must agree with the terms of service"),
});
