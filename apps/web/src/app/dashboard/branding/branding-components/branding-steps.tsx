import { Check } from "lucide-react";
import React from "react";

interface ProcessProps {
  id: number;
  name: string;
  state: "current" | "done" | "disabled";
}
export default function BrandingSteps(prop: ProcessProps) {
  let bgColor, textColor, bgColorInner;

  switch (prop.state) {
    case "current":
      bgColor = "bg-orange-500";
      textColor = "text-white";
      bgColorInner = "bg-orange-700";
      break;
    case "done":
      bgColor = "bg-white-500";
      textColor = "text-orange-500";
      bgColorInner = "bg-orange-500";
      break;
    case "disabled":
      bgColor = "bg-gray-100";
      textColor = "text-gray-500";
      bgColorInner = "bg-gray-500";
      break;
    default:
      bgColor = "bg-orange-500";
      textColor = "text-white";
      bgColorInner = "bg-orange-700";
  }

  return (
    <div
      className={`${bgColor} ${textColor} flex h-[35px] w-auto items-center rounded-full p-2 font-semibold shadow-lg`}
    >
      <div
        className={`${bgColorInner} flex h-[25px] w-[25px] justify-center rounded-full text-white`}
      >
        {prop.state !== "done" ? (
          prop.id.toString()
        ) : (
          <Check className="m-auto- size-7" />
        )}
      </div>
      <h1 className="text-md px-2 lg:text-sm">{prop.name}</h1>
    </div>
  );
}
