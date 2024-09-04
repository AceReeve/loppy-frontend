import React from "react";
import { Button } from "@repo/ui/components/ui";

interface TriggerProps {
  id: number;
  name: string;
  icon: React.ReactNode;
  onButtonClick: (id: number) => void;
}

export default function TriggerSelection(props: TriggerProps) {
  const handleButtonClick = () => {
    props.onButtonClick(props.id);
  };
  return (
    <Button
      variant="outline"
      className="flex w-full items-center justify-start space-x-2 rounded border"
      onClick={handleButtonClick}
    >
      {/*<MagnifyingGlassIcon className="size-10 rounded bg-orange-800/20 p-1 text-gray-500" />*/}
      <div className="flex size-10 items-center justify-center rounded bg-orange-500/30 p-1 text-gray-500">
        {props.icon}
      </div>
      <div className="">{props.name}</div>
    </Button>
  );
}
