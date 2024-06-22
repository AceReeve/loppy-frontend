import { useEffect, useState } from "react";
import type { ReduxMedia } from "@repo/redux-utils/src/types/messaging/messaging";
import { DownloadIcon, FileIcon } from "lucide-react";
import { truncate } from "@repo/hooks-and-utils/string-utils";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";

interface MessageMediaProps {
  onDownload: () => Promise<Error | undefined>;
  onOpen: (mediaSid: string, image?: ReduxMedia, file?: ReduxMedia) => void;
  sending?: boolean;
  images: ReduxMedia[];
  files: ReduxMedia[];
  attachments?: Record<string, Blob>;
}

export default function MessageMedia({
  onDownload,
  onOpen,
  images,
  files,
  sending,
  attachments,
}: MessageMediaProps) {
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  useEffect(() => {
    void onDownload().then(() => {
      setIsMediaLoaded(true);
    });
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="flex flex-col items-start gap-4">
      {images.map((img) => (
        <button
          type="button"
          key={img.sid}
          style={{
            minHeight: "200px",
            minWidth: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            borderRadius: "4px",
          }}
          onClick={() => {
            isMediaLoaded && onOpen(img.sid, img);
          }}
        >
          <div
            style={{
              zIndex: 7,
              position: "absolute",
              cursor: "pointer",
            }}
          >
            {sending ?? !isMediaLoaded ? <LoadingSpinner /> : null}
          </div>
          <img
            style={{
              maxHeight: "300px",
              zIndex: 0,
              maxWidth: "400px",
              width: "100%",
            }}
            src={
              isMediaLoaded && attachments
                ? window.URL.createObjectURL(attachments[img.sid])
                : undefined
            }
            alt=""
          />
        </button>
      ))}

      {files.map((file) => {
        const name = file.filename ?? "";

        const nameSplit = name.split(".");
        const extension = `.${nameSplit.pop() ?? ""}`;
        return (
          <button
            className="relative flex items-center gap-2"
            key={`${file.filename ?? ""}.index`}
            onClick={() => {
              isMediaLoaded && onOpen(file.sid, undefined, file);
            }}
            type="button"
          >
            <FileIcon size={24} />
            <div className="flex flex-col">
              <div className="font-roboto text-sm font-medium">
                {truncate(nameSplit.toString(), 30).trim().concat(extension)}
              </div>
              <div className="font-nunito text-left text-xs font-light">
                {`${(Math.round((file.size / Math.pow(2, 20)) * 100) / 100).toString()} MB`}
              </div>
            </div>
            <div className="p-1 md:flex">
              {!isMediaLoaded || sending ? (
                <LoadingSpinner />
              ) : (
                <DownloadIcon />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
