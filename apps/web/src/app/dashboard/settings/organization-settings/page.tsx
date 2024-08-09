"use client";
import { Separator } from "@repo/ui/components/ui";
import React, { useState } from "react";
import ToggleData from "@/src/app/dashboard/settings/teams/_components/toggle-data.tsx";

export default function Page() {
  /*  const [conversationSettings, setConversationSettings] = useState([
    {
      id: 1,
      title: "Auto-Close Conversations",
      description: "Automatically close inactive conversations.",
      isToggled: true,
    },
    {
      id: 2,
      title: "Set the number of days of inactivity",
      description:
        "Auto-close conversations. You can reopen conversations at any time.",
      isToggled: true,
    },
    {
      id: 3,
      title: "Auto-Close Unsubscribe",
      description:
        "Automatically close conversations when contacts unsubscribe",
      isToggled: true,
    },
    {
      id: 4,
      title: "Double Opt-In",
      description:
        'Double opt-in is an account wide-feature that will require every contact to confirm their phone number by replying "Y" or "Yes." Have questions about this feature?',
      isToggled: true,
    },
  ]);
  */

  const [conversationSettings, setConversationSettings] = useState([
    {
      id: 1,
      label: "Conversations",
      data: [
        {
          id: 101,
          title: "Auto-Close Conversations",
          description: "Automatically close inactive conversations.",
          isToggled: true,
        },
        {
          id: 102,
          title: "Set the number of days of inactivity",
          description:
            "Auto-close conversations. You can reopen conversations at any time.",
          isToggled: false,
        },
        {
          id: 103,
          title: "Auto-Close Unsubscribe",
          description:
            "Automatically close conversations when contacts unsubscribe",
          isToggled: false,
        },
        {
          id: 104,
          title: "Double Opt-In",
          description:
            'Double opt-in is an account wide-feature that will require every contact to confirm their phone number by replying "Y" or "Yes." Have questions about this feature?',
          isToggled: true,
        },
      ],
    },
    {
      id: 2,
      label: "Calling",
      data: [
        {
          id: 201,
          title: "Outbound Calls",
          description: "Enable outbound calls.",
          isToggled: true,
        },
        {
          id: 202,
          title: "Inbound Calls",
          description: "Enable Inbound calls.",
          isToggled: true,
        },
      ],
    },
    {
      id: 3,
      label: "Security Settings",
      data: [
        {
          id: 301,
          title: "Require two-step authentication for your team",
          description:
            "All your team members will be required to use two factor authentication",
          isToggled: false,
        },
      ],
    },
  ]);

  const handleToggleChange = (compositeId: number) => {
    const categoryId = Math.floor(compositeId / 100);
    //const settingId = compositeId % 100;

    setConversationSettings((prevSettings) =>
      prevSettings.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            data: category.data.map((setting) =>
              setting.id === compositeId
                ? { ...setting, isToggled: !setting.isToggled }
                : setting,
            ),
          };
        }
        return category;
      }),
    );
  };
  return (
    <div className="space-y-10 p-4">
      <h1 className="text-2xl font-semibold text-slate-500">
        Organization Settings
      </h1>
      {conversationSettings.map((category) => (
        <div
          key={category.id}
          className="flex w-[200px] w-full flex-col space-y-10 border-2 border-gray-300 px-7 py-6"
        >
          <div className="space-y-4">
            <h1 className="text-xl text-slate-600"> {category.label}</h1>
            <Separator />
            <div className="space-y-4">
              {category.data.map((setting) => (
                <ToggleData
                  key={setting.id}
                  title={setting.title}
                  description={setting.description}
                  id={setting.id}
                  isToggled={setting.isToggled}
                  onToggleChange={() => {
                    handleToggleChange(setting.id);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
