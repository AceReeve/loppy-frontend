import { LoadingSpinner } from "./loading-spinner";

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex size-full items-center justify-center bg-black/30">
      <LoadingSpinner />
    </div>
  );
}

export { LoadingOverlay };
