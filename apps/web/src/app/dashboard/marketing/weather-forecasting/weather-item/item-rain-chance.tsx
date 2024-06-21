import RingProgress from "@/src/components/progress/ring-progress";

interface MeasurementProps {
  measurement: number;
}
export default function RainChance(measurement: MeasurementProps) {
  return (
    <div className="h-auto w-auto select-none">
      <div className="font-roboto absolute h-[110px] w-[110px] text-center font-bold">
        <div className=" h-full w-full content-center text-center">Low</div>
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
