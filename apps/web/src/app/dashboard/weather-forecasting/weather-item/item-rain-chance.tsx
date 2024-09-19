import RingProgress from "@/src/components/progress/ring-progress";

interface MeasurementProps {
  measurement: number;
}
export default function RainChance(measurement: MeasurementProps) {
  return (
    <div className="h-auto w-auto select-none">
      <div className="absolute h-[110px] w-[110px] text-center font-roboto font-bold">
        <div className="text-cemter relative flex h-full items-center  justify-center ">
          Low
        </div>
      </div>
      <RingProgress
        value={measurement.measurement}
        label={false}
        size={110}
        strokeWidth={8}
        className="h-full w-full"
        colorBg={["#C4E2FF"]}
        colorProgress={["#24609B"]}
      />
    </div>
  );
}
