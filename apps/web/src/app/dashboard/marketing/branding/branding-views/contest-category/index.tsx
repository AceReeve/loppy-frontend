import React from "react";
import { Separator } from "@repo/ui/components/ui";
import BrandingCard from "@/src/app/dashboard/marketing/branding/branding-components/branding-card.tsx";

interface CategoryProps {
  handleNextStep: () => void;
}
export default function ContestCategory(props: CategoryProps) {
  const brandCategories = [
    {
      id: 1,
      title: "Name",
      description: "Get up and running with the perfect name.",
      icon: [{ id: 1, source: "/assets/icons/branding/icon-name.svg" }],
    },
    {
      id: 2,
      title: "Logo",
      description: "Kickstart you venture with a unique, memorable logo.",
      icon: [{ id: 1, source: "/assets/icons/branding/icon-logo.svg" }],
    },
    {
      id: 3,
      title: "Tagline or Slogan",
      description:
        "Connect deeply with your target audience with an on-target tagline",
      icon: [{ id: 1, source: "/assets/icons/branding/icon-tagline.svg" }],
    },
  ];

  const bundlePackage = [
    {
      id: 1,
      title: "Name + Logo",
      description:
        "Get the essentials needed to establish your brand together and save.",
      icon: [
        { id: 1, source: "/assets/icons/branding/icon-name.svg" },
        { id: 2, source: "/assets/icons/branding/icon-logo.svg" },
      ],
    },
    {
      id: 2,
      title: "Name + Logo + Tagline",
      description:
        "Establish your entire brand identity and save with this bundle",
      icon: [
        { id: 1, source: "/assets/icons/branding/icon-name.svg" },
        { id: 2, source: "/assets/icons/branding/icon-logo.svg" },
        { id: 3, source: "/assets/icons/branding/icon-tagline.svg" },
      ],
    },
    {
      id: 3,
      title: "Name + Tagline",
      description:
        "Communicate your vision with the perfect name/tagline combo.",
      icon: [
        { id: 1, source: "/assets/icons/branding/icon-name.svg" },
        { id: 2, source: "/assets/icons/branding/icon-tagline.svg" },
      ],
    },
    {
      id: 4,
      title: "Logo + Tagline",
      description:
        "Get a great logo design and a catch slogan / tagline for your brand.",
      icon: [
        { id: 1, source: "/assets/icons/branding/icon-logo.svg" },
        { id: 2, source: "/assets/icons/branding/icon-tagline.svg" },
      ],
    },
    {
      id: 5,
      title: "Logo + Business Cards + Stationary",
      description:
        "Get your logo, business cards and stationary designed together and save.",
      icon: [
        { id: 1, source: "/assets/icons/branding/icon-name.svg" },
        { id: 2, source: "/assets/icons/branding/icon-logo.svg" },
        { id: 3, source: "/assets/icons/branding/icon-tagline.svg" },
      ],
    },
  ];

  return (
    <div className=" m-10 flex h-auto min-w-[900px] flex-col gap-[40px] space-y-4">
      <div className="text-center">
        <h1 className="text-[30px] font-bold">What do you need help with?</h1>
        <p className="text-[18px] text-gray-500">
          Pick from our most popular categories, launch a contest and begin
          receiving submissions right away.
        </p>
      </div>

      <div className="flex flex-row justify-center gap-[100px]">
        {brandCategories.map((category) => (
          <BrandingCard
            key={category.id}
            title={category.title}
            description={category.description}
            handleNextStep={props.handleNextStep}
            icon={category.icon}
          />
        ))}
      </div>

      <Separator />

      <div className="text-center">
        <h1 className="text-[30px] font-semibold">Popular Bundle Packages</h1>
        <p className="text-[18px] text-gray-500">
          Jumpstart your brand building with multiple contests
        </p>
      </div>

      <div className=" flex flex-wrap justify-center  gap-x-[100px] gap-y-[40px]">
        {bundlePackage.map((bundle) => (
          <BrandingCard
            key={bundle.id}
            title={bundle.title}
            description={bundle.description}
            handleNextStep={props.handleNextStep}
            icon={bundle.icon}
          />
        ))}
      </div>
    </div>
  );
}
