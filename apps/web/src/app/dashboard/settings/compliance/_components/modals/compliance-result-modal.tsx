import { type CustomerProfileEvaluationResponse } from "@repo/redux-utils/src/endpoints/types/compliance-evaluation";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { Dialog, DialogContent } from "@repo/ui/components/ui";

export function ComplianceResultModal({
  results,
}: {
  results: CustomerProfileEvaluationResponse["results"];
}) {
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <div className="space-y-6">
          {results.map((result) => (
            <div
              key={result.requirement_name}
              className="rounded-md border p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {result.friendly_name}
                </h2>
                {result.passed ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-red-500" />
                )}
              </div>
              {!result.passed && (
                <>
                  <p className="mt-2 text-red-500">{result.failure_reason}</p>
                  {result.invalid.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {result.invalid.map((invalidField) => (
                        <li
                          key={invalidField.friendly_name}
                          className="flex items-start space-x-2"
                        >
                          <XCircleIcon className="h-5 w-5 text-red-400" />
                          <div>
                            <span className="font-semibold">
                              {invalidField.friendly_name}
                            </span>
                            : {invalidField.failure_reason}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
