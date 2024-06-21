import PipelineHeader from "@/src/app/dashboard/pipelines/_components/pipeline-header";
import Opportunity from "@/src/app/dashboard/pipelines/_components/pipeline-opportunity";

export default function Page() {
  const opportunities = [
    {
      id: 1,
      header: "Survey Filled Out",
      leads: [
        {
          id: 1,
          name: "Jennifer Abbey",
          description: "HVAC Pricing Survey",
          category: "Facebook Lead",
          user: "",
          amount: "14,995",
          timeframe: "2",
        },
        {
          id: 2,
          name: "Dave Master",
          description: "HVAC Pricing Survey",
          category: "Facebook Master",
          user: "",
          amount: "18,995",
          timeframe: "4",
        },
      ],
    },
    {
      id: 2,
      header: "Customer Responded",
      leads: [
        {
          id: 1,
          name: "Jennifer Abbey",
          description: "HVAC Pricing Survey",
          category: "Facebook Lead",
          user: "",
          amount: "14,995",
          timeframe: "2",
        },
        {
          id: 2,
          name: "Raz Master",
          description: "HVAC Pricing Survey",
          category: "Facebook Admin",
          user: "",
          amount: "98,995",
          timeframe: "7",
        },
        {
          id: 3,
          name: "Jake Master",
          description: "HVAC Pricing Survey",
          category: "Facebook Admin",
          user: "",
          amount: "10,000",
          timeframe: "9",
        },
      ],
    },
    {
      id: 3,
      header: "Follow Up",
      leads: [
        {
          id: 1,
          name: "Jennifer Abbey",
          description: "HVAC Pricing Survey",
          category: "Facebook Lead",
          user: "",
          amount: "14,995",
          timeframe: "2",
        },
        {
          id: 2,
          name: "Raz Master",
          description: "HVAC Pricing Survey",
          category: "Facebook Admin",
          user: "",
          amount: "98,995",
          timeframe: "7",
        },
        {
          id: 3,
          name: "Jake Master",
          description: "HVAC Pricing Survey",
          category: "Facebook Admin",
          user: "",
          amount: "10,000",
          timeframe: "9",
        },
      ],
    },
    {
      id: 4,
      header: "Booked Lead",
      leads: [
        {
          id: 1,
          name: "Jennifer Abbey",
          description: "HVAC Pricing Survey",
          category: "Facebook Lead",
          user: "",
          amount: "14,995",
          timeframe: "2",
        },
        {
          id: 2,
          name: "Raz Master",
          description: "HVAC Pricing Survey",
          category: "Facebook Admin",
          user: "",
          amount: "98,995",
          timeframe: "7",
        },
        {
          id: 3,
          name: "Jake Master",
          description: "HVAC Pricing Survey",
          category: "Facebook Admin",
          user: "",
          amount: "10,000",
          timeframe: "9",
        },
      ],
    },
    {
      id: 5,
      header: "Sold Lead",
      leads: [
        {
          id: 1,
          name: "Jennifer Abbey",
          description: "HVAC Pricing Survey",
          category: "Facebook Lead",
          user: "",
          amount: "14,995",
          timeframe: "2",
        },
        {
          id: 2,
          name: "Raz Master",
          description: "HVAC Pricing Survey",
          category: "Facebook Admin",
          user: "",
          amount: "98,995",
          timeframe: "7",
        },
        {
          id: 3,
          name: "Jake Master",
          description: "HVAC Pricing Survey",
          category: "Facebook Admin",
          user: "",
          amount: "10,000",
          timeframe: "9",
        },
      ],
    },
  ];
  return (
    <div className="h-screen w-auto bg-white p-5 text-black antialiased ">
      <PipelineHeader />
      <div className="flex justify-start gap-10">
        {opportunities.length > 0 ? (
          opportunities.map((opportunity) => (
            <Opportunity
              key={opportunity.id}
              opportunity={opportunity}
             />
          ))
        ) : (
          <p>No Info Yet</p>
        )}
      </div>
    </div>
  );
}
