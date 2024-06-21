import OpportunityHeader from "@/src/app/dashboard/pipelines/_components/pipeline-opportunity-header";
import OpportunityCard from "@/src/app/dashboard/pipelines/_components/pipeline-opportunity-card";
import LeadButton from "@/src/app/dashboard/pipelines/_components/pipeline-add-button";

export default function Opportunity({ opportunity }: any) {
  return (
    <div className="inline h-auto w-auto min-w-[280px] space-y-5">
      <OpportunityHeader opportunity={opportunity} />
      {opportunity.leads.length > 0 ? (
        opportunity.leads.map((lead: any) => (
          <OpportunityCard key={opportunity.id} lead={lead} />
        ))
      ) : (
        <p>No Info Yet</p>
      )}
      <LeadButton />
    </div>
  );
}
