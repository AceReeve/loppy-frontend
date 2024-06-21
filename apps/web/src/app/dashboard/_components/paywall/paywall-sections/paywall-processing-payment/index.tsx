import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";

export default function PaywallProcessingPayment() {
  return (
    <Alert className="min-w-72">
      <LoadingSpinner />
      <AlertTitle>Processing Payment</AlertTitle>
      <AlertDescription>
        Almost there, we&apos;re finalizing your payment.
      </AlertDescription>
    </Alert>
  );
}
