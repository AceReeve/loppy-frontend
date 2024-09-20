"use client";
import {
  Input,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  VerticalMenu,
  VerticalMenuLink,
} from "@repo/ui/components/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useGetTeamsQuery } from "@repo/redux-utils/src/endpoints/manage-team";
import TeamDetails from "@/src/app/dashboard/settings/teams/_tabs/team-details.tsx";
import Members from "@/src/app/dashboard/settings/teams/_tabs/members.tsx";
// import Roles from "@/src/app/dashboard/settings/teams/_tabs/roles.tsx";
// hide permissions tab for now
// import Permissions from "@/src/app/dashboard/settings/teams/_tabs/permissions.tsx";
import TeamSettings from "@/src/app/dashboard/settings/teams/_tabs/team-settings.tsx";
import CreateTeam from "./_components/create-team";

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
  // {
  //   label: "Roles",
  //   id: "roles",
  //   component: Roles,
  // },
  // hide permissions tab for now
  // {
  //   label: "Permissions",
  //   id: "Permissions",
  //   component: Permissions,
  // },
  {
    label: "Settings",
    id: "Settings",
    component: TeamSettings,
  },
];

export default function Page() {
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [teams, setTeams] = useState<Team[]>([]); // Manage teams state here
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: fetchedTeams = null, refetch } = useGetTeamsQuery(undefined);

  useEffect(() => {
    if (fetchedTeams && fetchedTeams.length > 0) {
      setTeams(fetchedTeams);
    }

    if (fetchedTeams && fetchedTeams.length === 0) {
      setTeams([]);
      setCurrentTeam(null);
    }
  }, [fetchedTeams]);

  useEffect(() => {
    if (teams.length > 0 && !currentTeam) {
      setCurrentTeam(teams[0]);
    }

    // check if current team is still in the teams
    if (
      teams.length > 0 &&
      currentTeam &&
      !teams.some((team) => team._id === currentTeam._id)
    ) {
      setCurrentTeam(teams[0]);
    }
  }, [teams, currentTeam]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleChangeTeam = useCallback((team: Team) => {
    setCurrentTeam(team);
  }, []);

  const handleAddTeam = useCallback((newTeam: Team) => {
    setTeams((prevTeams) => [...prevTeams, newTeam]);
    setCurrentTeam(newTeam); // Optionally set the newly added team as the current team
  }, []);

  const filteredTeams = useMemo(() => {
    return teams.filter((team: Team) =>
      team.team.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, teams]);

  const TeamResultComponent = (
    <div className="flex gap-5 space-x-4">
      <div className="min-w-[200px] max-w-[300px]">
        <VerticalMenu className="!shadow-none">
          <div className="relative flex w-[225px] w-full flex-row justify-between gap-2">
            <MagnifyingGlassIcon className="absolute left-2 top-1.5 h-5 w-5 text-gray-500" />
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
              active={team._id === currentTeam?._id}
              key={team._id}
              className="cursor-pointer"
              onClick={() => {
                handleChangeTeam(team);
              }}
            >
              {team.team}
            </VerticalMenuLink>
          ))}
        </VerticalMenu>
      </div>
      <div className="h-full min-h-[1000px] border-l border-gray-300" />

      <div className="w-full">
        {currentTeam ? (
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
                    <TabComponent
                      team={currentTeam}
                      refetchTeamList={refetch}
                    />
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>
        ) : null}
      </div>
    </div>
  );

  const NoResultsComponent = (
    <div className="flex w-full flex-col items-center justify-center px-4 py-28">
      <div className="text-center font-montserrat text-4xl font-medium leading-[48px] text-gray-800">
        Doesn&apos;t have a team yet?
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
        <CreateTeam onAddTeam={handleAddTeam} />
      </div>

      <Separator className="my-2" />
      {teams.length > 0 ? TeamResultComponent : NoResultsComponent}
    </div>
  );
}
