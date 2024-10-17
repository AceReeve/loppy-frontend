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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from "@repo/ui/components/ui";
import { useUpdateLeadMutation } from "@repo/redux-utils/src/endpoints/pipelines";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { type UniqueIdentifier } from "@dnd-kit/core";
import { type Lead } from "../page";

interface UpdateLeadType {
  lead: Lead | null;
  onUpdateLead: (leadId: UniqueIdentifier, data: Lead) => void;
  isOpen: boolean;
  onClose: () => void;
}

// schemas
const FormSchema = z.object({
  master: z.string().min(1, { message: "Required" }),
  description: z.string().min(1, { message: "Required" }),
  category: z.string().min(1, { message: "Required" }),
  amount: z
    .string()
    .min(1, { message: "Required" })
    .refine((val) => !isNaN(Number(val)), { message: "Must be a number" }),
  status: z.string().min(1, { message: "Required" }),
});

export default function UpdateLead({
  lead,
  onUpdateLead,
  isOpen,
  onClose,
}: UpdateLeadType) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      master: lead?.master ?? "",
      description: lead?.description ?? "",
      category: lead?.category ?? "",
      amount: lead?.amount.toString() ?? "",
      status: lead?.status ?? "",
    },
  });

  const [sendRequest, { isLoading }] = useUpdateLeadMutation();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const newData = {
      ...data,
      amount: Number(data.amount),
    };

    await sendRequest({ leadId: lead?._id ?? "", payload: newData })
      .unwrap()
      .then((res: unknown) => {
        const response = structuredClone(res) as Lead;
        response.id = `item-${response._id ?? "unknown"}`;
        toast({
          description: "Opportunity updated successfully",
        });
        onUpdateLead(lead?.id ?? "", response);
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
                name="master"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Facebook Lead" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger variant="outline">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Stalled">Stalled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
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
