import React from "react";
import { PendingDataTable } from "@/src/app/dashboard/settings/users/_data-table/pending-data.tsx";
import { GetInviteUserResponse } from "@repo/redux-utils/src/endpoints/types/settings-user";
import { pendingColumns } from "@/src/app/dashboard/settings/users/_columns/pending-columns.tsx";
interface ActiveMembersProps {
  usersData?: GetInviteUserResponse["users"];
}
export default function PendingInvites(props: ActiveMembersProps) {
  const memberList = [
    {
      first_name: "Antonio",
      last_name: "Bennet",
      email: "hu@oru.net",
      role: "Administrator",
      members: 1,
    },
    {
      first_name: "Antonio",
      last_name: "Bennet",
      email: "hu@oru.net",
      role: "Manager",
      members: 4,
    },
    {
      first_name: "Antonio",
      last_name: "Bennet",
      email: "hu@oru.net",
      role: "Member",
      members: 2,
    },
    {
      first_name: "Antonio",
      last_name: "Bennet",
      email: "hu@oru.net",
      role: "Observer",
      members: 1,
    },
  ];

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
    <div>
      {props.usersData ? (
        <PendingDataTable
          columns={pendingColumns}
          data={props.usersData}
          noResultsComponent={NoResultsComponent}
        />
      ) : (
        <div>ERROR: Users data is not available</div>
      )}
    </div>
  );
}
