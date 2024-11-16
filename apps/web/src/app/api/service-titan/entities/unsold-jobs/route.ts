import { NextResponse } from "next/server";
import {
  type Job,
  type JobType,
} from "@repo/redux-utils/src/endpoints/types/service-titan-entities/jobs";
import { type Customer } from "@repo/redux-utils/src/endpoints/types/service-titan-entities/customer";
import { ObjectId } from "mongodb";
import { auth } from "@/auth.ts";
import { db } from "@/src/lib/db.ts";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return;

    const data = await db.find<Job & Document>(
      "synced-jobs",
      {
        user_id: new ObjectId(session.user.id),
        jobStatus: { $nin: ["Completed", "Canceled"] },
        total: { $ne: 0 },
      },
      {
        limit: 10,
        sort: { createdOn: -1 },
      },
    );

    const jobTypes = await db.find<JobType & Document>("synced-job-types", {
      user_id: new ObjectId(session.user.id),
      id: { $in: data.map((item) => item.jobTypeId) },
    });

    const customers = await db.find<Customer & Document>("synced-customers", {
      user_id: new ObjectId(session.user.id),
      id: { $in: data.map((item) => item.customerId) },
    });

    const jobTypesMap = jobTypes.reduce<Record<string, JobType | undefined>>(
      (acc, current) => {
        acc[current.id] = current;
        return acc;
      },
      {},
    );

    const customersMap = customers.reduce<Record<string, Customer | undefined>>(
      (acc, current) => {
        acc[current.id] = current;
        return acc;
      },
      {},
    );

    const response = data.map((item) => ({
      ...item,
      name: jobTypesMap[item.jobTypeId]?.name ?? "Missing Job Name",
      customerName:
        customersMap[item.customerId]?.name ?? "Missing Customer Name",
    }));

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve unsold jobs" },
      { status: 500 },
    );
  }
}
