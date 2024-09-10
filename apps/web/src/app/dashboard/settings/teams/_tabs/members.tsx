"use client";
import React, { useEffect } from "react";
import { useGetTeamMembersQuery } from "@repo/redux-utils/src/endpoints/manage-team";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { memberColumns } from "@/src/app/dashboard/settings/teams/_components/member-columns2.tsx";
import { MemberDataTable } from "../_components/member-data-table";

export interface TeamDetailsProps {
  team: Team;
}

interface Team {
  _id: string;
  team: string;
  description: string;
  team_members: TeamMembers[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface TeamMembers {
  _id: string;
  email: string;
  role_name: string;
  status: string;
}

interface GetTeamMemberResponse {
  team_members: TeamMembers[];
}

export default function Members(props: TeamDetailsProps) {
  const {
    data: memberList = {} as GetTeamMemberResponse,
    isLoading,
    refetch,
  } = useGetTeamMembersQuery(props.team._id);

  useEffect(() => {
    void refetch();
  }, [props.team]);

  // const memberList = [
  //   {
  //     first_name: "Antonio",
  //     last_name: "Bennet",
  //     email: "hu@oru.net",
  //     role: "Administrator",
  //     members: 1,
  //   },
  //   {
  //     first_name: "Antonio",
  //     last_name: "Bennet",
  //     email: "hu@oru.net",
  //     role: "Manager",
  //     members: 4,
  //   },
  //   {
  //     first_name: "Antonio",
  //     last_name: "Bennet",
  //     email: "hu@oru.net",
  //     role: "Member",
  //     members: 2,
  //   },
  //   {
  //     first_name: "Antonio",
  //     last_name: "Bennet",
  //     email: "hu@oru.net",
  //     role: "Observer",
  //     members: 1,
  //   },
  // ];

  const NoResultsComponent = (
    <div className="flex w-full flex-col items-center justify-center px-4 py-28">
      {/* TODO: remove this */}
      <p className="hidden">{props.team.team}</p>
      <div className="text-center font-montserrat text-4xl font-medium leading-[48px] text-gray-800">
        Time to get organized
      </div>
      <div className="mt-4 max-w-[641px] text-center font-nunito text-sm font-normal leading-normal text-gray-700">
        Start by giving Cuboid data to work with, like contacts. After, you can
        sort search, and filter to find to find what you need and hide what you
        don’t.
      </div>
      <img
        className="h-[149px] w-[126px]"
        src="/assets/icons/icon-no-data-contacts.svg"
        alt=""
      />
    </div>
  );

  return (
    <div className="p-4">
      {/* <MemberDataTable
        columns={memberColumns}
        data={memberList}
        noResultsComponent={NoResultsComponent}
      /> */}
      {isLoading ? (
        <div className="flex w-full flex-col items-center justify-center px-4 py-28">
          <LoadingSpinner />
        </div>
      ) : (
        <MemberDataTable
          teamId={props.team._id}
          refetch={refetch}
          columns={memberColumns}
          data={memberList.team_members}
          noResultsComponent={NoResultsComponent}
        />
      )}
    </div>
  );
}
