import { RadioCardsItem } from "@repo/ui/components/ui";
import React from "react";
import { Check } from "lucide-react";

interface CardProps {
  header: string;
  description: string;
  value: string;
  isRecommended: boolean;
}
export default function FormRadioCard(props: CardProps) {
  return (
    <RadioCardsItem
      className="  w-[270px] space-y-1  px-3 py-2 text-left "
      value={props.value}
    >
      <div
        className={`${props.isRecommended ? "block" : "hidden"}  absolute -top-3 left-0 right-0 mx-auto block w-[100px] rounded-full border-2 border-white bg-orange-500 p-1 text-center text-[8px] text-white`}
      >
        Recommended
      </div>
      <h1 className="text-[14px]">{props.header}</h1>

      <Check className=":block absolute right-2 top-1 text-orange-500" />

      <p className="font-open-sans text-[10px] font-normal text-gray-400">
        {props.description}
      </p>
    </RadioCardsItem>
  );
}
