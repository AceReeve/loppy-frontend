"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  VerticalMenu,
  VerticalMenuLink,
} from "@repo/ui/components/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import TeamDetails from "@/src/app/dashboard/settings/teams/_tabs/team-details.tsx";
import Members from "@/src/app/dashboard/settings/teams/_tabs/members.tsx";
import Roles from "@/src/app/dashboard/settings/teams/_tabs/roles.tsx";
import Permissions from "@/src/app/dashboard/settings/teams/_tabs/permissions.tsx";
import TeamSettings from "@/src/app/dashboard/settings/teams/_tabs/team-settings.tsx";

const teams = [
  {
    name: "Front-End Developers",
    id: 0,
  },
  {
    name: "Back-End Developers",
    id: 1,
  },
  {
    name: "UI Artists",
    id: 2,
  },
  {
    name: "Quality Assurance",
    id: 3,
  },
];

const tabs = [
  {
    label: "Details",
    id: "details",
    component: TeamDetails,
  },
  {
    label: "Members",
    id: "members",
    component: Members,
  },
  {
    label: "Roles",
    id: "roles",
    component: Roles,
  },
  {
    label: "Permissions",
    id: "Permissions",
    component: Permissions,
  },
  {
    label: "Settings",
    id: "Settings",
    component: TeamSettings,
  },
];

export default function Page() {
  const [currentTeam, setCurrentTeam] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  }, []);

  const handleChangeTeam = useCallback((teamId: number) => {
    setCurrentTeam(teamId);
  }, []);

  const filteredTeams = useMemo(() => {
    return teams.filter((team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const TeamResultComponent = (
    <div className="flex gap-5 space-x-4">
      <div className="min-w-[200px] max-w-[300px]">
        <VerticalMenu className=" !shadow-none">
          <div className="relative flex w-[225px] w-full flex-row justify-between gap-2">
            <MagnifyingGlassIcon className="absolute left-2 top-1.5 h-5 w-5 text-gray-500 " />
            <Input
              className="h-[35px] w-[225px] rounded-none pl-10"
              placeholder="Search Team"
              type="search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Separator className="mt-2" />
          {filteredTeams.map((team) => (
            <VerticalMenuLink
              active={team.id === currentTeam}
              key={team.id}
              className="cursor-pointer"
              onClick={() => {
                handleChangeTeam(team.id);
              }}
            >
              {team.name}
            </VerticalMenuLink>
          ))}
        </VerticalMenu>
      </div>
      <div className=" h-full min-h-[1000px] border-l border-gray-300" />

      <div className=" w-full ">
        <Tabs className="mt-8 w-full" defaultValue={tabs[0].id}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-2 w-full">
            {tabs.map((tab) => {
              const TabComponent = tab.component;
              return (
                <TabsContent key={tab.id} value={tab.id}>
                  <TabComponent />
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </div>
    </div>
  );

  const NoResultsComponent = (
    <div className="flex w-full flex-col items-center justify-center px-4 py-28">
      <div className="text-center font-montserrat text-4xl font-medium leading-[48px] text-gray-800">
        Doesn &apos;t have a team yet?
      </div>
      <div className="mt-4 max-w-[641px] text-center font-nunito text-sm font-normal leading-normal text-gray-700">
        Start by creating your teams and adding the necessary details. Once your
        teams are set up, you&apos;ll be able to search through them
        effortlessly to find the information you need while keeping unnecessary
        details hidden.
      </div>
      <img
        className="h-[149px] w-[126px]"
        src="/assets/icons/icon-no-data-contacts.svg"
        alt=""
      />
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-[36px]">Team</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Team</Button>
          </DialogTrigger>
          <DialogContent className=" max-w-[800px] font-poppins">
            <div className="text-2xl ">Create Team</div>
            <Separator />
            <div className="flex gap-6 px-8 py-4">
              <div className="flex w-[200px] flex-col justify-between space-y-6">
                <div className=" flex h-[200px] w-[200px] flex-col content-center rounded-full bg-slate-200 shadow-lg">
                  <Image
                    src="/assets/images/logo.png"
                    alt=""
                    width={138}
                    height={141}
                    className="m-auto size-[150px] w-[150px] object-contain transition-all duration-500"
                  />
                </div>
                <div>
                  <Button variant="outline" className="w-full rounded-none">
                    Upload Image
                  </Button>
                  <p className=" text-center text-[12px] italic text-slate-300">
                    We recommend an image of at least 512x512 resolution.
                  </p>
                </div>
              </div>

              <div className="m-auto w-full space-y-4 font-poppins">
                <div>
                  <p className="font-light">TEAM NAME </p>
                  <input
                    type="text"
                    className=" w-[300px] bg-slate-100 text-sm"
                    placeholder="MARKETING"
                  />
                </div>
                <div>
                  <p className="font-light"> DESCRIPTION </p>
                  <Textarea
                    className="mt-2 h-[140px] resize-none bg-slate-100 font-light leading-7"
                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac
            consequat arcu. Maecenas sagittis odio at diam varius commodo.
            Vestibulum viverra ante eu diam imperdiet dignissim."
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex items-end justify-end">
              <Button className="text-md px-10">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Separator className="my-2" />
      {teams.length > 0 ? TeamResultComponent : NoResultsComponent}
    </div>
  );
}
