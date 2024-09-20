import Image from "next/image";
import { Separator } from "@repo/ui/components/ui";
import { format } from "date-fns";
import { useGetTeamMembersQuery } from "@repo/redux-utils/src/endpoints/manage-team";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import DetailsCard from "@/src/app/dashboard/settings/teams/_components/details-card.tsx";

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

export default function TeamDetails(props: TeamDetailsProps) {
  const [profileSrc, setProfileSrc] = useState<string>(
    "/assets/images/logo.png",
  );

  const {
    data: team,
    isLoading,
    refetch,
  } = useGetTeamMembersQuery(props.team._id);

  useEffect(() => {
    void refetch();
  }, [props.team]);

  useEffect(() => {
    if (team) {
      setProfileSrc(team.profile?.image_1.path ?? "/assets/images/logo.png");
    }
  }, [team]);

  return (
    <div className="relative">
      {isLoading ? (
        <div className="m-auto flex h-full flex-col items-center justify-center space-y-6">
          <LoadingSpinner />
          <p>Loading, please wait...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap space-x-4 p-8 pb-0">
            <div className="my-4 flex min-h-[100px] min-w-[100px] flex-wrap content-center rounded-full bg-slate-200 shadow-lg">
              <Image
                src={profileSrc}
                alt=""
                onError={() => {
                  setProfileSrc("/assets/images/logo.png");
                }}
                width={138}
                height={141}
                className="m-auto size-[150px] w-[150px] object-contain transition-all duration-500"
              />
            </div>

            <div className="m-auto block flex flex-col font-poppins">
              <h1 className="font-nunito text-[16px] ">{team?.team}</h1>
              <p className="mt-2 max-w-[600px] font-light leading-7 text-slate-400">
                {team?.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <p className=" text-end text-[12px] font-light italic text-slate-400">
              Date created: {format(props.team.created_at, "MMMM d, yyyy")}
            </p>
          </div>

          <div className="font-poppins">
            <h1 className="text-[18px]">Overview</h1>
            <Separator />
            <div className="flex flex-wrap gap-14 p-4">
              <DetailsCard
                count={team?.overview.members ?? 0}
                title="Members"
              />
              <DetailsCard count={team?.overview.roles ?? 0} title="Roles" />
            </div>
          </div>

          {team && team.roles.length > 0 ? (
            <div className="font-poppins">
              <h1 className="text-[18px]">Roles</h1>
              <Separator />
              <div className="flex flex-wrap gap-14 p-4">
                {team.roles.map((role) => (
                  <DetailsCard
                    key={role.role_name}
                    count={role.count}
                    title={role.role_name}
                  />
                ))}
              </div>
              <Separator />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
