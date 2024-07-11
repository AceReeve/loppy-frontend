import { Card } from "@repo/ui/components/ui";
import Image from "next/image";
import React from "react";

interface CardProps {
  title: string;
  description: string;
  handleNextStep: () => void;
}
export default function BrandingCard(props: CardProps) {
  return (
    <Card className="flex min-h-[150px] min-w-[320px] flex-col justify-between gap-1  p-6 text-black shadow-md">
      <div className="flex flex-row justify-between">
        <div className="h-[40px] w-[40px] rounded-full bg-orange-500 " />
        <button type="button" onClick={props.handleNextStep}>
          <Image
            alt="icon-next"
            src="/assets/icons/branding/icon-next-arrow.svg"
            width={26}
            height={15}
          />
        </button>
      </div>

      <div className="text-[20px] font-bold">{props.title}</div>
      <div className="h-[34px] w-[265px] text-[14px]">{props.description}</div>
    </Card>
  );
}
