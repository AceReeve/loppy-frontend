import { CheckIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { LoadingOverlay } from "@repo/ui/loading-overlay.tsx";
import { usePaywallState } from "@/src/providers/paywall-provider";
import { paymentPlanDetails } from "@/src/data/payment-plan-details";

export default function PaywallPlanSelection() {
  const { onPlanSelect } = usePaywallState();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className="m-auto p-5 pb-7">
      <Image
        alt=""
        className="absolute left-[50%] top-0 -ml-[66px] -mt-[60px] size-32 object-contain"
        height={141}
        src="/assets/images/logo.png"
        width={138}
      />
      <div className="mt-14 flex flex-col items-center gap-3 text-center">
        <h1 className="self-stretch text-4xl font-bold text-[#fff]">
          The Right Plan for Your Business
        </h1>
        <div className="flex items-center gap-5">
          <div className="text-md font-montserrat font-bold tracking-wide text-[#fff]">
            Bill Monthly
          </div>
          <div className="inline-flex h-7 w-14 items-center justify-start rounded-[40px] bg-white px-[5px] pb-1.5 pt-[5px]">
            <div className="relative h-full w-5 rounded-[40px] bg-gradient-to-br from-orange-500 to-yellow-500" />
          </div>
          <div className="text-md font-montserrat font-bold tracking-wide text-[#fff]">
            Bill Annually
          </div>
        </div>
        <div className="relative mt-3 flex items-start gap-[53px]">
          {Object.entries(paymentPlanDetails).map(([key, item], index) => (
            <div
              className={`relative flex max-w-[323px] flex-1 flex-col items-center rounded-[32px] px-[25px] py-[18px] ${index % 2 === 1 ? "bg-gradient-to-br from-orange-500 to-yellow-500" : "bg-white"}`}
              key={key}
            >
              <div className={index % 2 === 1 ? "text-white" : "text-black"}>
                <div className="w-full text-center font-montserrat">
                  <div className="text-sm font-medium leading-normal tracking-wide">
                    {item.name}
                  </div>
                  <div className="text-center text-xl font-extrabold capitalize leading-normal tracking-wide">
                    {item.title}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="font-nunito text-4xl font-extrabold capitalize leading-[56px] tracking-wider">
                    ${item.cost}
                  </div>
                  <div
                    className={`mt-3 text-sm font-normal leading-normal ${index % 2 === 1 ? "text-white" : "text-gray-500"}`}
                  >
                    /month
                  </div>
                </div>
              </div>

              <div
                className={`flex flex-col gap-[7px] ${index % 2 === 1 ? "text-white" : "text-gray-500"}`}
              >
                {item.inclusions.map((inclusion, index2) => (
                  <div
                    className="flex  items-start justify-start gap-2 self-stretch text-left"
                    // eslint-disable-next-line react/no-array-index-key -- only index can be used
                    key={index2}
                  >
                    <CheckIcon
                      className={`relative size-5 shrink-0 ${index % 2 === 1 ? "text-white" : "text-[#03AEB9]"}`}
                    />
                    <div className="text-sm font-normal leading-normal">
                      {inclusion}
                    </div>
                  </div>
                ))}
                <button
                  className={`mt-5 ${index % 2 === 1 ? "btn-solid-white" : "btn-gradient-primary-lg"}`}
                  onClick={() => {
                    onPlanSelect(item);
                  }}
                  type="button"
                >
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="-mt-5 text-primary underline"
          onClick={() => {
            setIsLoading(true);
            void signOut({ callbackUrl: "/" });
          }}
          type="button"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
