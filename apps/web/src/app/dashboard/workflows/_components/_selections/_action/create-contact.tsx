import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@repo/ui/components/ui";
import React from "react";
export default function CreateContact() {
  return (
    <div className="space-y-6 p-4">
      <SelectGroup>
        <Select defaultValue="ContactTag">
          <p>Choose a Workflow Trigger</p>z`
          <SelectTrigger variant="outline">
            <SelectValue defaultValue="ContactTag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ContactTag">Create Contact</SelectItem>
            <SelectItem value="Birthdate">Birth Day</SelectItem>
          </SelectContent>
        </Select>
      </SelectGroup>
      <div className="space-y-1">
        <p>Workflow Trigger Name</p>
        <Input defaultValue="Create Contact" />
      </div>
      <Separator />

      <div className="space-y-4">
        <div className="space-y-1">
          <p>Contact Name</p>
          <Input />
        </div>

        <div className="space-y-1">
          <p>Contact Number</p>
          <Input />
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="px-4">Add Trigger</Button>
      </div>
    </div>
  );
}
