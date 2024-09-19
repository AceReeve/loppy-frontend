import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
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
import React, { useState } from "react";
import { useUploadTeamProfileMutation } from "@repo/redux-utils/src/endpoints/manage-team";
import ImageCropper from "./image-cropper";

interface UploadImageProps {
  handleSetProfileSrc: (src: string) => void;
  teamId: string;
}

interface ProfileResponse {
  profile: {
    image_1: {
      path: string;
    };
  };
}

export default function UploadImage(props: UploadImageProps) {
  // set profile image
  const handleSetProfileSrc = (src: string) => {
    props.handleSetProfileSrc(src);
  };

  const [sendRequest, { isLoading }] = useUploadTeamProfileMutation();

  const [avatar, setAvatar] = useState<Blob | null>(null);
  const handleImageCropped = (croppedImage: Blob) => {
    setAvatar(croppedImage);
  };

  const handleUpload = async () => {
    if (!avatar) return;

    const formData = new FormData();
    formData.append("image_1", avatar, "avatar.jpg");

    await sendRequest({ teamId: props.teamId, payload: formData })
      .unwrap()
      .then((res: unknown) => {
        const response = res as ProfileResponse;
        toast({
          description: "Team profile updated successfully",
        });
        handleSetProfileSrc(response.profile.image_1.path);
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
          <DialogTitle>Upload your team profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <ImageCropper onImageCropped={handleImageCropped} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleUpload} disabled={isLoading}>
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
