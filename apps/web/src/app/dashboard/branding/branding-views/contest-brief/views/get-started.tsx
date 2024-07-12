import { Button } from "@repo/ui/components/ui";
import { ArrowRight } from "lucide-react";

interface GetStartedProps {
  handleNextView: () => void;
}
export default function GetStarted({ handleNextView }: GetStartedProps) {
  return (
    <div className="mx-auto mt-[40px] w-[780px] space-y-[40px] ">
      <div className="space -y-4 m-auto min-h-[400px] w-[780px] rounded-xl bg-white p-10 shadow-lg">
        <h1 className="font-poppins text-[30px] font-bold">
          Great! Let’s Setup Your Contest Brief
        </h1>
        <div className="flex flex-col justify-between space-y-4 font-poppins text-[18px] text-gray-500">
          <p>
            Step 1: We will gather some information about your business or brand
            (⏰ 2-3 Minutes)
          </p>
          <p>
            Step 2: Our AI technology will then generate a comprehensive contest
            brief (⏰ less than a minute)
          </p>
          <p>
            Step 3: Make any adjustments to the brief and launch the contest.
            Start receiving name ideas from our creative community immediately
          </p>
          <p>
            Ready to begin? Answer a few quick questions on the next page to get
            started.
          </p>
        </div>
      </div>
      <Button onClick={handleNextView} className="w-full p-6 text-[30px]">
        {" "}
        Get Started <ArrowRight />
      </Button>
    </div>
  );
}
