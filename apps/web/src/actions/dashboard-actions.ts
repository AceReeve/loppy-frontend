import { revalidateTag } from "next/cache";
import { type ColorPickerSchemaFormValues } from "@/src/components/color-picker/schemas/color-picker-schemas.ts";

export async function getAccentColor() {
  if (!process.env.NEXT_PUBLIC_BASE_URL)
    throw new Error("NEXT_PUBLIC_BASE_URL is not detected");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/accent-color`,
    {
      next: {
        tags: ["accent-color"],
      },
    },
  );

  return response.json() as Promise<ColorPickerSchemaFormValues>;
}

export async function setAccentColor(accentColor: ColorPickerSchemaFormValues) {
  "use server";
  if (!process.env.NEXT_PUBLIC_BASE_URL)
    throw new Error("NEXT_PUBLIC_BASE_URL is not detected");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/accent-color`,
    {
      method: "POST",
      body: JSON.stringify(accentColor),
    },
  );

  revalidateTag("accent-color");

  return response.json() as Promise<ColorPickerSchemaFormValues>;
}
