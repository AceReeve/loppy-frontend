import React from "react";
import { type DashboardMetric } from "@repo/redux-utils/src/endpoints/types/service-titan";
import { Card, type CardProps } from "../ui";
import { cn } from "../../lib/utils.ts";
import { LoadingSpinner } from "../../loading/loading-spinner.tsx";

export interface StatCardProps extends CardProps {
  name: string;
  data: DashboardMetric | undefined;
  icon?: string | React.ReactNode;
  iconClass?: string;
  iconWrapperClass?: string;
  formattedValue?: (value: number) => string;
  loading?: boolean;
  editable?: boolean;
}

function StatCard(props: StatCardProps) {
  const iconClass = "text-white";
  const imageIconClass = "relative h-6 w-6";

  const currentValue = props.data?.value ?? 0;
  const previousPeriodText = props.data?.previousPeriodText;
  const percentage = props.data?.growth ?? 0;

  const renderValue = () => {
    if (props.loading) return <LoadingSpinner />;

    if (props.formattedValue) {
      const formattedValue = props.formattedValue(currentValue);

      // Regular expression to match the numeric part
      const numericPart = /\d+(?:\.\d+)?/.exec(formattedValue)?.[0] ?? "0";

      // Extract the non-numeric parts
      const splitText = formattedValue.split(numericPart);
      const prefix = splitText[0];
      const suffix = splitText.length ? splitText[1] : "";

      const prefixSuffixClassName = "text-[25px] font-semibold font-inter mt-2";

      return (
        <>
          {prefix ? (
            <span className={prefixSuffixClassName}>{prefix}</span>
          ) : null}
          {numericPart}
          {suffix ? (
            <span className={prefixSuffixClassName}>{suffix}</span>
          ) : null}
        </>
      );
    }

    return currentValue;
  };

  const renderMenuIcon = (icon: StatCardProps["icon"]) => {
    if (!icon) return null;
    return (
      <>
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt=""
            className={cn(imageIconClass, props.iconClass)}
          />
        ) : (
          <div className={cn(iconClass, props.iconClass)}>{icon}</div>
        )}
      </>
    );
  };

  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center px-5 pt-6 pb-3 relative text-center",
        props.className,
      )}
      variant={props.variant}
    >
      {props.icon ? (
        <div className="absolute left-0 -top-[32px] w-full flex items-center justify-center">
          <div
            className={cn(
              "flex size-12 items-center justify-center rounded-full bg-primary/80 text-white px-2",
              props.iconWrapperClass,
            )}
          >
            {renderMenuIcon(props.icon)}
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "font-open-sans text-lg font-semibold",
          props.variant !== "gradient-primary" && "text-gray-500",
        )}
      >
        {props.name}
      </div>
      <div
        className={cn(
          "mt-[7px]",
          props.variant !== "gradient-primary" && "text-gray-700",
        )}
      >
        <div className="text-[38px] font-semibold font-inter flex items-center justify-center min-h-10">
          {renderValue()}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2.5 mt-2">
        <div className="relative w-[31px]">
          {percentage !== 0 ? (
            <img
              alt=""
              className="absolute left-0 -top-2 h-[17px] w-[31px] object-contain"
              src={
                percentage >= 0
                  ? "/assets/icons/icon-trending-up.svg"
                  : "/assets/icons/icon-trending-down.svg"
              }
            />
          ) : null}
        </div>
        <div className="font-inter">
          <span
            className={cn(
              "text-sm font-semibold",
              props.variant !== "gradient-primary" && percentage >= 0
                ? "text-green-400"
                : "text-red-400",
            )}
          >
            {Math.abs(percentage)}%
          </span>
          <span
            className={cn(
              "text-sm font-normal ml-2",
              props.variant !== "gradient-primary" && "text-gray-600",
            )}
          >
            vs. {previousPeriodText}
          </span>
        </div>
      </div>
    </Card>
  );
}

export { StatCard };
