import React from "react";

export interface ItemProps {
  name: string;
  description: string;
  value: number;
}

export default function SummaryItem(prop: ItemProps) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2 ">
        <div className="h-10 w-10 bg-orange-500" />
        <div>
          <h1>{prop.name}</h1>
          <p>({prop.description})</p>
        </div>
      </div>
      <div>
        <h1>${prop.value}</h1>
        <p className="text-sm text-orange-500 underline">Change</p>
      </div>
    </div>
  );
}
