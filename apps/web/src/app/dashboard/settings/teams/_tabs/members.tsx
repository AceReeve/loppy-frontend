"use client";

import React, { useEffect } from "react";
import { useGetTeamMembersQuery } from "@repo/redux-utils/src/endpoints/manage-team";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { memberColumns } from "@/src/app/dashboard/settings/teams/_components/member-columns2.tsx";
import { MemberDataTable } from "../_components/member-data-table";

interface TeamDetailsProps {
  team: Team;
  refetchTeamList: () => void;
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

  const NoResultsComponent = (
    <div className="flex w-full flex-col items-center justify-center px-4 py-28">
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
      {isLoading ? (
        <div className="m-auto flex h-full flex-col items-center justify-center space-y-6">
          <LoadingSpinner />
          <p>Loading, please wait...</p>
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
