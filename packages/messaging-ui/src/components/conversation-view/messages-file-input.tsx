import { Input } from "@repo/ui/components/ui";
import { type ChangeEvent } from "react";
import { MAX_FILE_SIZE } from "../../constants.ts";

interface MessagesFileInputProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

export function MessagesFileInput({ files, setFiles }: MessagesFileInputProps) {
  const onFilesChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { files: assets } = event.target;
    if (!assets?.length) {
      return;
    }

    const validFiles = Array.from(assets).filter(
      ({ size }) => size < MAX_FILE_SIZE + 1,
    );

    if (validFiles.length < assets.length) {
      // TODO: show error when file size exceeds
      return;
    }

    setFiles([...files, ...validFiles]);
  };

  return (
    <>
      <label className="cursor-pointer" htmlFor="file-input">
        {" "}
        <img
          alt=""
          className="relative h-[26px] w-[26px]"
          src="/assets/icons/messaging/image.svg"
        />
      </label>
      <Input
        className="hidden"
        id="file-input"
        type="file"
        onChange={onFilesChange}
        multiple
      />
    </>
  );
}
