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
    <div className="relative h-[110px] w-[110px] select-none">
      {/* Arrow */}
      <div className="absolute bottom-0 left-0 right-0 top-0 z-20 flex items-center  justify-center">
        <img
          className="rotate-180 opacity-0"
          ref={arrow}
          src="/assets/icons/weather-forecast/icon-compass-arrow.svg"
          alt="Arrow"
        />
      </div>

      {/* Compass */}
      <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center">
        <img
          src="/assets/icons/weather-forecast/icon-compass.svg"
          alt="Compass"
        />
      </div>
    </div>
  );
}
