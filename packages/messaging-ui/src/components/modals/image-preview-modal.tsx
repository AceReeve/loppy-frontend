import { Button, Dialog, DialogContent } from "@repo/ui/components/ui";
import { DownloadIcon } from "lucide-react";

interface ImagePreviewModalProps {
  image: Blob;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: () => void;
}

export default function ImagePreviewModal({
  image,
  isOpen,
  onOpenChange,
  onDownload,
}: ImagePreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="gap-2 p-2 pt-8">
        <img
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- disregard
          src={(window.URL || window.webkitURL).createObjectURL(image)}
          alt=""
        />
        <div className="flex w-full justify-center">
          <Button variant="ghost" onClick={onDownload} className="gap-2">
            <DownloadIcon size={24} />
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
