import OpportunityHeader from "@/src/app/dashboard/pipelines/_components/pipeline-opportunity-header";
import OpportunityCard from "@/src/app/dashboard/pipelines/_components/pipeline-opportunity-card";
import LeadButton from "@/src/app/dashboard/pipelines/_components/pipeline-add-button";
export default function Opportunity({ opportunity }: any) {
  return (
    <div className="inline space-y-5 h-auto min-w-[280px] w-auto">
      <OpportunityHeader opportunity={opportunity} />
      {opportunity.leads.length > 0 ? (
        opportunity.leads.map((lead: any) => (
          <OpportunityCard key={opportunity.id} lead={lead}></OpportunityCard>
        ))
      ) : (
        <p>No Info Yet</p>
      )}
      <LeadButton />
    </div>
  );
}
