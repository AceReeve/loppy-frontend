import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion.tsx";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/src/components/ui/multiselect.tsx";
import React, { useState } from "react";

export default function WildCardNameFilter() {
  const options = [
    { label: "ChatGPT", value: "ChatGPT" },
    { label: "Facebook", value: "Facebook" },
    { label: "Twitter", value: "Twitter" },
  ];
  const [value, setValue] = useState<string[]>([]);
  return (
    <>
      <AccordionContent className="min-h-[100px] h-auto ">
        <MultiSelector values={value} onValuesChange={setValue} loop={false}>
          <MultiSelectorTrigger>
            <MultiSelectorInput placeholder="Select your framework" />
          </MultiSelectorTrigger>
          <MultiSelectorContent>
            <MultiSelectorList className="relative">
              {options.map((option, i) => (
                <MultiSelectorItem key={i} value={option.value}>
                  {option.label}
                </MultiSelectorItem>
              ))}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
      </AccordionContent>
    </>
  );
}
