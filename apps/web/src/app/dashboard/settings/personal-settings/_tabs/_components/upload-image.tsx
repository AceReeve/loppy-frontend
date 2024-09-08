import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useUploadProfileMutation } from "@repo/redux-utils/src/endpoints/user";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  toast,
} from "@repo/ui/components/ui";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import React, { type ChangeEvent, useState } from "react";

interface UploadImageProps {
  handleSetProfileSrc: (src: string) => void;
  userId: string;
}

interface ProfileResponse {
  profile: {
    image_1: {
      path: string;
    };
  };
}

export default function UploadImage(props: UploadImageProps) {
  // State to hold the selected image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // State to hold the file object
  const [file, setFile] = useState<File | null>(null);

  // set profile image
  const handleSetProfileSrc = (src: string) => {
    props.handleSetProfileSrc(src);
  };

  // Handle the image selection
  const handleSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setSelectedImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  const [sendRequest, { isLoading }] = useUploadProfileMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast({
        description: "No file selected",
      });
      return;
    }

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append("image_1", file);

    await sendRequest({ userId: props.userId, payload: formData })
      .unwrap()
      .then((res: unknown) => {
        const response = res as ProfileResponse;
        toast({
          description: "Profile picture updated successfully",
        });
        handleSetProfileSrc(response.profile.image_1.path);
        setSelectedImage(null);
      })
      .catch((err: unknown) => {
        toast({
          description: getErrorMessage(err),
        });
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-none">
          Upload Image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload your profile picture</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <label
              className="h-32 w-32 cursor-pointer rounded-lg border-2 border-dashed border-slate-200 bg-slate-50"
              htmlFor="file-upload"
            >
              <input
                className="hidden"
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleSelectImage}
              />
              {/* Display the selected image if available */}
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-sm text-slate-500">
                    Select an image
                  </span>
                </div>
              )}
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner /> Uploading
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
