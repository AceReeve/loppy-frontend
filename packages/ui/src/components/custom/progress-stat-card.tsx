import { Card, CardContent } from "../ui";
import { cn } from "../../lib/utils.ts";
import { type StatCardProps } from "./stat-card.tsx";

type ProgressStatCardProps = StatCardProps;

function ProgressStatCard(props: ProgressStatCardProps) {
  const progress = 75; // Progress percentage
  const strokeWidth = 6; // Circle stroke width
  const currentValue = props.data?.value ?? 0;

  const sizes = { size: 70, font: "text-4xl" };

  const { size, font } = sizes;

  // Calculate SVG properties
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const renderMenuIcon = (icon: StatCardProps["icon"]) => {
    if (!icon) return null;
    return (
      <>
        {typeof icon === "string" ? (
          <img src={icon} alt="" className={cn(props.iconClass)} />
        ) : (
          <div className={cn(props.iconClass)}>{icon}</div>
        )}
      </>
    );
  };

  return (
    <Card
      className={cn("pt-6 relative text-center", props.className)}
      variant={props.variant}
    >
      <CardContent className="flex flex-col items-center justify-center h-full gap-2 px-0">
        <div
          className="relative place-content-center"
          style={{
            width: size,
            height: size,
          }}
        >
          <svg className="absolute left-0 top-0 size-full">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="origin-center text-emerald-500 -rotate-90 transition-all duration-300 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn("text-emerald-500 stroke-current")}>
              {renderMenuIcon(props.icon)}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className={`font-medium text-xl ${font}`}>
            {props.formattedValue?.(currentValue) ?? currentValue}
          </div>
          <div className="text-sm text-gray-500">{props.name}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export { ProgressStatCard };
