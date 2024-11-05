import { Button } from "@repo/ui/components/ui";
import Image from "next/image";
import React from "react";

interface AccountProp {
  image: string;
  name: string;
  description: string;
  index: number;
  button?: React.ReactNode;
}

export default function AccountComponent(accountProp: AccountProp) {
  return (
    <div className="col-span-5">
      <div className="flex h-[90px] gap-3 p-4">
        <div className="flex items-center">
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
            {accountProp.button ?? (
              <Button variant="outline" disabled>
                Coming Soon
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
