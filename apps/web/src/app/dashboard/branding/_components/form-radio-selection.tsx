"use client";
import React from "react";
import { Check } from "lucide-react";
import { RadioCardsItem } from "@repo/ui/components/ui";

interface CardProps {
  header: string;
  description: string;
  value: string;
  isRecommended: boolean;
  checked: boolean;
}
export default function FormRadioCard(props: CardProps) {
  return (
    <RadioCardsItem
      className=" w-[270px] space-y-1  px-3 py-2 text-left "
      value={props.value}
    >
      <div
        className={`${props.isRecommended ? "block" : "hidden"}   ${props.checked ? "bg-orange-500" : "bg-gray-400"} absolute -top-3 left-0 right-0 mx-auto block w-[100px] rounded-full border-2 border-white  p-1 text-center text-[8px] text-white`}
      >
        Recommended
      </div>
      <h1 className="text-[14px]">{props.header}</h1>

      {props.checked ? (
        <Check className=":block absolute right-2 top-1 text-orange-500" />
      ) : null}

      <p className="font-open-sans text-[10px] font-normal text-gray-400">
        {props.description}
      </p>
    </RadioCardsItem>
  );
}
