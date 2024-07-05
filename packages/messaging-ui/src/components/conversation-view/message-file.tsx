import type { ReduxMedia } from "@repo/redux-utils/src/types/messaging/messaging";
import { FileIcon } from "lucide-react";
import { truncate } from "@repo/hooks-and-utils/string-utils";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface MessageFileProps {
  media: ReduxMedia | { filename: string; size: number };
  onRemove: () => void;
}
export default function MessageFile(props: MessageFileProps) {
  const { filename, size } = props.media;
  const name = filename ?? "";

  const nameSplit = name.split(".");
  const extension = nameSplit.pop();

  return (
    <div className="relative flex items-center gap-2 rounded-md border border-gray-200 bg-gray-100 p-2">
      <FileIcon size={24} />
      <div className="flex flex-col">
        <div className="font-roboto text-sm font-medium">
          {truncate(nameSplit.toString(), 15).trim().concat(extension)}
        </div>
        <div className="font-nunito text-xs font-light">
          {Math.round((size / Math.pow(2, 20)) * 100) / 100} MB
        </div>
      </div>
      <button
        className="absolute -right-2 -top-2 rounded-full border border-zinc-300 bg-white p-1 hover:bg-gray-200 group-hover:flex md:flex"
        onClick={() => {
          props.onRemove();
        }}
        type="button"
      >
        <XMarkIcon className="relative h-3 w-3" />
      </button>
    </div>
  );
}
