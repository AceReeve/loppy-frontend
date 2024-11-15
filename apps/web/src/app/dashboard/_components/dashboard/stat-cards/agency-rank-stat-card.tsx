import { type StatCardProps } from "@repo/ui/components/custom";
import { cn } from "@repo/ui/utils";
import { Card } from "@repo/ui/components/ui";

export default function AgencyRankStatCard(props: StatCardProps) {
  const currentValue = props.data?.value ?? 0;
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
      className={cn(
        "relative flex items-center justify-center gap-3 text-center",
        props.className,
      )}
      variant={props.variant}
    >
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white">
        {renderMenuIcon(props.icon)}
      </div>
      <div className="space-y-2 text-white">
        <h2 className="text-xl font-semibold leading-tight">{props.name}</h2>
        <p className="text-4xl font-bold">
          {props.formattedValue?.(currentValue) ?? currentValue}
        </p>
        <p className="text-sm leading-tight">Industry: Heating & Air</p>
      </div>
    </Card>
  );
}
