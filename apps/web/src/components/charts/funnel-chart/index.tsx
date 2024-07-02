import { cn } from "@repo/ui/utils";
import React from "react";

function FunnelChart() {
  const data = [
    {
      value: 134,
      label: "Lead Created",
      key: "lead_created",
      percentage: "100%",
    },
    { value: 89, label: "Booked", key: "booked", percentage: "66%" },
    { value: 49, label: "Sold", key: "sold", percentage: "55%" },
    { value: 40, label: "Follow Up", key: "follow_up", percentage: "24%" },
    { value: 14.3, label: "Ad Spend", key: "ad_spending", percentage: "14%" },
  ];

  return (
    <div className="relative">
      <img
        src="/assets/images/dashboard/funnel.png"
        alt=""
        className="absolute left-0 top-20 h-[130px] w-full"
      />
      <div className="relative grid h-[273px] w-full grid-cols-5">
        {data.map((item, index) => (
          <div
            key={item.key}
            className={cn(
              "flex flex-col gap-2 px-3",
              index !== data.length - 1 && "border-r-2 border-r-gray-200",
              index && "border-l border-l-white",
            )}
          >
            <div className="font-inter text-sm font-medium text-gray-500">
              {item.label}
            </div>
            <div className="font-inter text-2xl font-semibold text-gray-700">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FunnelChart;
