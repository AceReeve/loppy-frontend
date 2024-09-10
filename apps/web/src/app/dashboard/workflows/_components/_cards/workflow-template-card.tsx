import { Separator } from "@repo/ui/components/ui";
import { Workflow } from "lucide-react";

interface WorkflowTemplateProps {
  title: string;
  description: string;
  onButtonClick: () => void;
}
export default function WorkflowTemplate(prop: WorkflowTemplateProps) {
  return (
    <button
      type="button"
      className="flex w-full flex-row items-center gap-5 rounded border bg-white p-4 font-poppins hover:bg-orange-100/80 "
      onClick={prop.onButtonClick}
    >
      <div>
        <Workflow className="size-10 text-slate-700" />
      </div>
      <div className="w-full">
        <h1 className="text-left font-semibold text-slate-700">{prop.title}</h1>
        <Separator />
        <p className="p-2 text-left text-sm font-normal text-slate-400">
          {prop.description}
        </p>
      </div>
    </button>
  );
}
