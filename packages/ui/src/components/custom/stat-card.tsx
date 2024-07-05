import React from "react";
import { Card, type CardProps } from "../ui";
import { cn } from "../../lib/utils.ts";

interface StatCardProps extends CardProps {
  value: string;
  name: string;
  preText?: string;
  postText?: string;
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}
function StatCard(props: StatCardProps) {
  return (
    <Card
      className={cn("px-5 pt-6 pb-3 relative text-center", props.className)}
      variant={props.variant}
    >
      {props.icon ? (
        <div className="absolute left-0 -top-[32px] w-full flex items-center justify-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/80 text-white px-2">
            {props.icon}
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
        {props.preText ? (
          <span className="text-[25px] font-semibold font-inter leading-10">
            $
          </span>
        ) : null}

        <span className="text-[38px] font-semibold font-inter leading-10">
          {props.value}
        </span>
        {props.postText ? (
          <span className="text-[25px] font-semibold font-inter leading-10">
            k
          </span>
        ) : null}
      </div>
      <div className="flex items-center justify-center gap-2.5 mt-4">
        <div className="relative w-[31px]">
          <img
            alt=""
            className="absolute left-0 -top-2 h-[17px] w-[31px] object-contain"
            src="/assets/icons/icon-trending-up.svg"
          />
        </div>
        <div className="font-inter">
          <span
            className={cn(
              "text-sm font-semibold",
              props.variant !== "gradient-primary" && "text-green-400",
            )}
          >
            10%{" "}
          </span>
          <span
            className={cn(
              "text-sm font-normal",
              props.variant !== "gradient-primary" && "text-gray-600",
            )}
          >
            vs. previous month
          </span>
        </div>
      </div>
    </Card>
  );
}

export { StatCard };
