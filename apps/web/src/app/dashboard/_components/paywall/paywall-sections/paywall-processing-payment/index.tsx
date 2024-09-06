import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";

export default function PaywallProcessingPayment() {
  return (
    <Alert className="w-full max-w-96">
      <LoadingSpinner />
      <AlertTitle>Processing Payment</AlertTitle>
      <AlertDescription>
        Almost there, we&apos;re finalizing your payment. <br />
        This might take some time.
      </AlertDescription>
    </Alert>
  );
}
