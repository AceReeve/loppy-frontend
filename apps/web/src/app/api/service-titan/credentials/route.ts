import { NextResponse } from "next/server";
import { type SyncStatus } from "@repo/redux-utils/src/endpoints/types/service-titan";
import { ObjectId } from "mongodb";
import {
  type ServiceTitanFormValues,
  serviceTitanSchema,
} from "@/src/app/dashboard/settings/integrations/schemas/integrations-schemas.ts";
import { db } from "@/src/lib/db.ts";
import { auth } from "@/auth.ts";
import { serviceTitanAuth } from "@/src/lib/service-titan-auth.ts";

export async function GET() {
  try {
    const session = await auth();

    if (!session) return;

    const credentials = await db.findOne("servicetitan-credentials", {
      user_id: new ObjectId(session.user.id),
    });

    if (!credentials) {
      return NextResponse.json(
        { success: false, error: "Credentials not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(credentials, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve credentials" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ServiceTitanFormValues;
    const validatedData = serviceTitanSchema.parse(body);
    const session = await auth();

    if (!session) return;

    await db.updateOne(
      "servicetitan-credentials",
      {
        user_id: new ObjectId(session.user.id),
      },
      {
        $set: {
          ...validatedData,
          user_id: new ObjectId(session.user.id),
        },
      },
      {
        upsert: true,
      },
    );

    return NextResponse.json(
      { message: "Credentials saved successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save credentials" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    const session = await auth();

    if (!session) return;

    // delete all the sync data as well to save db space
    const tenantId = (await serviceTitanAuth()).getTenant();
    const syncStatus = await db.find<SyncStatus>("sync-status", {
      tenant_id: tenantId,
      user_id: new ObjectId(session.user.id),
    });

    for (const item of syncStatus) {
      await db.deleteMany(`synced-${item.entityType}`, {
        user_id: new ObjectId(session.user.id),
      });
    }

    await db.deleteOne("servicetitan-credentials", {
      user_id: new ObjectId(session.user.id),
    });

    await db.deleteMany("sync-status", {
      user_id: new ObjectId(session.user.id),
    });

    return NextResponse.json(
      { message: "Credentials deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete credentials" },
      { status: 500 },
    );
  }
}
