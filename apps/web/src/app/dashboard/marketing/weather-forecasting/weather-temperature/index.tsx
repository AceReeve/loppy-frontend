"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TemperatureChart(data) {
  const series: ApexOptions["series"] = [
    {
      name: "Temperature",
      data: [15, 14, 16, 12],
      color: "#FFFFFF",
    },
  ];
  const options: ApexOptions = {
    colors: ["#0085FF", "#0085FF"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#FFFFFF"],
        inverseColors: true,
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 0,
        opacityTo: 1,
        stops: [0, 20, 80, 100],
      },
    },
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
      borderColor: "gray",

      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      show: true,
    },
    markers: {
      size: 6,
      strokeColors: "#BADCFF",
      strokeWidth: 4,
    },

    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
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
          cssClass: "text-xs font-normal fill-[#FFFFFF]/80",
        },
      },

      categories: ["Morning", "Afternoon", "Evening", "Night"],

      axisBorder: {
        show: false,
      },
    },

    yaxis: {
      min: 10,
      max: 20,
      stepSize: 1,
      labels: {
        style: {
          fontFamily: "Roboto, sans-serif",
          cssClass: "text-xs font-normal fill-[#636178]/80",
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
  };

  return (
    <div className="relative size-full overflow-hidden lg:h-[250px]">
      <Chart
        options={options}
        series={series}
        width="100%"
        height="200px"
        type="line"
      />
      <div className="flex justify-between ml-4 content-center overflow-hidden">
        {series[0].data.map((temp: any, index) => (
          <p
            key={index}
            className="px-2 text-center text-white font-roboto font-light"
          >
            {temp}°
          </p>
        ))}
      </div>
    </div>
  );
}
