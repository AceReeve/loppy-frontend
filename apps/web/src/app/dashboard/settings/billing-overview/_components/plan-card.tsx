import { Button, Separator } from "@repo/ui/components/ui";
import { Check } from "lucide-react";
/*import Image from "next/image";*/
interface PlanDetail {
  id: number;
  detail: string;
}
export interface PlanProps {
  id: string;
  header: string;
  price: number;
  monthly: boolean;
  contents: PlanDetail[];
  current: boolean;
  description: string;
  handleButtonClick: (planID: PlanProps) => void;
}

export default function CardPlan(props: PlanProps) {
  return (
    <div
      className={`w-[300px]  rounded-lg font-poppins shadow-lg ${props.current ? "border border-orange-500" : ""}`}
    >
      <div className="flex justify-center rounded-t-lg bg-[linear-gradient(to_right,_#FFBC49,_#FF8228)] p-4 text-white">
        {/*<Image src="/assets/images/logo.png" alt="" width={50} height={50} />*/}
        <p className="flex items-center text-xl">{props.header}</p>
      </div>
      <div className="px-4">
        <div className="flex justify-center  p-8">
          <h1 className="flex items-end text-6xl font-semibold text-orange-500">
            ${props.price}
          </h1>
          <p className="flex items-end py-1 text-gray-500">
            {props.monthly ? "/monthly" : "/yearly"}
          </p>
        </div>
        <Separator className="bg-orange-500" />
        <div className="space-y-2 px-3 py-4 text-center text-sm text-gray-500">
          {props.contents.map((content) => (
            <p className="flex gap-2 text-left" key={content.id}>
              <Check className="my-auto flex-shrink-0 text-justify text-green-600 " />
              {content.detail}
            </p>
          ))}
        </div>
        <Separator className="bg-orange-500" />
        <div className="flex py-5">
          <Button
            className={`m-auto rounded-full px-10 ${props.current ? "border border-orange-500 bg-white text-orange-500" : "bg-[linear-gradient(to_right,_#FFBC49,_#FF8228)]"} `}
            disabled={props.current}
            onClick={() => {
              props.handleButtonClick(props);
            }}
          >
            {props.current ? "Current" : "Upgrade"}
          </Button>
        </div>
      </div>
    </div>
  );
}
