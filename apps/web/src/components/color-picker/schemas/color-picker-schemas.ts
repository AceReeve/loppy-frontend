import * as z from "zod";

export const colorPickerSchema = z.object({
  colorName: z.string().min(1),
  customColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, {
      message: "Invalid RGB hex color. Expected format: #RRGGBB",
    })
    .optional(),
});

export type ColorPickerSchemaFormValues = z.infer<typeof colorPickerSchema>;
