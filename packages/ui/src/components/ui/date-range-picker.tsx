"use client";

import * as React from "react";
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
} from "date-fns";
import { ArrowRight, CalendarMinus2 } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { createPeriod } from "@repo/hooks-and-utils/date-period-utils";
import { cn } from "../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button.tsx";
import { Calendar } from "./calendar.tsx";

interface DateRangePickerProps {
  onChange: (range: DateRange) => void;
  initialRange?: DateRange;
  setOpen?: (open: boolean) => void;
  open?: boolean;
  usePeriodText?: boolean; // use this month, year, week texts etc. for readability
}

function DateRangePicker({
  className,
  onChange,
  initialRange,
  setOpen,
  open,
  usePeriodText,
}: Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> &
  DateRangePickerProps) {
  const today = new Date();
  const [selectedRange, setSelectedRange] = React.useState<
    DateRange | undefined
  >(
    initialRange ?? {
      from: startOfMonth(today),
      to: endOfMonth(today),
    },
  );

  const quickSelections = [
    {
      label: "This Week",
      getValue: () => ({
        from: startOfWeek(today),
        to: endOfWeek(today),
      }),
    },
    {
      label: "Last Week",
      getValue: () => ({
        from: startOfWeek(subDays(today, 7)),
        to: endOfWeek(subDays(today, 7)),
      }),
    },
    {
      label: "Last 7 Days",
      getValue: () => ({
        from: subDays(today, 6),
        to: today,
      }),
    },
    // {
    //   label: "Last Month",
    //   getValue: () => ({
    //     from: startOfMonth(subMonths(today, 1)),
    //     to: endOfMonth(subMonths(today, 1)),
    //   }),
    // },
    {
      label: "This Month",
      getValue: () => ({
        from: startOfMonth(today),
        to: endOfMonth(today),
      }),
    },
    {
      label: "This Year",
      getValue: () => ({
        from: startOfYear(today),
        to: endOfYear(today),
      }),
    },
    // {
    //   label: "Last Year",
    //   getValue: () => ({
    //     from: startOfYear(subYears(today, 1)),
    //     to: endOfYear(subYears(today, 1)),
    //   }),
    // },
  ];

  const handleQuickSelection = (getValue: () => DateRange) => {
    const range = getValue();
    setSelectedRange(range);
    onChange(range);
  };

  function getDateRangeText() {
    if (selectedRange?.from) {
      if (usePeriodText) {
        return createPeriod({
          startDate: selectedRange.from,
          endDate: selectedRange.to,
        }).currentPeriodText;
      }
      return (
        <>
          {selectedRange.to ? (
            <>
              {format(selectedRange.from, "y-MM-dd")}{" "}
              <ArrowRight className="size-4 text-gray-500" />{" "}
              {format(selectedRange.to, "y-MM-dd")}
            </>
          ) : (
            format(selectedRange.from, "LLL dd, y")
          )}
        </>
      );
    }
    return <span>Pick a date</span>;
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "justify-between text-left font-normal gap-3 font-roboto py-1 pr-1 shadow-lg capitalize",
              !selectedRange && "text-muted-foreground",
            )}
          >
            {getDateRangeText()}
            <div className="flex items-center justify-center bg-primary size-9 rounded-xl">
              <CalendarMinus2 className="size-5 text-white" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex flex-col items-center w-auto p-0"
          align="end"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selectedRange?.from}
            selected={selectedRange}
            onSelect={setSelectedRange}
            numberOfMonths={2}
          />
          <div className="border-t pt-4 px-4">
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {quickSelections.map((selection) => (
                <Button
                  key={selection.label}
                  variant="outline"
                  onClick={() => {
                    handleQuickSelection(selection.getValue);
                  }}
                  className="rounded-full px-2 py-1 text-sm"
                >
                  {selection.label}
                </Button>
              ))}
              <Button
                onClick={() => {
                  if (selectedRange?.from && selectedRange.to) {
                    onChange(selectedRange);
                    setOpen?.(false);
                  }
                }}
                className="rounded-full px-2 py-1 text-sm ml-4"
              >
                Confirm
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { DateRangePicker, type DateRange };
