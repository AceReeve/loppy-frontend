import Image from "next/image";
import { Separator } from "@repo/ui/components/ui";
import { format } from "date-fns";
import DetailsCard from "@/src/app/dashboard/settings/teams/_components/details-card.tsx";

interface TeamDetailsProps {
  team: Team;
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

export default function TeamDetails(props: TeamDetailsProps) {
  const overview = [
    {
      id: 1,
      title: "Members",
      count: 10,
    },
    {
      id: 2,
      title: "Roles",
      count: 4,
    },
  ];

  const roles = [
    {
      id: 1,
      title: "Administrator",
      count: 2,
    },
    {
      id: 2,
      title: "Manager",
      count: 4,
    },
    {
      id: 3,
      title: "Member",
      count: 2,
    },
    {
      id: 4,
      title: "Observer",
      count: 2,
    },
  ];

  return (
    <div className="relative">
      <div className="flex flex-wrap space-x-4 p-8 pb-0">
        <div className="my-4 flex min-h-[100px] min-w-[100px] flex-wrap content-center rounded-full bg-slate-200 shadow-lg">
          <Image
            src="/assets/images/logo.png"
            alt=""
            width={138}
            height={141}
            className="m-auto size-[150px] w-[150px] object-contain transition-all duration-500"
          />
        </div>

        <div className="m-auto block flex flex-col font-poppins">
          <h1 className="font-nunito text-[16px] ">{props.team.team}</h1>
          <p className="mt-2 max-w-[600px] font-light leading-7 text-slate-400">
            {props.team.description}
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
          {overview.map((detail) => (
            <DetailsCard
              key={detail.id}
              count={detail.count}
              title={detail.title}
            />
          ))}
        </div>
      </div>

      <div className="font-poppins">
        <h1 className="text-[18px]">Roles</h1>
        <Separator />
        <div className="flex flex-wrap gap-14 p-4">
          {roles.map((role) => (
            <DetailsCard key={role.id} count={role.count} title={role.title} />
          ))}
        </div>
        <Separator />
      </div>
    </div>
  );
}
