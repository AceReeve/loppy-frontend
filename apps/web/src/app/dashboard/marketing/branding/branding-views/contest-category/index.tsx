import React from "react";
import BrandingSteps from "@/src/app/dashboard/marketing/branding/branding-components/branding-steps.tsx";
import BrandingCard from "@/src/app/dashboard/marketing/branding/branding-components/branding-card.tsx";
import { Separator } from "@repo/ui/components/ui";

interface CategoryProps {
  handleNextStep: () => void;
}
export default function ContestCategory(props: CategoryProps) {
  const brandCategories = [
    {
      id: 1,
      title: "Name",
      description: "Get up and running with the perfect name.",
    },
    {
      id: 2,
      title: "Logo",
      description: "Kickstart you venture with a unique, memorable logo.",
    },
    {
      id: 3,
      title: "Tagline or Slogan",
      description:
        "Connect deeply with your target audience with an on-target tagline",
    },
  ];

  const bundlePackage = [
    {
      id: 1,
      title: "Name + Logo",
      description:
        "Get the essentials needed to establish your brand together and save.",
    },
    {
      id: 2,
      title: "Name + Logo + Tagline",
      description:
        "Establish your entire brand identity and save with this bundle",
    },
    {
      id: 3,
      title: "Name + Tagline",
      description:
        "Communicate your vision with the perfect name/tagline combo.",
    },
    {
      id: 4,
      title: "Logo + Tagline",
      description:
        "Get a great logo design and a catch slogan / tagline for your brand.",
    },
    {
      id: 5,
      title: "Logo + Business Cards + Stationary",
      description:
        "Get your logo, business cards and stationary designed together and save.",
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
          />
        ))}
      </div>
    </div>
  );
}
