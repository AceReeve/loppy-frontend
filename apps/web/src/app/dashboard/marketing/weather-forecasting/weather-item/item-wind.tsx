import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Wind() {
  const arrow = useRef(null);

  useGSAP(() => {
    gsap.to(arrow.current, {
      rotation: 360,
      duration: 1.5,
      opacity: 1,
    });
  });

  return (
    <div className="h-[110px] w-[110px] relative select-none">
      {/* Arrow */}
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center  z-20`}
      >
        <img
          className={"rotate-180 opacity-0"}
          ref={arrow}
          src="/assets/icons/weather-forecast/icon-compass-arrow.svg"
          alt="Arrow"
        />
      </div>

      {/* Compass */}
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10">
        <img
          src="/assets/icons/weather-forecast/icon-compass.svg"
          alt="Compass"
        />
      </div>
    </div>
  );
}
