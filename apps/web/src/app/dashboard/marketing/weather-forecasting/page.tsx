import React from "react";
import { Button } from "@repo/ui/components/ui";
import WeatherItem from "@/src/app/dashboard/marketing/weather-forecasting/weather-item";
import TemperatureChart from "@/src/app/dashboard/marketing/weather-forecasting/weather-temperature";

function Page() {
  const items = [
    {
      header: "Wind",
      description: "Today wind speed",
      measurement: "12km/h",
    },
    {
      header: "Rain Chance",
      description: "Today rain chance",
      measurement: "24%",
    },
    {
      header: "Pressure",
      description: "Today Pressure",
      measurement: "720 hpa",
    },
    {
      header: "UV Index",
      description: "Today UV Index",
      measurement: "2",
    },
  ];

  return (
    <div className="p-10 lg:overflow-x-hidden">
      <div className="flex w-full justify-end">
        <Button className="rounded-xl">Change Location</Button>
      </div>
      <div className="mt-14 xl:flex ">
        <div className="w-full">
          <div className="min-w-[464px] relative min-h-[380px] w-full rounded-lg bg-gradient-to-b from-[#401A65] to-[#091728] p-9 overflow-clip">
            <div className="grid h-full w-full 2xl:grid-cols-2 gap-4">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      className="h-[22.07px] w-[18.76px]"
                      src="/assets/icons/weather-forecast/icon-location.svg"
                    />
                    <div className="h-[30.89px] w-[87.17px] font-nunito text-lg font-semibold leading-7 text-white">
                      Gotham
                    </div>
                  </div>
                  <div className="text-right font-montserrat text-sm font-normal leading-tight text-white">
                    Today 00:32 PM
                  </div>
                </div>
                <div className="relative flex h-[178.74px] flex-col">
                  <div className="flex justify-center">
                    <div className="text-center font-nunito text-[100px] font-normal leading-[140px] text-white">
                      12
                    </div>
                    <div className="text-center font-nunito text-5xl font-normal leading-[67.20px] text-white">
                      °
                    </div>
                  </div>
                  <div className="text-center font-nunito text-base font-medium leading-snug text-white">
                    Mostly Clear
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/icons/weather-forecast/icon-pressure.svg"
                      className="relative h-5 w-5"
                    />
                    <div className="font-nunito text-sm font-semibold leading-tight text-white">
                      720hpa
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/icons/weather-forecast/icon-raindrop.svg"
                      className="relative h-5 w-5"
                    />
                    <div className="font-nunito text-sm font-semibold leading-tight text-white">
                      32%
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/icons/weather-forecast/icon-weather-wind-breeze.svg"
                      className="relative h-5 w-5"
                    />
                    <div className="font-nunito text-sm font-semibold leading-tight text-white">
                      12km/h
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full rounded-lg bg-white/30 p-6 w-full overflow-clip ">
                <div className="font-nunito text-lg leading-7 text-white">
                  Temperature
                </div>
                <div className="m-auto md:h-[200px] lg:h-full w-full size-full">
                  <TemperatureChart />
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-7 sm:grid w-full lg:grid-cols-2 gap-8">
            {items.map((item, index) => (
              <WeatherItem
                key={index}
                header={item.header}
                description={item.description}
                measurement={item.measurement}
              ></WeatherItem>
            ))}
          </div>
        </div>
        <div className="border-gray-[#E1E7EB] sm:mt-16 sm:m-auto  xl:ml-14 max-w-[412px]  border-l-2 px-12  lg:mt-10">
          <div className="flex justify-between">
            <img
              className="h-4 w-[9px] rotate-180"
              src="/assets/icons/weather-forecast/icon-arrow-right.svg"
            />
            <div className="font-nunito text-xl font-medium leading-relaxed text-gray-800">
              This Week
            </div>
            <img
              className="h-4 w-[9px]"
              src="/assets/icons/weather-forecast/icon-arrow-right.svg"
              alt="arrow"
            />
          </div>
          <div className="mt-7 font-nunito text-base font-normal leading-snug text-gray-800">
            Today
          </div>
          <div className="mt-6">
            <div className="inline-flex h-[110px] w-[437px] items-center justify-start">
              <div className="relative h-[110px] w-[77px] font-nunito">
                <div className="absolute left-0 top-0 h-[110px] w-[77px] rounded-xl bg-slate-700" />
                <div className="absolute left-[27px] top-[77px] text-center text-base font-semibold leading-snug text-white">
                  12°
                </div>
                <div className="absolute left-[26px] top-[12px] text-center text-xs font-normal leading-none text-white opacity-90">
                  Now
                </div>
                <div className="absolute left-[23px] top-[37px] h-8 w-8 rounded-[100px] bg-white" />
              </div>
              {Array.from({ length: 3 }).map((_item, index) => (
                <div
                  className="relative h-[110px] w-[77px] font-nunito"
                  key={index}
                >
                  <div className="absolute left-0 top-0 h-[110px] w-[77px] rounded-xl" />
                  <div className="absolute left-[27px] top-[77px] text-center text-base font-semibold leading-snug text-gray-800">
                    12°
                  </div>
                  <div className="absolute left-[26px] top-[12px] text-center text-xs font-normal leading-none text-gray-800 opacity-90">
                    01PM
                  </div>
                  <div className="absolute left-[23px] top-[37px] h-8 w-8 rounded-[100px] bg-yellow-400" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-7 font-nunito">
            {Array.from({ length: 7 }).map((_item, index) => (
              <div className="relative h-[52px] w-72" key={index}>
                <div className="font-['Plus Jakarta Sans'] absolute left-[144px] top-[12px] text-xl font-semibold leading-7 text-gray-800">
                  16°
                </div>
                <div className="absolute left-0 top-0 h-[52px] w-[87px]">
                  <div className="font-['Plus Jakarta Sans'] absolute left-0 top-0 text-base font-normal leading-snug text-gray-800">
                    Tomorrow
                  </div>
                  <div className="font-['Plus Jakarta Sans'] absolute left-0 top-[30px] text-base font-normal leading-snug text-neutral-400">
                    12 Apr
                  </div>
                </div>
                <div className="absolute left-[240px] top-[2px] h-12 w-12 rounded-[100px] bg-yellow-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
