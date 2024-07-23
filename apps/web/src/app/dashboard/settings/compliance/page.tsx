"use client";
import React from "react";
import { Button } from "@repo/ui/components/ui";
import A2p10dlcRegistrationModal from "@/src/app/dashboard/settings/compliance/_components/modals/a2p-10dlc-registration-modal.tsx";
import BusinessProfileModal from "./_components/modals/business-profile-modal.tsx";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Business Profile Section */}
      <div>
        <div className="text-lg font-semibold">Business Profile</div>
        <div className="mt-4 flex items-center justify-between rounded border p-4">
          <div>
            <div className="font-semibold">Business Profile</div>
            <p className="text-sm text-gray-500">
              Register your business with the carriers to start the compliance
              approval process.{" "}
              <a href="/" className="text-primary">
                Learn more
              </a>
            </p>
          </div>
          <BusinessProfileModal />
        </div>
      </div>

      {/* SMS Compliance Section */}
      <div>
        <div className="text-lg font-semibold">SMS Compliance</div>
        <div className="mt-4 flex items-center justify-between rounded border p-4">
          <div>
            <div className="font-semibold">A2P 10DLC Registration</div>
            <p className="text-xs text-black">
              Local phone numbers{" "}
              <span className="bg-gray-200 p-1">
                USA and Canada* companies only
              </span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Register for A2P 10DLC to stay compliant and get higher messaging
              limits. A2P 10DLC is required if you want to send messages to
              United States.{" "}
              <a href="/" className="text-primary">
                Learn more
              </a>
            </p>
          </div>
          <A2p10dlcRegistrationModal />
        </div>
        <div className="mt-4 flex items-center justify-between rounded border p-4">
          <div>
            <div className="font-semibold">Toll-Free Verification</div>
            <p className="text-sm text-gray-500">Toll-free numbers</p>
            <p className="text-sm text-gray-500">
              Verify your toll-free numbers to avoid carrier filtering and
              ensure better deliverability. Toll-free verification is required
              if you want to send messages to United States or Canada.{" "}
              <a href="/" className="text-primary">
                Learn more
              </a>
            </p>
          </div>
          <Button size="sm">Register</Button>
        </div>
      </div>

      {/* Calling Compliance Section */}
      <div>
        <div className="text-lg font-semibold">Calling Compliance</div>
        <div className="mt-4 flex items-center justify-between rounded border p-4">
          <div>
            <div className="font-semibold">Calling Compliance</div>
            <p className="text-sm text-gray-500">
              Increase trust and answer rates in your calls with STIR/SHAKEN and
              CNAM compliance.{" "}
              <a href="/" className="text-primary">
                Learn more
              </a>
            </p>
          </div>
          <Button size="sm">Register</Button>
        </div>
      </div>
    </div>
  );
}
