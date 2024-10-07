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
  toast,
} from "@repo/ui/components/ui";
import { useUpdateOpportunityMutation } from "@repo/redux-utils/src/endpoints/pipelines";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { type UniqueIdentifier } from "@dnd-kit/core";
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
    },
  });

  const [sendRequest, { isLoading }] = useUpdateOpportunityMutation();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const newData = {
      ...data,
      _id: opportunity?._id ?? "",
    };

    await sendRequest(newData)
      .unwrap()
      .then((res: unknown) => {
        const response = structuredClone(res) as Opportunity;
        response.id = `item-${response._id ?? "unknown"}`;
        toast({
          description: "Opportunity updated successfully",
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
              <DialogTitle>Update Opportunity</DialogTitle>
              <DialogDescription className="hidden" />
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
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
