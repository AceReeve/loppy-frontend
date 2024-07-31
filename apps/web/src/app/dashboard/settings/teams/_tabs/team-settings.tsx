import Image from "next/image";
import { useState } from "react";
import { Button, Separator, Textarea } from "@repo/ui/components/ui";
import ToggleData from "@/src/app/dashboard/settings/teams/_components/toggle-data.tsx";

export default function TeamSettings() {
  const [settings, setSettings] = useState([
    {
      id: 1,
      title: "Send Messages",
      description: "Allow user to send messages.",
      isChecked: true,
    },
    {
      id: 2,
      title: "Allow to edit team settings",
      description: "Allow User to edit the settings of the team.",
      isChecked: false,
    },
    {
      id: 3,
      title: "Send Messages",
      description: "Allow user to send messages.",
      isChecked: true,
    },
    {
      id: 4,
      title: "Send Messages",
      description: "Allow user to send messages.",
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
    <div className="relative">
      <div className="flex flex-wrap space-x-10 p-8 ">
        <div className="flex w-[200px] flex-col justify-between">
          <div className="my-4 flex h-[200px] w-[200px] flex-col content-center rounded-full bg-slate-200 shadow-lg">
            <Image
              src="/assets/images/logo.png"
              alt=""
              width={138}
              height={141}
              className="m-auto size-[150px] w-[150px] object-contain transition-all duration-500"
            />
          </div>
          <Button variant="outline"> Upload Image</Button>
          <p className=" text-center text-[12px] italic text-slate-300">
            We recommend an image of at least 512x512 resolution.
          </p>
        </div>

        <div className="m-auto block flex flex-col space-y-4 font-poppins">
          <div>
            <p> TEAM NAME </p>
            <input
              type="text"
              placeholder="MARKETING"
              className="w-= w-[300px] bg-slate-100"
            />
          </div>
          <div>
            <p> TEAM DESCRIPTION </p>
            <Textarea
              className="mt-2 h-[200px] w-[600px] resize-none bg-slate-100 font-light leading-7 text-slate-400"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac
            consequat arcu. Maecenas sagittis odio at diam varius commodo.
            Vestibulum viverra ante eu diam imperdiet dignissim."
            />
          </div>
        </div>
        {/*        <p className="flex flex-col justify-end text-[12px] font-light  italic text-slate-400">
          Date created June 25, 2024
        </p>*/}
      </div>
      <Separator />
      <div className="mt-10 flex justify-between font-poppins">
        <p className="text-sm font-bold text-slate-500">MANAGE TEAMS</p>
      </div>
      <Separator />
      <div className="mt-4 space-y-4">
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
    </div>
  );
}
