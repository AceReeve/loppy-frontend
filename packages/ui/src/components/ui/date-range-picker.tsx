"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { ArrowRight, CalendarMinus2 } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { cn } from "../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button.tsx";
import { Calendar } from "./calendar.tsx";

function DateRangePicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "justify-between text-left font-normal gap-3 font-roboto py-1 pr-1 shadow-lg",
              !date && "text-muted-foreground",
            )}
          >
            {/* eslint-disable-next-line no-nested-ternary -- this is ok */}
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "y-MM-dd")}{" "}
                  <ArrowRight className="size-4 text-gray-500" />{" "}
                  {format(date.to, "y-MM-dd")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
            <div className="flex items-center justify-center bg-primary size-9 rounded-xl">
              <CalendarMinus2 className="size-5 text-white" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { DateRangePicker, type DateRange };
