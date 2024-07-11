"use client";
import { Card } from "@repo/ui/components/ui";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  icon: Icon[];
  handleNextStep: () => void;
}
interface Icon {
  source: string;
  id: number;
}
export default function BrandingCard(props: CardProps) {
  return (
    <Card
      onClick={props.handleNextStep}
      className="flex min-h-[150px] min-w-[320px] cursor-pointer flex-col justify-between gap-1  p-6 text-black shadow-md hover:scale-110"
    >
      <div className="flex flex-row justify-between">
        <div className="flex size-full">
          {/*          <div className="h-[40px] w-[40px] rounded-full bg-orange-500" />
          <div className="-ml-4 h-[40px] w-[40px] rounded-full bg-orange-500" />
          <div className="-ml-4 h-[40px] w-[40px] rounded-full bg-orange-500" />*/}
          {props.icon.map((icon) => (
            <Image
              src={icon.source}
              key={icon.id}
              alt="icon"
              width={40}
              height={40}
              className={`${icon.id < 2 ? "" : "-ml-4"} my-auto`}
            />
          ))}
        </div>
        <Image
          alt="icon-next"
          src="/assets/icons/branding/icon-next-arrow.svg"
          width={26}
          height={15}
        />
      </div>

      <div className="text-[20px] font-bold">{props.title}</div>
      <div className="h-[34px] w-[265px] text-[14px]">{props.description}</div>
    </Card>
  );
}
