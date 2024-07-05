import { Separator, Switch } from "@repo/ui/components/ui";
import Image from "next/image";
import React from "react";

interface AccountProp {
  image: string;
  name: string;
  description: string;
  isConnected: boolean;
  index: number;
  toggleIsConnected: (index: number) => void;
}

export default function AccountComponent(accountProp: AccountProp) {
  const handleToggleSwitch = () => {
    accountProp.toggleIsConnected(accountProp.index);
  };
  return (
    <div className="col-span-5">
      {accountProp.index < 2 && <Separator />}
      <div className=" h- flex h-[90px] gap-3 bg-white p-4">
        <div className="flex  items-center">
          <Image
            //ref={loginObject}
            alt="login-cover"
            width={50}
            height={50}
            src={accountProp.image}
            //className=" z-20  max-h-[630px] w[730px] -ml-40 my-auto size-full"
            className=" z-20 m-auto hidden h-[50px] w-[50px] select-none xl:block"
            draggable={false}
          />
        </div>
        <div className="flex w-full justify-between">
          <div className="inline">
            <h1 className="font-semibold">{accountProp.name} </h1>
            <p className="text-sm text-gray-500">{accountProp.description}</p>
          </div>
          <div className="flex items-center justify-center ">
            <Switch
              className="bg-orange-500"
              checked={accountProp.isConnected}
              onChange={handleToggleSwitch}
            />
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
}
