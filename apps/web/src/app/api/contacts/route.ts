/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument -- use any temporarily */

import { type NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "@/auth.ts";
import { db } from "@/src/lib/db.ts";

export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "10", 10);
    const sort = searchParams.get("sort") ?? "name";
    const order = searchParams.get("order") ?? "asc";
    const searchTerm = searchParams.get("search_key") ?? "";
    const filter = searchParams.get("filter") ?? "{}";

    const skip = (page - 1) * limit;

    // Get the authenticated user's ID
    const session = await auth();
    if (!session)
      return NextResponse.json({
        message: "Unauthorized",
        status: 401,
      });

    const userId = session.user.id;

    const searchFields = ["name", "phone_number", "email"];

    // Create sort object
    const sortObj: Record<string, 1 | -1> = {
      [sort]: order === "asc" ? 1 : -1,
    };

    const filterObj = {
      user_id: new ObjectId(userId),
      $or: searchFields.map((field) => ({
        [field]: { $regex: `\\b${searchTerm}`, $options: "i" },
      })),
      ...JSON.parse(filter),
    };

    // Query the materialized view
    const data = await db.find("merged_contacts", filterObj, {
      sort: sortObj,
      limit,
      skip,
      collation: { locale: "en", strength: 2 },
    });

    // Get total count for pagination
    const totalCount = await db.countDocuments("merged_contacts", filterObj);

    const response = {
      data,
      meta: {
        page,
        pages: Math.ceil(totalCount / limit),
        total: totalCount,
        limit,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
