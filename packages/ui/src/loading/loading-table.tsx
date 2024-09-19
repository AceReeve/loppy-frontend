import React from "react";
import { LoadingSpinner } from "./loading-spinner.tsx";

function LoadingTable({ loading }: { loading: boolean }) {
  return loading ? (
    <div className="m-auto h-[500px] w-full content-center">
      <div className="m-auto h-[50px] w-[15px] content-center">
        <LoadingSpinner />
      </div>
      <p className="text-center font-nunito text-lg">Loading please wait...</p>
    </div>
  ) : null;
}

export { LoadingTable };
