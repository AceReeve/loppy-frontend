import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui";
import React from "react";

export default function ContactTag() {
  /*  const [contactNode, setContactNode] = useState<Node>({
    id: " ",
    type: "triggerNode",
    data: { title: "Add New Trigger" },
    position: { x: 375, y: 0 },
  });*/

  return (
    <div className="space-y-10 p-4">
      <SelectGroup>
        <Select defaultValue="ContactTag">
          <p>Choose a Workflow Trigger</p>
          <SelectTrigger variant="outline">
            <SelectValue defaultValue="ContactTag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ContactTag">Contact Tag</SelectItem>
            <SelectItem value="Birthdate">Birth Day</SelectItem>
          </SelectContent>
        </Select>
      </SelectGroup>

      <div className="space-y-4">
        <p>Workflow Trigger Name</p>
        <Input defaultValue="Contact Tag" />
      </div>
      <div className="flex justify-end">
        <Button className="px-4">Add Trigger</Button>
      </div>
    </div>
  );
}
