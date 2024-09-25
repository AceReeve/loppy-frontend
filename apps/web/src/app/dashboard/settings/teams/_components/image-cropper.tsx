import { Button, Input } from "@repo/ui/components/ui";
import {
  useState,
  useCallback,
  type ChangeEvent,
  useEffect,
  useRef,
} from "react";
import Cropper, { type Area } from "react-easy-crop";

interface ImageCropperProps {
  onImageCropped: (image: Blob) => void;
}

export default function ImageCropper({ onImageCropped }: ImageCropperProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (croppedAreaPixels) {
      void handleCrop();
    }
  }, [croppedAreaPixels]);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPix: Area) => {
      setCroppedAreaPixels(croppedAreaPix);
    },
    [],
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZoom(1);
    setCrop({ x: 0, y: 0 });

    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => {
        resolve(image);
      };
      image.src = url;
    });

  const getCroppedImg = async (
    imageSource: string,
    pixelCrop: Area,
  ): Promise<Blob | null> => {
    const image = await createImage(imageSource);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create Blob"));
        }
      }, "image/jpeg");
    });
  };

  const handleCrop = async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedImageBlob) {
        onImageCropped(croppedImageBlob);
      }
    }
  };

  const handleButtonClick = () => {
    inputFileRef.current?.click();
  };

  return (
    <div className="h-full w-full space-y-4">
      <Input
        type="file"
        className="hidden"
        accept="image/jpeg"
        ref={inputFileRef}
        onChange={handleFileChange}
      />

      {imageSrc ? (
        <>
          <div className="relative aspect-[1/1] w-full">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <Input
            type="range"
            value={zoom}
            min="1"
            max="3"
            step="0.1"
            onChange={(e) => {
              setZoom(Number(e.target.value));
            }}
          />
        </>
      ) : null}

      <div className="flex justify-center">
        <Button type="button" variant="outline" onClick={handleButtonClick}>
          Choose Image
        </Button>
      </div>
    </div>
  );
}
