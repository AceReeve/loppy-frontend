import { Button, Separator } from "@repo/ui/components/ui";
import React from "react";

export default function AccountTab() {
  return (
    <div className="space-y-10 p-10">
      <div className="flex w-[200px] w-full flex-col space-y-2 border-2 border-gray-300 px-7 py-6">
        <h1 className="text-xl text-slate-600"> Account Removal</h1>
        <Separator />
        <p>
          Temporarily suspend your account. It will remain inactive for 30 days
          before deletion.
        </p>
        <p className="leading-8">
          By deactivating your account, you will:
          <li>Lose access to your profile and any associated data.</li>
          <li>No longer receive notifications or updates.</li>
          <li>Not be able to recover your account once deactivated.</li> To
          proceed, please confirm your decision:{" "}
          <li>Enter your password to verify your identity.</li>
          <li>Select a reason for deactivating your account (optional).</li>
          <b>
            Once deactivated, you will have 30 days to reconsider before your
            account is permanently deleted.
          </b>
        </p>
        <div className="mt-4 flex justify-end">
          <Button variant="destructive">Deactivate</Button>
        </div>
      </div>
    </div>
  );
}
