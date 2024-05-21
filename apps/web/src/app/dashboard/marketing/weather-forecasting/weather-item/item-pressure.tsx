import React from "react";

export default function Pressure() {
  return (
    <div className={"h-full w-full select-none"}>
      <div className="h-[110px] w-[110px] relative">
        {/* Arrow */}
        <div
          className={`absolute top-0 left-0 right-0 bottom-0 flex content-center items-center justify-center  z-20`}
        >
          <img
            className="origin-bottom mx-auto mr-6 mb-2 relative content-center -rotate-[25deg] "
            src="/assets/icons/weather-forecast/icon-pressure-arrow-s.svg"
            alt="Arrow"
          />
        </div>

        {/* Compass */}
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10">
          <img
            src="/assets/icons/weather-forecast/icon-pressure-bg.svg"
            alt="Compass"
          />
        </div>
      </div>
    </div>
  );
}
