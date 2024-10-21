/* eslint-disable -- will do later since this is a lot */

"use client";
import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  Separator,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DialogTitle,
} from "@repo/ui/components/ui";
import {
  useGetWeatherDailyQuery,
  useGetWeatherDayQuery,
} from "@repo/redux-utils/src/endpoints/weather.ts";
import { AlertCircle } from "lucide-react";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import TemperatureChart from "@/src/app/dashboard/weather-forecasting/weather-temperature";
import WeatherItem from "@/src/app/dashboard/weather-forecasting/weather-item";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { cities, states } from "@/src/data/states";
import WeatherIcon from "@/src/app/dashboard/weather-forecasting/_components/weather-icons.tsx";

function Page() {
  const [city, setCity] = useState("London");
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  //const inputRef = useRef(null);
  const {
    data: weather,
    error: dayError,
    isLoading: dayIsLoading,
  } = useGetWeatherDayQuery({ city });

  /*
  String.prototype.toCapitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  };
*/

  const {
    data: weatherDaily,
    error: dailyError,
    isLoading: dailyIsLoading,
  } = useGetWeatherDailyQuery({ city });

  /*  const handleChangeCity = (value: string) => {
    setSelectedCity(value);
  };*/

  //const [weather, setWeather] = useState<WeatherData | null>(null);

  /*  useEffect(() => {
    if (weatherDaily && weatherDaily.list && weatherDaily.list.length > 0) {
      setWeather(weatherDaily.list[0]);
    }
  }, [weatherDaily]);*/

  const handleSubmit = () => {
    //event.preventDefault();
    setCity(selectedCity);
    setOpen(false);
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
    });
  }

  function getDayOfWeek(dateString: string) {
    const dayOfWeek = new Date(dateString).getDay();
    let dayName;

    switch (dayOfWeek) {
      case 0:
        dayName = "Sunday";
        break;
      case 1:
        dayName = "Monday";
        break;
      case 2:
        dayName = "Tuesday";
        break;
      case 3:
        dayName = "Wednesday";
        break;
      case 4:
        dayName = "Thursday";
        break;
      case 5:
        dayName = "Friday";
        break;
      case 6:
        dayName = "Saturday";
        break;
      default:
        dayName = "";
    }

    return dayName;
  }

  function formatHour(timeString: string) {
    const date = new Date(timeString);
    const hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12
    return `${formattedHours}${ampm}`;
  }

  const getTimeWithOffset = () => {
    //const offset = weatherDaily ? weatherDaily.city.timezone : 0;
    const offset = weather ? weather.timezone : 0;
    const localTime =
      currentTime.getTime() + currentTime.getTimezoneOffset() * 60 * 1000;
    return new Date(localTime + offset * 1000);
  };
  const items = [
    {
      header: "Wind",
      description: "Today wind speed",
      measurement: weather?.wind?.speed ?? 0,
      suffix: "km/h",
    },
    {
      header: "Rain Chance",
      description: "Today rain chance",
      measurement: weather?.main?.humidity ?? 0,
      suffix: "%",
    },
    {
      header: "Pressure",
      description: "Today Pressure",
      measurement: weather?.main?.pressure ?? 0,
      suffix: "hpa",
    },
    {
      header: "UV Index",
      description: "Today UV Index",
      measurement: 2,
      suffix: "",
    },
  ];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  //let celsius = weather.main.temp.toFixed(1);
  let convertToFahrenheit = (celsius: number) => {
    let scale = celsius * 1.8;
    let fahrenheit = scale + 32;
    return parseFloat(fahrenheit.toFixed(1));
  };

  if (dayIsLoading && dailyIsLoading) {
    return (
      <div className="m-auto h-[500px] w-full content-center">
        <div className="m-auto h-[50px] w-[15px] content-center">
          <LoadingSpinner />
        </div>
        <p className="text-center font-nunito text-lg">
          Loading please wait...
        </p>
      </div>
    );
  }

  if (dayError && dailyError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{getErrorMessage(dailyError)}</AlertDescription>
      </Alert>
    );
  }

  if (!weather) return null;
  return (
    <div className="rounded-xl bg-white p-10 lg:overflow-x-hidden">
      <div className="flex w-full justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl font-bold ">Change Location</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="hidden"></DialogTitle>
            <DialogHeader>Change Location</DialogHeader>
            <Separator />
            <div className="h-auto">
              <form
                onSubmit={handleSubmit}
                className="flex h-full content-center gap-2"
              >
                <label className="flex items-center" htmlFor="input">
                  City:
                </label>
                {/*  <Select onValueChange={(value) => handleChangeCity(value)}>
                  <SelectTrigger variant="outline">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.US.map((state) => (
                      <SelectItem key={state.value} value={state.label}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>*/}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="flex w-full justify-start text-left"
                    >
                      {selectedCity || "Select a city"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="custom-scrollbar h-[300px] w-[350px] overflow-y-scroll">
                    {states.US.map((state) => (
                      <DropdownMenuSub key={state.value}>
                        <DropdownMenuSubTrigger>
                          <span>{state.label}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent className="max-h-100 w-[300px] overflow-y-auto">
                            {cities.US[
                              state.value as keyof typeof cities.US
                            ].map((city: string) => (
                              <DropdownMenuItem
                                key={city}
                                onClick={() => handleCitySelect(city)}
                                className="cursor-pointer p-2 hover:bg-gray-200 "
                              >
                                {city}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex justify-end">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-14 xl:flex ">
        <div className="w-full">
          <div className="relative min-h-[380px] w-full min-w-[464px] overflow-clip rounded-lg bg-gradient-to-b from-primary/70 to-primary p-9">
            <div className="grid h-full w-full gap-4 2xl:grid-cols-2">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      alt="location"
                      className="h-[22.07px] w-[18.76px]"
                      src="/assets/icons/weather-forecast/icon-location.svg"
                    />
                    <div className="h-[30.89px] w-[87.17px] font-nunito text-lg font-semibold leading-7 text-white">
                      {city}
                    </div>
                  </div>
                  <div className="text-right font-montserrat text-sm font-normal leading-tight text-white">
                    Today {getTimeWithOffset().toLocaleString()}
                  </div>
                </div>
                <div className="relative flex h-[178.74px] flex-col">
                  <div className="flex justify-center">
                    <div className="text-center font-nunito text-[100px] font-normal leading-[140px] text-white">
                      {weather && weather.main
                        ? convertToFahrenheit(weather.main.temp)
                        : "N/A"}
                    </div>
                    <div className="text-center font-nunito text-5xl font-normal leading-[67.20px] text-white">
                      °F
                    </div>
                  </div>
                  <div className="text-center font-nunito text-base font-medium leading-snug text-white">
                    {weather?.weather?.[0]?.description ?? "N/A"}
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="flex items-center gap-2">
                    <img
                      alt="pressure"
                      src="/assets/icons/weather-forecast/icon-pressure.svg"
                      className="relative h-5 w-5"
                    />
                    <div className="font-nunito text-sm font-semibold leading-tight text-white">
                      {weather?.main?.pressure ?? "N/A"} hpa
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      alt="pressure"
                      src="/assets/icons/weather-forecast/icon-raindrop.svg"
                      className="relative h-5 w-5"
                    />
                    <div className="font-nunito text-sm font-semibold leading-tight text-white">
                      {weather?.main?.pressure ?? "N/A"} %
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      alt="speed"
                      src="/assets/icons/weather-forecast/icon-weather-wind-breeze.svg"
                      className="relative h-5 w-5"
                    />
                    <div className="font-nunito text-sm font-semibold leading-tight text-white">
                      {weather?.wind?.speed ?? "N/A"} km/h
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full w-full overflow-clip rounded-lg bg-white/30 p-6 ">
                <div className="font-nunito text-lg leading-7 text-white">
                  Temperature
                </div>
                <div className="m-auto size-full w-full md:h-[200px] lg:h-full">
                  <TemperatureChart />
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-7 w-full gap-8 sm:grid lg:grid-cols-2">
            {items?.map((item, index) => (
              <WeatherItem
                key={index}
                header={item.header ?? "No Header"}
                description={item.description ?? "No Description"}
                measurement={item.measurement ?? "N/A"}
                suffix={item.suffix ?? ""}
              />
            )) || <p>No weather data available</p>}
          </div>
        </div>
        <div className="border-gray-[#E1E7EB] max-w-[412px] border-l-2  px-12 sm:m-auto  sm:mt-16 lg:mt-10  xl:ml-14">
          <div className="flex justify-between">
            <img
              alt="arrow-right"
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
              {/* <div className="relative h-[110px] w-[77px] font-nunito">
                <div className="absolute left-0 top-0 h-[110px] w-[77px] rounded-xl bg-slate-700" />
                <div className="absolute left-[27px] top-[77px] text-center text-base font-semibold leading-snug text-white">
                  12°
                </div>
                <div className="absolute left-[26px] top-[12px] text-center text-xs font-normal leading-none text-white opacity-90">
                  Now
                </div>
                <div className="absolute left-[23px] top-[37px] h-8 w-8 rounded-[100px] bg-white" />
              </div>*/}

              {weatherDaily?.list.map((day, index) => {
                // Check if index is less than 4
                if (index < 4) {
                  return (
                    <div
                      className="relative h-[110px] w-[77px] font-nunito"
                      key={index}
                    >
                      <div
                        className={`absolute left-0 top-0 h-[110px] w-[77px] rounded-xl  ${index === 0 ? "bg-slate-700" : ""} `}
                      />
                      <div
                        className={`absolute left-[27px] top-[77px] text-center text-base font-semibold leading-snug text-gray-800 ${index === 0 ? "text-white" : "text-gray-800"}`}
                      >
                        {Math.floor(convertToFahrenheit(day.main.temp))}°F
                      </div>
                      <div
                        className={`absolute left-[26px] top-[12px] text-center text-xs font-normal leading-none ${index === 0 ? "text-white" : "text-gray-800"} opacity-90`}
                      >
                        {formatHour(day.dt_txt)}
                      </div>
                      {/*<div className="absolute left-[23px] top-[37px] h-8 w-8 rounded-[100px] bg-yellow-400" />*/}
                      <WeatherIcon
                        weather={day.weather[0].main}
                        className="absolute left-[23px] top-[37px] h-8 w-8 rounded-[100px]"
                      />
                    </div>
                  );
                }
              })}

              {/*              {Array.from({ length: 3 }).map((_item, index) => (
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
              ))}*/}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-7 font-nunito">
            {/*            {Array.from({ length: 7 }).map((_item, index) => (
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
            ))}*/}

            {weatherDaily?.list.map((day, index) => {
              if (index % 8 === 0) {
                console.log(day.main.temp, day.dt_txt);
                return (
                  <div className="relative h-[52px] w-72" key={index}>
                    <div className="font-['Plus Jakarta Sans'] absolute left-[144px] top-[12px] text-xl font-semibold leading-7 text-gray-800">
                      {convertToFahrenheit(day.main.temp)}°F
                    </div>
                    <div className="absolute left-0 top-0 h-[52px] w-[87px]">
                      <div className="font-['Plus Jakarta Sans'] absolute left-0 top-0 text-base font-normal leading-snug text-gray-800">
                        {getDayOfWeek(day.dt_txt)}
                      </div>
                      <div className="font-['Plus Jakarta Sans'] absolute left-0 top-[30px] text-base font-normal leading-snug text-neutral-400">
                        {formatDate(day.dt_txt)}
                      </div>
                    </div>
                    {/*<div className="absolute left-[240px] top-[2px] h-12 w-12 rounded-[100px] bg-yellow-400" />*/}

                    <WeatherIcon
                      weather={day.weather[0].main}
                      className="absolute left-[240px] top-[2px] h-12 w-12 rounded-[100px]"
                    />
                  </div>
                );
              }
            }) || <p>No Weather Available</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
