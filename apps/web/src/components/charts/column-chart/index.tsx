"use client";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useThemeVariables } from "@repo/hooks-and-utils/hooks/use-theme-variables";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ColumnChart() {
  const { getColorVariable } = useThemeVariables();
  const colorPrimary = getColorVariable("--color-primary");

  const series: ApexOptions["series"] = [
    {
      color: "#CFCFCF",
      name: "Previous",
      data: [200, 100, 160, 50, 300, 70, 180, 200, 90, 100, 450, 300],
    },
    {
      color: colorPrimary,
      name: "Current",
      data: [225, 175, 150, 120, 250, 170, 120, 120, 390, 120, 250, 200],
    },
  ];
  const options: ApexOptions = {
    colors: ["#1A56DB", "#FDBA8C"],
    chart: {
      height: "140px",
      fontFamily: "Inter, sans-serif",
      foreColor: "#4B5563",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "65%",
        borderRadius: 8,
        borderRadiusApplication: "end",
      },
    },
    tooltip: {
      shared: false,
      intersect: false,
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 1,
        },
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      borderColor: "#EAEAEA",
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "top",
      itemMargin: {
        horizontal: 20,
      },
      markers: {
        radius: 50,
        width: 8,
        height: 8,
        offsetX: -5,
      },
    },
    xaxis: {
      labels: {
        style: {
          fontFamily: "Roboto, sans-serif",
          cssClass: "text-sm font-medium fill-[#B2B2B2]",
        },
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },

    yaxis: {
      min: 0,
      max: 500,
      stepSize: 100,
      labels: {
        style: {
          fontFamily: "Roboto, sans-serif",
          cssClass:
            "text-xs font-medium fill-[#B2B2B2] leading-tight tracking-tight",
        },
        formatter: (value) => {
          return `${value.toString()}k`;
        },
      },
    },
    fill: {
      type: "gradient",
      colors: ["#CFCFCF", colorPrimary],
      gradient: {
        type: "vertical",
        gradientToColors: ["#CFCFCF", colorPrimary ?? "#000"],
        opacityTo: [1, 0.66],
        stops: [0, 100],
      },
    },
  };

  return (
    <div className="absolute left-0 top-3 size-full px-4 py-5">
      <Chart
        height="100%"
        options={options}
        series={series}
        type="bar"
        width="100%"
      />
    </div>
  );
}
