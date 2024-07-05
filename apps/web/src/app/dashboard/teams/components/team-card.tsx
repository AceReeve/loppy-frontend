"use client";
import { Button, Card, Separator } from "@repo/ui/components/ui";
/*interface Prop {
  name: string;
  job: string;
  email: string;
  role: string;
}*/
export default function TeamCard() {
  return (
    <Card className="grid-span-2 relative h-[350px] rounded-xl bg-white ">
      <div className="text-cente4 m-auto w-full p-2 text-center text-black shadow-sm ">
        Admin
      </div>
      <div className="p-3">
        <div className="m-auto h-[150px] w-[150px] rounded-full bg-red-500" />
      </div>
      <Separator />
      <div className="relative  w-full  text-center text-black">
        <h1 className="text-[22px] font-semibold">Raphael Adrian</h1>
        <p className="text-[18px]">Front End Developer</p>
        <p className="text-[12px]">email@gmail.com</p>
        <div className="flex justify-center gap-2">
          <Button className="h-4">Message</Button>
          <Button className="h-4">Update</Button>
        </div>
        <p className="text-[12px]">Team Member since Dec 25,2023</p>
      </div>
    </Card>
  );
}
