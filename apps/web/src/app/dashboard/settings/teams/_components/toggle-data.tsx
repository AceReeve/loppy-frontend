import { Separator, Switch } from "@repo/ui/components/ui";
import React from "react";

interface DataProps {
  title: string;
  description: string;
  isToggled: boolean;
  onToggleChange: (id: number) => void;
}
export default function ToggleData(props: DataProps) {
  return (
    <>
      <div className="flex w-full justify-between text-slate-500">
        <div className="space-y-1.5 font-poppins">
          <h1 className="font-bold">{props.title}</h1>
          <p>{props.description}</p>
        </div>
        <Switch
          className="bg-primary"
          defaultChecked={props.isToggled}
          onChange={() => props.onToggleChange}
          //onChange={handleToggleSwitch}
        />
      </div>
      <Separator className="mt-3" />
    </>
  );
}
