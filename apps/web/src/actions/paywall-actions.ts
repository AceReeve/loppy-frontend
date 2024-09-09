"use server";

import { revalidateTag } from "next/cache";

// eslint-disable-next-line @typescript-eslint/require-await -- no await but needs to be a server function
export async function revalidateOrganization() {
  revalidateTag("organization");
}

// eslint-disable-next-line @typescript-eslint/require-await -- no await but needs to be a server function
export async function revalidatePaymentStatus() {
  revalidateTag("payment-status");
}
