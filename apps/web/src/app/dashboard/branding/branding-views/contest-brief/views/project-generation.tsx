import React from "react";
import { Button } from "@repo/ui/components/ui";

interface ProjectProps {
  handleNext: () => void;
  handlePrev: () => void;
}
export default function ProjectGeneration(props: ProjectProps) {
  return (
    <div className="mt-16 ">
      <div className="m-auto w-[700px] text-center font-open-sans">
        <h1 className="text-[30px] font-bold">Your Contest Brief</h1>
        <p className="font-open-sans text-[18px] text-gray-400">
          We have trained our AI branding tool to create effective, customized
          project briefs based on our experience working on 40K+ successful
          branding projects.
        </p>
      </div>
      <div className="m-auto flex max-w-[970px] flex-col gap-5 p-10 text-left ">
        <div>
          <h1 className=" text-[14px] font-bold">
            Please Review your AI generated contest brief.
          </h1>
          <p className="font-open-sans text-[12px] text-gray-400">
            Feel free to update this brief or click next below to launch your
            naming contest.
          </p>
        </div>
        <div className="m-auto flex max-w-[970px] flex-col gap-5 rounded-xl bg-gray-100 bg-white p-10 text-left shadow-lg">
          <div>
            <h1 className=" text-[14px] font-bold">
              We need a name for a cutting-edge Agency & Consulting business
            </h1>
            <p className="font-open-sans text-[14px] text-gray-400">
              We need a name for a forward-thinking Agency & Consulting brand
              that provides innovative solutions and unparalleled expertise to
              clients setting a new standard in the industry and attracting
              investors looking for the next big thing.
            </p>
          </div>
          <div>
            <h1 className=" text-[14px] font-bold">Missions statement:</h1>
            <p className="font-open-sans text-[14px] text-gray-400">
              Empowering businesses to thrive and succeed by delivering tailored
              strategies and insights that drive growth and innovation.
            </p>
          </div>
          <div>
            <h1 className=" text-[14px] font-bold">Our name should convey:</h1>
            <p className="font-open-sans text-[14px] text-gray-400">
              The name should convey sophistication, expertise, innovation, and
              reliability.
            </p>
          </div>

          <div>
            <h1 className=" text-[14px] font-bold">Target audience summary:</h1>
            <p className="font-open-sans text-[14px] text-gray-400">
              Our customers are forward-thinking businesses seeking strategic
              guidance and cutting-edge solutions to drive their success.
            </p>
          </div>

          <div className=" text-[14px]">
            <h1 className=" font-bold">
              List of our target customer&apos;s dream:
            </h1>
            <li>Achieving exponential growth</li>
            <li>Stating ahead of the competition</li>
            <li>Innovating and disrupting their industry</li>
          </div>

          <div className=" text-[14px]">
            <h1 className=" font-bold">
              List of our target customer psychographics:
            </h1>
            <li>Driven and ambitious personalities</li>
            <li>Lifestyles focused on growth and success</li>
            <li>Interest in technology, innovation, and industry trends</li>
            <li>Opinions that value expertise and strategic thinking</li>
            <li>Attitudes that embrace change and challenges</li>
            <li>
              Beliefs in the power of collaboration and forward-thinking
              strategies
            </li>
          </div>

          <div className=" text-[14px]">
            <h1 className=" font-bold">Top Brand Values:</h1>
            <li>Innovation</li>
            <li>Expertise</li>
            <li>Collaboration</li>
          </div>

          <div className=" text-[14px]">
            <h1 className=" font-bold">Top Emotional benefits of the brand:</h1>
            <p className="font-open-sans text-[14px] text-gray-400">
              Calm, confidence, inspiration, and empowerment
            </p>
          </div>

          <div className=" text-[14px]">
            <h1 className=" font-bold">Brand&apos;s big ideas:</h1>
            <li>Strategic excellence</li>
            <li>Innovation-driven solutions</li>
            <li>Cutting-edge insights</li>
            <li>Empowering success</li>
          </div>

          <div className=" text-[14px]">
            <h1 className=" font-bold">Brand personality:</h1>
            <p className="font-open-sans text-[14px] text-gray-400">
              The brand personality is akin to a trusted advisor, a visionary
              partner, and a game-changing mentor
            </p>
          </div>

          <div className=" mt-10 flex justify-between">
            <Button onClick={props.handlePrev}>Previous</Button>
            <Button onClick={props.handleNext} className="hidden">
              Generate Project Brief
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
