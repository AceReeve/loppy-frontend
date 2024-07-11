interface ProcessProps {
  id: number;
  name: string;
  state: "current" | "done" | "disabled";
}
export default function BrandingSteps(prop: ProcessProps) {
  let bgColor, textColor, bgColorInner;

  switch (prop.state) {
    case "current":
      bgColor = "bg-orange-500";
      textColor = "text-white";
      bgColorInner = "bg-orange-700";
      break;
    case "done":
      bgColor = "bg-white-500";
      textColor = "text-orange-500";
      bgColorInner = "bg-orange-500";
      break;
    case "disabled":
      bgColor = "bg-gray-100";
      textColor = "text-gray-500";
      bgColorInner = "bg-gray-500";
      break;
    default:
      bgColor = "bg-orange-500";
      textColor = "text-white";
      bgColorInner = "bg-orange-700";
  }

  return (
    <div
      className={`${bgColor} ${textColor} flex h-[35px] w-auto items-center rounded-full p-2 font-semibold shadow-lg`}
    >
      <div
        className={`${bgColorInner} flex h-[25px] w-[25px] justify-center rounded-full text-white`}
      >
        {prop.state !== "done" ? (
          prop.id.toString()
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            className="m-auto flex size-4 flex-col items-center"
          >
            <path
              d="M1.80005 8.05L5.91433 12.25L16.2 1.75"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </div>
      <h1 className="text-md px-2 lg:text-sm">{prop.name}</h1>
    </div>
  );
}
