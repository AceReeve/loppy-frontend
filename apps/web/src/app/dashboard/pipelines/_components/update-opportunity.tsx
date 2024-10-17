import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  toast,
} from "@repo/ui/components/ui";
import { useUpdateOpportunityMutation } from "@repo/redux-utils/src/endpoints/pipelines";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { type UniqueIdentifier } from "@dnd-kit/core";
import { Pipette } from "lucide-react";
import { CirclePicker, type ColorResult } from "react-color";
import { type Opportunity } from "../page";

interface UpdateOpportunityType {
  opportunity: Opportunity | null;
  onUpdateOpportunity: (
    opportunityId: UniqueIdentifier,
    data: Opportunity,
  ) => void;
  isOpen: boolean;
  onClose: () => void;
}

// schemas
const FormSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  color: z.string().min(1, { message: "Required" }),
});

export default function UpdateOpportunity({
  opportunity,
  onUpdateOpportunity,
  isOpen,
  onClose,
}: UpdateOpportunityType) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: opportunity?.title ?? "",
      color: opportunity?.color ?? "",
    },
  });

  const [sendRequest, { isLoading }] = useUpdateOpportunityMutation();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const newData = {
      ...data,
      lead_value: 0,
      _id: opportunity?._id ?? "",
    };

    await sendRequest(newData)
      .unwrap()
      .then((res: unknown) => {
        const response = structuredClone(res) as Opportunity;
        response.id = `item-${response._id ?? "unknown"}`;
        toast({
          description: "Stage updated successfully",
        });
        onUpdateOpportunity(opportunity?.id ?? "", response);
        onClose();
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update Stage</DialogTitle>
              <DialogDescription className="hidden" />
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stage Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stage Color</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          style={{
                            backgroundColor: field.value,
                          }}
                          readOnly
                          {...field}
                        />
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              className={`bg-${field.value}`}
                              variant="outline"
                              size="icon"
                            >
                              <Pipette />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <CirclePicker
                              onChangeComplete={(color: ColorResult) => {
                                field.onChange(color.hex);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
