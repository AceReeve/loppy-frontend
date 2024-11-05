import { NextResponse } from "next/server";
import {
  type Job,
  type JobType,
} from "@repo/redux-utils/src/endpoints/types/service-titan-entities/jobs";
import { type Customer } from "@repo/redux-utils/src/endpoints/types/service-titan-entities/customer";
import { auth } from "@/auth.ts";
import { db } from "@/src/lib/db.ts";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return;

    const data = await db.find<Job>(
      "synced-jobs",
      {
        user_id: session.user.id,
        jobStatus: { $nin: ["Completed", "Canceled"] },
        total: { $ne: 0 },
      },
      {
        limit: 10,
        sort: { createdOn: -1 },
      },
    );

    const jobTypes = await db.find<JobType>("synced-job-types", {
      user_id: session.user.id,
      id: { $in: data.map((item) => item.jobTypeId) },
    });

    const customers = await db.find<Customer>("synced-customers", {
      user_id: session.user.id,
      id: { $in: data.map((item) => item.customerId) },
    });

    const jobTypesMap = jobTypes.reduce<Record<string, JobType>>(
      (acc, current) => {
        acc[current.id] = current;
        return acc;
      },
      {},
    );

    const customersMap = customers.reduce<Record<string, Customer>>(
      (acc, current) => {
        acc[current.id] = current;
        return acc;
      },
      {},
    );

    const response = data.map((item) => ({
      ...item,
      name: jobTypesMap[item.jobTypeId].name,
      customerName: customersMap[item.customerId].name,
    }));

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve credentials" },
      { status: 500 },
    );
  }
}
