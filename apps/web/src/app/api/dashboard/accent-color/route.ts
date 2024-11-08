import { NextResponse } from "next/server";
import { db } from "@/src/lib/db.ts";
import {
  colorPickerSchema,
  type ColorPickerSchemaFormValues,
} from "@/src/components/color-picker/schemas/color-picker-schemas.ts";

export async function GET() {
  try {
    const accentColor = await db.findOne<ColorPickerSchemaFormValues>(
      "accent-color",
      {},
    );

    return NextResponse.json(
      {
        ...accentColor,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve accent color" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ColorPickerSchemaFormValues;
    const validatedData = colorPickerSchema.parse(body);

    await db.updateOne(
      "accent-color",
      {},
      // {
      //   user_id: session.user.id,
      // },
      {
        $set: {
          ...validatedData,
          // user_id: session.user.id,
        },
      },
      {
        upsert: true,
      },
    );

    return NextResponse.json(
      { message: "Accent color saved successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save accent color" },
      { status: 500 },
    );
  }
}
