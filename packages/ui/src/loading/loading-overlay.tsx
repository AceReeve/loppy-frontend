import LoadingSpinner from "@repo/ui/loading-spinner.tsx";

export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex size-full items-center justify-center bg-black/30">
      <LoadingSpinner />
    </div>
  );
}
