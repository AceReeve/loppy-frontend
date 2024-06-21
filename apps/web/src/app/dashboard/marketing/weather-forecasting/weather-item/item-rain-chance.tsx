import RingProgress from "@/src/components/progress/ring-progress";
type MeasurementProps = {
  measurement: number;
};
export default function RainChance(measurement: MeasurementProps) {
  return (
    <div className={"h-auto w-auto select-none"}>
      <div className="absolute font-roboto font-bold text-center h-[110px] w-[110px]">
        <div className=" content-center h-full w-full text-center">Low</div>
      </div>
      <RingProgress
        value={measurement.measurement}
        label={false}
        size={110}
        strokeWidth={8}
        className={"h-full w-full"}
        colorBg={["#C4E2FF"]}
        colorProgress={["#24609B"]}
      />
    </div>
  );
}
