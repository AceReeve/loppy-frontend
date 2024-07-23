import Image from "next/image";
import { Separator } from "@repo/ui/components/ui";
import DetailsCard from "@/src/app/dashboard/settings/teams/_components/details-card.tsx";

export default function TeamDetails() {
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
      <div className="flex flex-wrap space-x-4 p-8 ">
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
          <h1 className="font-nunito text-[16px] ">MARKETING</h1>
          <p className="mt-2 max-w-[600px] font-light leading-7 text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac
            consequat arcu. Maecenas sagittis odio at diam varius commodo.
            Vestibulum viverra ante eu diam imperdiet dignissim.
          </p>
        </div>
        <p className="flex flex-col justify-end text-[12px] font-light  italic text-slate-400">
          Date created June 25, 2024
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
