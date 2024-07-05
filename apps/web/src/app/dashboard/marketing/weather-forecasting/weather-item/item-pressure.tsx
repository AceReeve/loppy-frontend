import React from "react";

export default function Pressure() {
  return (
    <div className="h-full w-full select-none">
      <div className="relative h-[110px] w-[110px]">
        {/* Arrow */}
        <div className="absolute bottom-0 left-0 right-0 top-0 z-20 flex content-center items-center  justify-center">
          <img
            className="relative mx-auto mb-2 mr-6 origin-bottom -rotate-[25deg] content-center "
            src="/assets/icons/weather-forecast/icon-pressure-arrow-s.svg"
            alt="Arrow"
          />
        </div>

        {/* Compass */}
        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center">
          <img
            src="/assets/icons/weather-forecast/icon-pressure-bg.svg"
            alt="Compass"
          />
        </div>
      </div>
    </div>
  );
}
