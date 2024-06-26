import React, { useState } from "react";
import {
  AccordionContent,
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@repo/ui/components/ui";

export default function WildCardNameFilter() {
  const options = [
    { label: "ChatGPT", value: "ChatGPT" },
    { label: "Facebook", value: "Facebook" },
    { label: "Twitter", value: "Twitter" },
  ];
  const [value, setValue] = useState<string[]>([]);
  return (
    <AccordionContent className="h-auto min-h-[100px] ">
      <MultiSelector values={value} onValuesChange={setValue} loop={false}>
        <MultiSelectorTrigger>
          <MultiSelectorInput placeholder="Select your framework" />
        </MultiSelectorTrigger>
        <MultiSelectorContent>
          <MultiSelectorList className="relative">
            {options.map((option) => (
              <MultiSelectorItem key={option.value} value={option.value}>
                {option.label}
              </MultiSelectorItem>
            ))}
          </MultiSelectorList>
        </MultiSelectorContent>
      </MultiSelector>
    </AccordionContent>
  );
}
