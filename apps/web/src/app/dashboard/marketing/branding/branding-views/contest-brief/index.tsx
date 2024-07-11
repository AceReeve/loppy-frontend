import React, { useState } from "react";
import GetStarted from "@/src/app/dashboard/marketing/branding/branding-views/contest-brief/views/get-started.tsx";
import ProjectForm from "@/src/app/dashboard/marketing/branding/branding-views/contest-brief/views/project-form.tsx";
import ProjectGeneration from "@/src/app/dashboard/marketing/branding/branding-views/contest-brief/views/project-generation.tsx";

export default function ContestBrief() {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(step + 1);
  };
  const handlePrev = () => {
    setStep(step - 1);
  };
  const views = [
    {
      page: <GetStarted handleNextView={handleNext} />,
    },
    {
      page: <ProjectForm handleNext={handleNext} handlePrev={handlePrev} />,
    },
    {
      page: (
        <ProjectGeneration handleNext={handleNext} handlePrev={handlePrev} />
      ),
    },
  ];
  return <div>{views[step].page}</div>;
}
