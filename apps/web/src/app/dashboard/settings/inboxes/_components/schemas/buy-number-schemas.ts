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
