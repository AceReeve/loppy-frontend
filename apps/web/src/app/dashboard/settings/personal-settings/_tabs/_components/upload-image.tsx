import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import {
  useGetUserProfileQuery,
  useUploadProfileMutation,
} from "@repo/redux-utils/src/endpoints/user";
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
import ImageCropper from "./image-cropper";

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
  const { refetch: refetchUserProfile } = useGetUserProfileQuery(undefined);

  // set profile image
  const handleSetProfileSrc = (src: string) => {
    props.handleSetProfileSrc(src);
  };

  const [sendRequest, { isLoading }] = useUploadProfileMutation();

  const [avatar, setAvatar] = useState<Blob | null>(null);
  const handleImageCropped = (croppedImage: Blob) => {
    setAvatar(croppedImage);
  };

  const handleUpload = async () => {
    if (!avatar) return;

    const formData = new FormData();
    formData.append("image_1", avatar, "avatar.jpg");

    if (!props.userId) {
      toast({
        description: "Update your profile first",
      });
      return;
    }

    await sendRequest({ userId: props.userId, payload: formData })
      .unwrap()
      .then((res: unknown) => {
        const response = res as ProfileResponse;
        toast({
          description: "Profile picture updated successfully",
        });
        handleSetProfileSrc(response.profile.image_1.path);
        void refetchUserProfile();
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
