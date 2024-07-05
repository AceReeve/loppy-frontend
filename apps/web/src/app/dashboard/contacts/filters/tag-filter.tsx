import {
  AccordionContent,
  Button,
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@repo/ui/components/ui";
import React, { useState } from "react";

interface TagFilterProps {
  onAdd: (label: string, values: string[]) => void;
}

export default function TagFilter({ onAdd }: TagFilterProps) {
  const options = [
    { label: "ChatGPT", value: "ChatGPT" },
    { label: "Facebook", value: "Facebook" },
    { label: "Twitter", value: "Twitter" },
  ];
  const [value, setValue] = useState<string[]>([]);
  return (
    <>
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
      <Button
        onClick={() => {
          onAdd("Tag", value);
        }}
      >
        Apply
      </Button>
    </>
  );
}
