"use client";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function LineChart() {
  const series: ApexOptions["series"] = [
    {
      name: "New users",
      data: [100, 250, 150, 190, 350, 300],
      color: "#1A56DB",
    },
  ];
  const options: ApexOptions = {
    colors: ["#0085FF", "#0085FF"],
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
          cssClass: "text-xs font-normal fill-[#636178]/80",
        },
      },
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },

    yaxis: {
      min: 0,
      max: 500,
      stepSize: 100,
      labels: {
        style: {
          fontFamily: "Roboto, sans-serif",
          cssClass: "text-xs font-normal fill-[#636178]/80",
        },
      },
    },
    stroke: {
      curve: "smooth",
    },
  };

  return (
    <div className="relative -mt-5 size-full">
      <Chart
        height="100%"
        options={options}
        series={series}
        type="line"
        width="100%"
      />
    </div>
  );
}
