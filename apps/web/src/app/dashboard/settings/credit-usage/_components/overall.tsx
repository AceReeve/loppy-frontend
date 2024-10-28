/* eslint-disable -- disable errors for index */

// interface DetailsProps {
//   count: number;
//   title: string;
// }

import { useState } from "react";
import {
  Button,
  Calendar,
  Card,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@repo/ui/components/ui";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { cn } from "@repo/ui/utils";

// Define types for data structure
interface DataSection {
  type: string;
  items: DataItem[];
}

interface DataItem {
  title: string;
  value: string | number;
}

export default function Overall() {
  const data: DataSection[] = [
    {
      type: "Performance",
      items: [
        {
          title: "Avg. Time to First Response",
          value: "00s",
        },
        {
          title: "Avg. Time to Response",
          value: "00s",
        },
        {
          title: "Avg. Time to Close",
          value: "00s",
        },
      ],
    },
    {
      type: "Messages",
      items: [
        {
          title: "Total Messages",
          value: 0,
        },
        {
          title: "Inbound Messages",
          value: 0,
        },
        {
          title: "Outbound Messages",
          value: 0,
        },
      ],
    },
    {
      type: "Calls",
      items: [
        {
          title: "Total Calls",
          value: 1,
        },
        {
          title: "Inbound Calls",
          value: 0,
        },
        {
          title: "Outbound Calls",
          value: 1,
        },
      ],
    },
  ];

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const renderDate = () => {
    if (!date?.from) return <span>Pick a date</span>;
    if (date.to)
      return (
        <>
          {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
        </>
      );
    return format(date.from, "LLL dd, y");
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-500">Overall</h1>

        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {renderDate()}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
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

          <Select defaultValue="30">
            <SelectTrigger variant="outline" className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="7">Last 7 days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <h1 className="text-sm font-semibold text-slate-500">
              {item.type}
            </h1>
            <div className="grid grid-cols-12 gap-4">
              {item.items.map((item2, itemIndex) => (
                <Card
                  key={itemIndex}
                  className="col-span-12 border text-center lg:col-span-4"
                >
                  <CardHeader className="p-8">
                    <h6 className="text-slate-500">{item2.title}</h6>
                    <p className="text-2xl text-slate-500">{item2.value}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
