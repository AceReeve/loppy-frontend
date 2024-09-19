import { cn } from "../lib/utils.ts";
import { LoadingSpinner } from "./loading-spinner";

function LoadingOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex size-full items-center justify-center bg-black/30",
        className,
      )}
    >
      <LoadingSpinner />
    </div>
  );
}

export { LoadingOverlay };
