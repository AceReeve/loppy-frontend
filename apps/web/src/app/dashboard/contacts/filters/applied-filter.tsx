import { Pen } from "lucide-react";
import { Trash } from "iconsax-react";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  Button,
  Separator,
} from "@repo/ui/components/ui";

interface FilterProps {
  filter: {
    label: string;
    value: string[];
  };

  deleteFilter: () => void;
}

export default function AppliedFilter({ filter, deleteFilter }: FilterProps) {
  return (
    <Card className="mt-1">
      <CardTitle className="flex justify-between p-2">
        <p className="content-center">{filter.label}</p>
        <div className="flex w-auto">
          <Pen className="cursor-pointer p-1" />
          <Trash
            className="cursor-pointer rounded-sm p-1 hover:bg-gray-600"
            onClick={() => {
              deleteFilter();
            }}
          />
        </div>
      </CardTitle>
      <Separator />
      <CardContent className="flex h-auto flex-wrap">
        {filter.value.map((value) => (
          <p
            key={value}
            className="inline-block h-auto w-auto rounded-full border-2 px-2 py-1 text-sm font-bold "
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
  );
}
