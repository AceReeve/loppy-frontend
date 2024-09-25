import React from "react";
import { cn } from "@repo/ui/utils";
import {
  Cloud,
  CloudRain,
  Sun,
  Zap,
  Snowflake,
  CloudFog,
  CloudDrizzle,
} from "lucide-react";

interface WeatherIconProps {
  weather: string;
  className?: string; // Optional className prop
}

export default function WeatherIcon({
  weather,
  className = "",
}: WeatherIconProps) {
  let Icon;
  let gradient;

  switch (weather) {
    case "Clear":
      Icon = Sun;
      gradient = "bg-gradient-to-r from-yellow-400 to-orange-500";
      break;
    case "Clouds":
      Icon = Cloud;
      gradient = "bg-gradient-to-r from-gray-300 to-blue-300";
      break;
    case "Rain":
      Icon = CloudRain;
      gradient = "bg-gradient-to-r from-blue-400 to-blue-600";
      break;
    case "Drizzle":
      Icon = CloudDrizzle;
      gradient = "bg-gradient-to-r from-blue-300 to-blue-500";
      break;
    case "Thunderstorm":
      Icon = Zap;
      gradient = "bg-gradient-to-r from-yellow-500 to-orange-600";
      break;
    case "Snow":
      Icon = Snowflake;
      gradient = "bg-gradient-to-r from-blue-200 to-blue-400";
      break;
    case "Atmosphere":
      Icon = CloudFog;
      gradient = "bg-gradient-to-r from-gray-200 to-gray-400";
      break;
    default:
      Icon = Cloud;
      gradient = "bg-gradient-to-r from-yellow-400 to-orange-500";
  }

  return (
    <div
      className={cn(
        `absolute left-[23px] top-[37px] h-24 w-24 rounded-full p-2 ${gradient} flex transform items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105`,
        className,
      )}
    >
      <Icon size={50} color="white" />
    </div>
  );
}
