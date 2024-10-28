import { useState } from "react";
import {
  Button,
  Calendar,
  Card,
  CardHeader,
  type DateRange,
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
  ToggleGroup,
  ToggleGroupItem,
} from "@repo/ui/components/ui";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { cn } from "@repo/ui/utils";
// eslint-disable-next-line import/default -- will fix later
import ReactApexChart from "react-apexcharts";
import { type ApexOptions } from "apexcharts";

export default function Calling() {
  // date range
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  // charts
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const [dataRange, setDataRange] = useState<"day" | "week" | "month" | "year">(
    "day",
  );

  const handleChartTypeChange = (value: "line" | "bar") => {
    setChartType(value);
  };

  const handleDataRangeChange = (value: "day" | "week" | "month" | "year") => {
    setDataRange(value);
  };

  // Example data
  const data = {
    day: [10, 15, 25, 30, 40, 60],
    week: [50, 80, 65, 90, 100, 110, 120],
    month: [30, 50, 40, 70, 60, 90, 100, 120, 140, 160, 180, 200],
    year: [300, 400, 500, 600, 700, 800, 900, 1000],
  };

  const series = [
    {
      name: "Callings",
      data: data[dataRange],
    },
  ];

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: chartType,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Callings Over Time",
      align: "left",
    },
    xaxis: {
      categories: {
        day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        week: [
          "Week 1",
          "Week 2",
          "Week 3",
          "Week 4",
          "Week 5",
          "Week 6",
          "Week 7",
        ],
        month: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        year: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
      }[dataRange],
    },
  };

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
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-500">Calling</h1>

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

      <Separator />

      <div className="space-y-8">
        <div className="grid grid-cols-12 gap-4">
          <Card className="col-span-12 border text-center lg:col-span-4">
            <CardHeader className="p-8">
              <h6 className="text-slate-500">Total Inbound</h6>
              <p className="text-2xl text-slate-500">0</p>

              <div className="grid grid-cols-12 gap-2">
                <Card className="col-span-12 border text-center lg:col-span-4">
                  <CardHeader className="p-2">
                    <h6 className="text-xs text-slate-500">Avg. Duration</h6>
                    <p className="text-sm text-slate-500">38:00 8</p>
                  </CardHeader>
                </Card>
                <Card className="col-span-12 border text-center lg:col-span-4">
                  <CardHeader className="p-2">
                    <h6 className="text-xs text-slate-500">Answered</h6>
                    <p className="text-sm text-slate-500">1</p>
                  </CardHeader>
                </Card>
                <Card className="col-span-12 border text-center lg:col-span-4">
                  <CardHeader className="p-2">
                    <h6 className="text-xs text-slate-500">Unanswered</h6>
                    <p className="text-sm text-slate-500">0</p>
                  </CardHeader>
                </Card>
              </div>
            </CardHeader>
          </Card>
          <Card className="col-span-12 border text-center lg:col-span-4">
            <CardHeader className="p-8">
              <h6 className="text-slate-500">Total Outbound</h6>
              <p className="text-2xl text-slate-500">4</p>

              <div className="grid grid-cols-12 gap-2">
                <Card className="col-span-12 border text-center lg:col-span-4">
                  <CardHeader className="p-2">
                    <h6 className="text-xs text-slate-500">Avg. Duration</h6>
                    <p className="text-sm text-slate-500">30:00 0</p>
                  </CardHeader>
                </Card>
                <Card className="col-span-12 border text-center lg:col-span-4">
                  <CardHeader className="p-2">
                    <h6 className="text-xs text-slate-500">Answered</h6>
                    <p className="text-sm text-slate-500">0</p>
                  </CardHeader>
                </Card>
                <Card className="col-span-12 border text-center lg:col-span-4">
                  <CardHeader className="p-2">
                    <h6 className="text-xs text-slate-500">Missed</h6>
                    <p className="text-sm text-slate-500">0</p>
                  </CardHeader>
                </Card>
              </div>
            </CardHeader>
          </Card>
          <Card className="col-span-12 border text-center lg:col-span-4">
            <CardHeader className="p-8">
              <h6 className="text-slate-500">Forwarded</h6>
              <p className="text-2xl text-slate-500">1</p>

              <div className="grid grid-cols-12 gap-2">
                <Card className="col-span-12 border text-center">
                  <CardHeader className="p-2">
                    <h6 className="text-xs text-slate-500">Avg. Duration</h6>
                    <p className="text-sm text-slate-500">0</p>
                  </CardHeader>
                </Card>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-4">
            <ToggleGroup
              className="gap-0"
              type="single"
              variant="outline"
              defaultValue="line"
            >
              <ToggleGroupItem
                className="rounded-none"
                value="line"
                onClick={() => {
                  handleChartTypeChange("line");
                }}
              >
                Line
              </ToggleGroupItem>
              <ToggleGroupItem
                className="rounded-none"
                value="bar"
                onClick={() => {
                  handleChartTypeChange("bar");
                }}
              >
                Bar
              </ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup
              className="gap-0"
              type="single"
              variant="outline"
              defaultValue="day"
            >
              <ToggleGroupItem
                className="rounded-none"
                value="day"
                onClick={() => {
                  handleDataRangeChange("day");
                }}
              >
                Day
              </ToggleGroupItem>
              <ToggleGroupItem
                className="rounded-none"
                value="week"
                onClick={() => {
                  handleDataRangeChange("week");
                }}
              >
                Week
              </ToggleGroupItem>
              <ToggleGroupItem
                className="rounded-none"
                value="month"
                onClick={() => {
                  handleDataRangeChange("month");
                }}
              >
                Month
              </ToggleGroupItem>
              <ToggleGroupItem
                className="rounded-none"
                value="year"
                onClick={() => {
                  handleDataRangeChange("year");
                }}
              >
                Year
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <ReactApexChart
          options={options}
          series={series}
          type={chartType}
          height={350}
        />
      </div>
    </div>
  );
}
