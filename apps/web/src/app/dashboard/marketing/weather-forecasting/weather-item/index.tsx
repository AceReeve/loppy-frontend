"use client";

import React, { useRef } from "react";
import Wind from "@/src/app/dashboard/marketing/weather-forecasting/weather-item/item-wind";
import RainChance from "@/src/app/dashboard/marketing/weather-forecasting/weather-item/item-rain-chance";

import UVIndex from "@/src/app/dashboard/marketing/weather-forecasting/weather-item/item-uv";
import Pressure from "@/src/app/dashboard/marketing/weather-forecasting/weather-item/item-pressure";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
type Props = {
  header: string;
  description: string;
  measurement: number;
  suffix: string;
};
export default function WeatherItem(props: Props) {
  let weatherComponent = null;
  const itemComponent = useRef(null);

  useGSAP(() => {
    gsap.to(itemComponent.current, {
      duration: 1,
      opacity: 1,
    });
  });

  switch (props.header.toLowerCase()) {
    case "wind":
      weatherComponent = <Wind />;
      break;
    case "rain chance":
      weatherComponent = <RainChance measurement={props.measurement} />;
      break;
    case "uv index":
      weatherComponent = <UVIndex />;
      break;
    case "pressure":
      weatherComponent = <Pressure />;
      break;
    default:
      // If the header is not recognized, render null
      break;
  }

  return (
    <div className="flex h-[177.25px] rounded-xl bg-slate-100 p-8">
      <div className="flex flex-1 flex-col justify-between">
        <div className="font-nunito text-lg font-medium leading-relaxed text-black">
          {props.header}
        </div>
        <div className="font-nunito text-base font-normal leading-snug text-neutral-400">
          {props.description}
        </div>
        <div className="font-nunito text-lg font-medium leading-relaxed text-black">
          {props.measurement} {props.suffix}
        </div>
      </div>
      <div
        ref={itemComponent}
        className="flex opacity-0 min-w-[110.78spx] flex-col rounded-full"
      >
        {weatherComponent}
      </div>
    </div>
  );
}
