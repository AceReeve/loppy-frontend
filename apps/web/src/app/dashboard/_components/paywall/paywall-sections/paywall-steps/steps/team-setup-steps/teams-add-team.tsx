"use client";

import { Button } from "@repo/ui/components/ui";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InviteMembersForm from "@/src/app/dashboard/_components/paywall/paywall-sections/paywall-steps/steps/team-setup-steps/_components/invite-members-form.tsx";
import type { TeamsSetupStepsProps } from "@/src/app/dashboard/_components/paywall/paywall.d.ts";
import { SendInviteUsersSchema } from "@/src/schemas";

export default function TeamsAddTeam(props: TeamsSetupStepsProps) {
  const form = useForm<z.infer<typeof SendInviteUsersSchema>>({
    resolver: zodResolver(SendInviteUsersSchema),
    defaultValues: {
      users: [
        {
          email: "",
          role: "",
        },
      ],
    },
  });

  const users = form.watch("users");

  return (
    <div className="inline-flex w-full flex-col items-start justify-center gap-4">
      <div className="font-nunito font-medium">Invite Members</div>
      <InviteMembersForm
        form={form}
        onSubmit={form.handleSubmit(props.handleSubmitInvitedList)}
      />

      <div className="mt-4 flex w-full justify-between">
        <Button
          className="min-w-48 gap-2"
          variant="outline"
          size="lg"
          onClick={() => {
            props.onPrevClicked();
          }}
        >
          <ArrowLeftIcon className="size-4" />
          Back
        </Button>
        {users.length === 1 && !users[0].email ? (
          <Button
            className="min-w-48 gap-2"
            size="lg"
            onClick={() => {
              props.onNextClicked();
            }}
            variant="outline"
          >
            Skip
            <ArrowRightIcon className="size-4" />
          </Button>
        ) : (
          <Button
            className="min-w-48 gap-2"
            size="lg"
            onClick={form.handleSubmit(props.handleSubmitInvitedList)}
          >
            Next
            <ArrowRightIcon className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
