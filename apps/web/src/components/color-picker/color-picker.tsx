import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Button,
} from "@repo/ui/components/ui";
import { cn } from "@repo/ui/utils";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import {
  colorPickerSchema,
  type ColorPickerSchemaFormValues,
} from "@/src/components/color-picker/schemas/color-picker-schemas.ts";
import { accentColors } from "@/src/components/color-picker/constants/color-picker.const.ts";

interface ColorPickerProps {
  onColorSelect: (colorName: string, customColor?: string) => void;
  defaultData?: ColorPickerSchemaFormValues;
  isLoading?: boolean;
}

export default function ColorPicker({
  onColorSelect,
  defaultData,
  isLoading,
}: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [customColor, setCustomColor] = useState<string>("#000000");
  const [isCustomColorModalOpen, setIsCustomColorModalOpen] = useState(false);

  useEffect(() => {
    if (defaultData) {
      setSelectedColor(defaultData.colorName);
      setCustomColor(defaultData.customColor ?? "#000000");
    }
  }, [defaultData]);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
  };

  const handleCustomColorSelect = () => {
    onSubmit("Custom", customColor);
    setIsCustomColorModalOpen(false);
  };

  const onSubmit = (colorName: string, customColorValue?: string) => {
    setSelectedColor(colorName);
    onColorSelect(colorName, customColorValue);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Color Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {accentColors.map((color) => (
            <Button
              variant="ghost"
              key={color.name}
              onClick={() => {
                onSubmit(color.name);
              }}
              className={cn(
                "justify-start gap-2 p-2 text-sm",
                selectedColor === color.name && "bg-gray-200",
              )}
            >
              {isLoading && selectedColor === color.name ? (
                <LoadingSpinner />
              ) : (
                <div className={cn("h-4 w-4 rounded-full", color.class)} />
              )}
              <span>{color.name}</span>
            </Button>
          ))}
          <Dialog
            open={isCustomColorModalOpen}
            onOpenChange={setIsCustomColorModalOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsCustomColorModalOpen(true);
                }}
                className={cn(
                  "justify-start gap-2 p-2 text-sm",
                  selectedColor === "Custom" && "bg-gray-200",
                )}
              >
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: customColor }}
                />
                <span>Custom</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Choose Custom Color</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <Input
                  type="color"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="size-full cursor-pointer border-none p-0"
                />
                <Input
                  type="text"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  placeholder="#000000"
                />
                <Button
                  onClick={handleCustomColorSelect}
                  disabled={
                    colorPickerSchema.safeParse({
                      colorName: "Custom",
                      customColor,
                    }).error !== undefined ||
                    (isLoading && selectedColor === "Custom")
                  }
                >
                  {isLoading && selectedColor === "Custom" ? (
                    <LoadingSpinner />
                  ) : null}
                  Select Custom Color
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
