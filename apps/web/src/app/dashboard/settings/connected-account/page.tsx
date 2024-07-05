"use client";
import React, { useState } from "react";
import { Button, Separator } from "@repo/ui/components/ui";
import AccountComponent from "@/src/app/dashboard/settings/connected-account/component-account";

export default function ConnectedAccounts() {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "Google",
      description: "Plan properly your workflow",
      image: "/assets/icons/connected-accounts/icon-google.svg",
      isConnected: false,
    },
    {
      id: 2,
      name: "ServiceTitan",
      description: "Plan properly your workflow",
      image: "/assets/icons/connected-accounts/icon-servititan.svg",
      isConnected: true,
    },
    {
      id: 3,
      name: "Facebook & Instagram",
      description: "Integrate Projects Discussions",
      image: "/assets/icons/connected-accounts/icon-facebook.svg",
      isConnected: true,
    },
    {
      id: 4,
      name: "HouseCall Pro",
      description: "Integrate Projects Discussions",
      image: "/assets/icons/connected-accounts/icon-housecall-pro.svg",
      isConnected: false,
    },
    {
      id: 5,
      name: "TikTok",
      description: "Plan properly your workflow",
      image: "/assets/icons/connected-accounts/icon-tiktok.svg",
      isConnected: false,
    },
    {
      id: 6,
      name: "GoHighLevel",
      description: "Integrate Projects Discussions",
      image: "/assets/icons/connected-accounts/icon-gohighlevel.svg",
      isConnected: true,
    },
    {
      id: 7,
      name: "CloseBot.AI",
      description: "Plan properly your workflow",
      image: "/assets/icons/connected-accounts/icon-closebot.svg",
      isConnected: false,
    },
  ]);
  const toggleIsConnected = (id: number) => {
    const updatedAccounts = accounts.map((account) =>
      account.id === id
        ? { ...account, isConnected: !account.isConnected }
        : account,
    );
    setAccounts(updatedAccounts);
  };

  // Update the state with the updated accounts array
  return (
    <div className="m-5 h-auto rounded-xl bg-white p-8">
      <div className=" grid h-auto w-full  grid-cols-5 gap-x-[50px] p-4 lg:grid-cols-10">
        {accounts.map((account, index) => (
          <AccountComponent
            key={account.id}
            name={account.name}
            description={account.description}
            isConnected={account.isConnected}
            image={account.image}
            index={index}
            toggleIsConnected={toggleIsConnected}
          />
        ))}
      </div>
      <div className="col-span-4">
        <Separator />
        <div className="- mt-4 flex justify-end">
          <Button> Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
