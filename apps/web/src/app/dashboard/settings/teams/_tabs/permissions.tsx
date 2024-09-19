import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Input,
  Separator,
  Button,
} from "@repo/ui/components/ui";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ToggleData from "@/src/app/dashboard/settings/teams/_components/toggle-data.tsx";

interface TeamDetailsProps {
  team: Team;
  refetchTeamList: () => void;
}

interface Team {
  _id: string;
  team: string;
  description: string;
  // eslint-disable-next-line -- team members type is still unknown
  team_members: any[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export default function Permissions(props: TeamDetailsProps) {
  const [settings, setSettings] = useState([
    {
      id: 1,
      title: "Send Messages",
      description: "Allow user to send messages.",
      isChecked: true,
    },
    {
      id: 2,
      title: "Edit Team settings",
      description: "Allow User to edit the settings of the team.",
      isChecked: false,
    },
    {
      id: 3,
      title: "Invite Members",
      description: "Allow user to invite members",
      isChecked: true,
    },
    {
      id: 4,
      title: "Change User Role",
      description: "Allow user to change roles",
      isChecked: false,
    },
    {
      id: 5,
      title: "Send Messages",
      description: "Allow user to send messages.",
      isChecked: true,
    },
    {
      id: 6,
      title: "Send Messages",
      description: "Allow user to send messages.",
      isChecked: true,
    },
    {
      id: 7,
      title: "Send Messages",
      description: "Allow user to send messages.",
      isChecked: true,
    },
    {
      id: 8,
      title: "Send Messages",
      description: "Allow user to send messages.",
      isChecked: true,
    },
  ]);

  const handleToggleChange = (id: number) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id
          ? { ...setting, isChecked: !setting.isChecked }
          : setting,
      ),
    );
  };

  return (
    <div className="space-y-4 p-4">
      {/* TODO: remove this */}
      <p className="hidden">{props.team.team}</p>
      <div className=" flex flex-row items-center justify-between">
        <div className="w-[250px]">
          <Select defaultValue="Administrator">
            <SelectTrigger
              className="text-md h-[40px] text-slate-500"
              variant="outline"
            >
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Administrator">Administrator</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Member">Member</SelectItem>
              <SelectItem value="Observer">Observer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative flex w-[225px] w-full flex-row justify-end ">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-2 top-1.5 h-5 w-5 text-gray-500 " />
          </div>

          <Input
            className="h-[35px] max-w-60 pl-10"
            placeholder="Search permissions"
            type="search"
          />
        </div>
      </div>
      <div>
        <div className="mt-10 flex justify-between font-poppins">
          <p className="text-sm font-bold">PERMISSIONS</p>
          <p className="cursor-pointer text-sm font-semibold text-orange-500">
            Clear Permissions
          </p>
        </div>
        <Separator className="my-4" />
      </div>
      <div className="space-y-4">
        {settings.map((permission) => (
          <ToggleData
            id={permission.id}
            title={permission.title}
            description={permission.description}
            isToggled={permission.isChecked}
            key={permission.id}
            onToggleChange={() => {
              handleToggleChange(permission.id);
            }}
          />
        ))}
      </div>
      <div className=" flex justify-end ">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
