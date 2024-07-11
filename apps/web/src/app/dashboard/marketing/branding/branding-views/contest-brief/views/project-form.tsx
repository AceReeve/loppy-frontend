"use client";

import React, { useState } from "react";
import { Button, Input, RadioCards, Textarea } from "@repo/ui/components/ui";
import Link from "next/link";
import FormRadioCard from "@/src/app/dashboard/marketing/branding/_components/form-radio-selection.tsx";

interface ProjectProps {
  handleNext: () => void;
  handlePrev: () => void;
}
export default function ProjectForm(props: ProjectProps) {
  const [matchingDomain, setMatchingDomain] = useState("0");

  console.log(matchingDomain);

  return (
    <div className="mt-16 ">
      <div className="m-auto w-[700px] text-center font-open-sans">
        <h1 className="text-[30px] font-bold">
          Tell Us About Your Business and Brand
        </h1>
        <p className="font-open-sans text-[18px] text-gray-400">
          Tell us a bit more about your business and preferences, so we can
          develop your brand document and project brief.
        </p>
      </div>
      <div className="m-auto mt-4 flex max-w-[970px] flex-col gap-5 rounded-xl bg-white p-10 text-left shadow-lg">
        <div>
          <h1 className=" text-[14px] font-bold">
            Select a category that best describes your business or brand
          </h1>
          <p className="font-open-sans text-[12px] text-gray-400">
            Can&apos;t find your category? Pick &apos;Something Else&apos;
          </p>
        </div>
        <div>
          <h1 className=" text-[14px] font-bold">Give your project a title</h1>
          <Input
            className="mt-2"
            placeholder={"Health & Air Conditioning"}
          ></Input>
        </div>

        <div>
          <h1 className=" text-[14px] font-bold">
            Explain your brand or business in 1-2 sentences.
          </h1>

          <Textarea
            className="h-[135px] resize-none focus:ring-0"
            placeholder="Describe your business....."
          />
          <Link
            className="text-[12px] text-primary underline"
            href="/auth/login"
          >
            See Example
          </Link>
        </div>
        <div>
          <h1 className=" text-[14px] font-bold">
            I want to position by brand as...
          </h1>
          <p className="font-open-sans text-[12px] text-gray-400">
            Select from these options or type in any word or short phrase that
            captures your ideal positioning.
          </p>
          <Input className="mt-2" placeholder={"Fun and playful"} />
        </div>

        <div>
          <h1 className=" text-[14px] font-bold">
            Tell us about your customers
          </h1>

          <Textarea
            className="my-2 h-[135px] resize-none"
            placeholder="Share any specifics about your ideal customer, especially details about their wants, needs fears, and desires."
          />
          <Link
            className="text-[12px] text-primary underline"
            href="/auth/login"
          >
            See Example
          </Link>
        </div>

        <div>
          <h1 className=" text-[14px] font-bold">
            Do you want a matching domain (.com URL) with your name?
          </h1>
          <RadioCards
            className="mt-4 flex"
            defaultValue="checked"
            value={matchingDomain}
            onValueChange={setMatchingDomain}
          >
            <FormRadioCard
              isRecommended
              value="0"
              header="Yes"
              description="But Minor variations are allowed"
              checked={matchingDomain === "0"}
            />
            <FormRadioCard
              isRecommended={false}
              value="1"
              header="Yes"
              description="Domain should exactly match the name "
              checked={matchingDomain === "1"}
            />
            <FormRadioCard
              isRecommended={false}
              value="2"
              header="No"
              description="I am only looking for a name, not a Domain"
              checked={matchingDomain === "2"}
            />
          </RadioCards>
          <p className="mt-4 font-open-sans text-[12px] text-gray-400">
            If you want a matching domain, our platform will only accept those
            name suggestions where the domain is available.
          </p>
        </div>

        <div>
          <h1 className=" text-[14px] font-bold">
            Are you open to any other URL extensions besides (.com)?
          </h1>

          <RadioCards className="mt-4 flex " defaultValue="1">
            <FormRadioCard
              isRecommended={false}
              value={"0"}
              header={"Yes"}
              description={"I'm open to other URL extensions"}
            />
            <FormRadioCard
              isRecommended={true}
              value="1"
              header="No"
              description="I am only looking for a (.com) domain"
            />
          </RadioCards>
        </div>
        <div className=" mt-10 flex justify-between">
          <Button onClick={props.handlePrev}>Previous</Button>
          <Button onClick={props.handleNext}>Generate Project Brief</Button>
        </div>
      </div>
    </div>
  );
}
