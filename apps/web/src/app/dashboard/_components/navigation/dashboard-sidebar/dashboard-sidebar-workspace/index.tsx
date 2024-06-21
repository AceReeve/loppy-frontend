import { Button } from "@headlessui/react";
import { Avatar, AvatarFallback } from "@repo/ui/components/ui";

export default function WorkspaceButton() {
  return (
    <Button className="m-auto flex h-[80px] w-[400px] items-center justify-between gap-2 rounded-2xl border-2 border-[#BFBBC2] bg-[#F2F2F2] px-5 hover:bg-gray-100/80">
      <Avatar className="h-[60px] w-[60px]">
        <AvatarFallback className="bg-orange-500 text-[42px] text-white">
          S
        </AvatarFallback>
      </Avatar>
      <div className="bg-red font-nunito block text-left text-[#43444B]">
        <p className="text-[16px]">Test workspace</p>
        <p className="text-[14px] font-light">Servi Hero Developers</p>
      </div>
      <div className="flex w-1/3 justify-end">
        <div className="flex">
          {Array.from({ length: 3 }).map((_item) => (
            <Avatar className="-ml-4 h-[40px] w-[40px] border-2 border-white">
              <AvatarFallback className="bg-orange-500 text-[20px] text-white">
                G
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <p className="content-center text-sm font-light text-[#43444B] ">22+</p>
      </div>
    </Button>
  );
}
