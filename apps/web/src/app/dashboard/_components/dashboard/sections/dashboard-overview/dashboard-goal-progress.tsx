import * as React from "react";

interface ProgressBarProps {
  completed: number;
  total: number;
}

export function DashboardGoalProgress({ completed, total }: ProgressBarProps) {
  const segments = Array.from({ length: total }, (_, index) => ({
    isCompleted: index < completed,
  }));

  return (
    <div className="mt-2.5 flex gap-0.5">
      {segments.map((segment, index) => (
        <div
          //eslint-disable-next-line react/no-array-index-key -- we have to rely on index
          key={index}
          className={`flex h-[11px] w-[23px] shrink-0 ${
            segment.isCompleted
              ? "bg-[linear-gradient(180deg,#0FBAB8_0%,#34E3CE_100%)]"
              : "bg-gray-200"
          } ${index === 0 ? "rounded-l-full" : ""} ${index === total - 1 ? "rounded-r-full" : ""}`}
        />
      ))}
    </div>
  );
}
