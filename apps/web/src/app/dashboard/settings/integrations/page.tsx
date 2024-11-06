"use client";
import ServiceTitanCredsModal from "@/src/app/dashboard/settings/integrations/modal/service-titan-creds-modal.tsx";
import AccountComponent from "./component-account";

export default function ConnectedAccounts() {
  const accounts = [
    {
      id: 1,
      name: "Google",
      description: "Plan properly your workflow",
      image: "/assets/icons/connected-accounts/icon-google.svg",
    },
    {
      id: 2,
      name: "ServiceTitan",
      description: "Plan properly your workflow",
      image: "/assets/icons/connected-accounts/icon-servititan.svg",
      button: <ServiceTitanCredsModal />,
    },
    {
      id: 3,
      name: "Facebook & Instagram",
      description: "Integrate Projects Discussions",
      image: "/assets/icons/connected-accounts/icon-facebook.svg",
    },
    {
      id: 4,
      name: "HouseCall Pro",
      description: "Integrate Projects Discussions",
      image: "/assets/icons/connected-accounts/icon-housecall-pro.svg",
    },
    {
      id: 5,
      name: "TikTok",
      description: "Plan properly your workflow",
      image: "/assets/icons/connected-accounts/icon-tiktok.svg",
    },
    {
      id: 6,
      name: "GoHighLevel",
      description: "Integrate Projects Discussions",
      image: "/assets/icons/connected-accounts/icon-gohighlevel.svg",
    },
    {
      id: 7,
      name: "CloseBot.AI",
      description: "Plan properly your workflow",
      image: "/assets/icons/connected-accounts/icon-closebot.svg",
    },
  ];

  // Update the state with the updated accounts array
  return (
    <div className="grid h-auto w-full grid-cols-5 gap-x-[50px] lg:grid-cols-10">
      {accounts.map((account, index) => (
        <AccountComponent
          key={account.id}
          name={account.name}
          description={account.description}
          image={account.image}
          index={index}
          button={account.button}
        />
      ))}
    </div>
  );
}
