"use client";
import React, { useState } from "react";
import ContestCategory from "@/src/app/dashboard/marketing/branding/branding-views/contest-category";
import ContestBrief from "@/src/app/dashboard/marketing/branding/branding-views/contest-brief";
import BrandingSteps from "@/src/app/dashboard/marketing/branding/branding-components/branding-steps.tsx";

export default function Page() {
  const [step, setStep] = useState(0);

  const brandingProcess = [
    {
      id: 1,
      name: "Contest Category",
    },
    {
      id: 2,
      name: "Contest Brief",
    },
    {
      id: 3,
      name: "Pricing",
    },
    {
      id: 4,
      name: "Additional Options",
    },
    {
      id: 5,
      name: "Payment Information",
    },
  ];
  const handleNextStep = () => {
    setStep(step + 1);
  };

  const views = [
    {
      page: <ContestCategory handleNextStep={handleNextStep} />,
    },
    {
      page: <ContestBrief />,
    },
  ];

  const getState = (processId: number) => {
    if (processId < step + 1) {
      return "done";
    }
    if (processId === step + 1) {
      return "current";
    }
    return "disabled";
  };

  return (
    <div className="mx-0 my-10 rounded-xl  bg-[#FAFAFA] px-10 py-20 xl:mx-20">
      <div className=" mx-auto flex max-w-[1050px] flex-col items-center justify-between xl:flex-row">
        {brandingProcess.map((process, index) => (
          <React.Fragment key={process.id}>
            <BrandingSteps
              name={process.name}
              id={process.id}
              state={getState(process.id)}
            />
            {index < brandingProcess.length - 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                className="size-5 rotate-90 xl:rotate-0 "
              >
                <path
                  d="M-6.43147e-07 1.95903L5.96605 8.33627L-8.56314e-08 14.7135L1.83671 16.6725L9.6525 8.33627L1.83671 1.51785e-05L-6.43147e-07 1.95903Z"
                  fill="#C4C4C4"
                />
              </svg>
            )}
          </React.Fragment>
        ))}
      </div>
      {views[step].page}
    </div>
  );
}
