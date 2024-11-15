import React from "react";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@repo/ui/components/ui";

// MonthSelector now receives the `field` props from `react-hook-form`
interface MonthSelectorProps {
  value: string; // The current selected value (the selected month)
  onChange: (value: string) => void; // The function to update the selected value
}
export default function MonthSelector({ value, onChange }: MonthSelectorProps) {
  const monthSelection = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      {" "}
      {/* Controlled Select component */}
      <SelectTrigger className="h-[40px] text-slate-500" variant="outline">
        <SelectValue placeholder="Select a month" />
      </SelectTrigger>
      <SelectContent>
        {monthSelection.map((month) => (
          <SelectItem key={month.value} value={month.value}>
            {month.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
