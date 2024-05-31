import { Button, Separator } from "@/src/components/ui";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/src/components/ui/card.tsx";
import { Pen } from "lucide-react";
import { Trash } from "iconsax-react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion.tsx";
interface FilterProps {
  filter: {
    label: string;
    value: string[];
  };

  deleteFilter: () => void;
}

export default function AppliedFilter({ filter, deleteFilter }: FilterProps) {
  return (
    <>
      <Card className="mt-1">
        <CardTitle className="p-2 flex justify-between">
          <p className="content-center">{filter.label}</p>
          <div className="flex w-auto">
            <Pen className="cursor-pointer p-1" />
            <Trash
              className="cursor-pointer p-1 hover:bg-gray-600 rounded-sm"
              onClick={() => deleteFilter()}
            />
          </div>
        </CardTitle>
        <Separator />
        <CardContent className="flex h-auto flex-wrap">
          {filter.value.map((value, index) => (
            <p
              key={index}
              className="inline-block border-2 w-auto py-1 px-2 rounded-full text-sm font-bold h-auto "
            >
              {value}
            </p>
          ))}
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            onClick={() => {
              //setIsFilterMode(!isFilterMode);
            }}
          >
            AND
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
