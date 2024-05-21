"use client";

import themeColors from "@repo/tailwind-config/theme-colors.ts";
import { useId, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = {
  colorProgress?: string[];
  size?: number;
  strokeWidth?: number;
  value?: number;
  label?: ((_value: number) => React.ReactNode) | boolean;
  className?: string;
  colorBg?: string[] | boolean;
};

export default function RingProgress({
  colorProgress = [themeColors.primary.DEFAULT],
  size = 192,
  strokeWidth = 30,
  value = 25,
  label = true,
  className,
  colorBg = ["var(--color-chart-bg)"],
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetCircumference = circumference * (value / 100);
  const id = useId();
  const progressRef = useRef(null);
  const [currentProgress, setCurrentProgress] = useState(0);

  useGSAP(() => {
    // gsap code here...
    const tween = gsap.to(progressRef.current, {
      onUpdate: () => {
        setCurrentProgress(Math.floor(value * tween.progress()));
      },
      strokeDasharray: `${targetCircumference} ${circumference}`,
      ease: "power4.out",
      duration: 1.5,
    });
  });

  return (
    <div
      className={`relative flex flex-col place-content-center text-center ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        className="absolute left-0 top-0 size-full"
      >
        <mask id={`containerMask${id}`}>
          <circle
            r={radius}
            cx={size / 2}
            cy={size / 2}
            strokeWidth={strokeWidth}
            className="fill-[#000] stroke-[#fff]"
          />
        </mask>
        <mask id={`progressMask${id}`}>
          <circle
            r={radius}
            cx={size / 2}
            cy={size / 2}
            strokeWidth={strokeWidth}
            strokeDasharray={`0 ${circumference}`}
            ref={progressRef}
            className="origin-center -rotate-90 fill-[#000] stroke-[#fff]"
          />
        </mask>
        <defs>
          <linearGradient
            id={`pieChartGradient${id}`}
            gradientTransform="rotate(90)"
          >
            {colorProgress.map((color, index) => (
              <stop
                key={index}
                offset={index * (100 / (colorProgress.length - 1 || 1))}
                stopColor={color}
              />
            ))}
          </linearGradient>
        </defs>
        <defs>
          <linearGradient
            id={`pieChartGradientBg${id}`}
            gradientTransform="rotate(90)"
          >
            {typeof colorBg === "object" &&
              colorBg?.map((color, index) => (
                <stop
                  key={index}
                  offset={index * (100 / (colorProgress.length - 1 || 1))}
                  stopColor={color}
                />
              ))}
          </linearGradient>
        </defs>
        <rect
          width={192}
          height={192}
          fill={`url(#pieChartGradientBg${id})`}
          mask={`url(#containerMask${id})`}
        />
        <rect
          width={192}
          height={192}
          fill={`url(#pieChartGradient${id})`}
          mask={`url(#progressMask${id})`}
        />
      </svg>
      <div className="relative font-roboto text-[26px] font-bold leading-tight text-black">
        {label === true
          ? `${currentProgress}%`
          : label && label(currentProgress)}
      </div>
    </div>
  );
}
