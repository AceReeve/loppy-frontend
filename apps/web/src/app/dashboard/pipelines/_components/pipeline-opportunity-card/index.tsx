// TODO: Set proper typings
/* eslint-disable -- disregard errors, will improve later */

export default function OpportunityCard({ lead }: any) {
  return (
    <div className="h-[90px] min-h-[70px] w-full min-w-[280px] rounded-2xl bg-white px-3 py-2 shadow-xl drop-shadow-md">
      <div className="flex h-auto justify-between">
        <div className="  font-roboto content-center font-medium">
          {lead.name}
        </div>
        <div className="font-roboto rounded-md bg-blue-500 px-2 py-1 text-[10px] font-medium text-white">
          {lead.category}
        </div>
      </div>
      <h1 className="font-roboto content-center text-[12px] font-medium text-gray-500 ">
        {lead.description}
      </h1>
      <div className="my-1 border-b-2" />

      <div className="flex h-auto justify-between py-1">
        <div className="flex gap-1">
          <div className="h-5 w-5 rounded-full bg-gray-950" />
          <div className="font-roboto content-center text-[14px] font-medium">
            ${lead.amount}
          </div>
        </div>
        <div className="font-robotorounded-md text-[12px] font-medium text-orange-600">
          Submitted {lead.timeframe} Days Ago
        </div>
      </div>
      <div />
    </div>
  );
}
