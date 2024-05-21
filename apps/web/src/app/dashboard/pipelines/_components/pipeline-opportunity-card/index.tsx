export default function OpportunityCard({ lead }: any) {
  return (
    <div className="min-h-[70px] h-[90px] min-w-[280px] w-full bg-white rounded-2xl px-3 py-2 drop-shadow-md shadow-xl">
      <div className="flex h-auto justify-between">
        <div className="  content-center font-medium font-roboto">
          {lead.name}
        </div>
        <div className="text-[10px] font-medium font-roboto bg-blue-500 text-white py-1 px-2 rounded-md">
          {lead.category}
        </div>
      </div>
      <h1 className="text-[12px] content-center font-medium font-roboto text-gray-500 ">
        {lead.description}
      </h1>
      <div className="border-b-2 my-1"></div>

      <div className="flex h-auto justify-between py-1">
        <div className="flex gap-1">
          <div className="rounded-full bg-gray-950 h-5 w-5"></div>
          <div className="text-[14px] content-center font-medium font-roboto">
            ${lead.amount}
          </div>
        </div>
        <div className="text-orange-600 text-[12px] font-medium font-robotorounded-md">
          Submitted {lead.timeframe} Days Ago
        </div>
      </div>
      <div></div>
    </div>
  );
}
