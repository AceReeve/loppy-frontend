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
import { DateRange } from "react-day-picker";
import { cn } from "@repo/ui/utils";

export default function Conversions() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-500">Conversions</h1>

        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
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

      <div className="space-y-8">
        <div className="grid grid-cols-12 gap-4">
          <Card className="col-span-12 border text-center lg:col-span-4">
            <CardHeader className="p-8">
              <h6 className="text-slate-500">Total Conversations</h6>
              <p className="text-2xl text-slate-500">0</p>
            </CardHeader>
          </Card>
          <Card className="col-span-12 border text-center lg:col-span-4">
            <CardHeader className="p-8">
              <h6 className="text-slate-500">Avg Conversion Rate</h6>
              <p className="text-2xl text-slate-500">0%</p>
            </CardHeader>
          </Card>
          <Card className="col-span-12 border text-center lg:col-span-4">
            <CardHeader className="p-8">
              <h6 className="text-slate-500">Total Conversion Revenue</h6>
              <p className="text-2xl text-slate-500">$0</p>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
