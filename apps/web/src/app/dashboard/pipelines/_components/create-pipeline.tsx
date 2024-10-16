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
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "@repo/ui/components/ui";
import React from "react";
import { useCreatePipelineMutation } from "@repo/redux-utils/src/endpoints/pipelines";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";

// schemas
const FormSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
});

export default function CreatePipeline() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  const [sendRequest, { isLoading }] = useCreatePipelineMutation();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await sendRequest(data)
      .unwrap()
      .then(() => {
        toast({
          description: "Pipeline created successfully",
        });
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Pipeline</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create Pipeline</DialogTitle>
              <DialogDescription />
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
