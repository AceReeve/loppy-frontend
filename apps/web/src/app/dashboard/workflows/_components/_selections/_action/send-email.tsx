import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Textarea,
} from "@repo/ui/components/ui";
import React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateEmailActionSchema } from "@/src/schemas";

interface SendEmailProps {
  onHandleClick: (node: Node) => void;
  onAddNodes: () => void;
}

export default function SendEmail(prop: SendEmailProps) {
  const formSchema = CreateEmailActionSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const emailNode = {
    id: "1",
    type: "actionNode",
    data: {
      title: "Send Email",
      content: form.getValues("message"),
    },
    position: { x: 0, y: 0 },
  };

  const onSubmit = () => {
    prop.onHandleClick(emailNode);
    prop.onAddNodes();
  };

  return (
    <div className="space-y-2 p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel className="my-2">Email Content</FormLabel>
                  <FormControl>
                    <Textarea
                      className="mt-2 h-[140px] resize-none bg-slate-100/50 font-light leading-7"
                      placeholder="Write your message here..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <div className="mt-5 flex justify-end ">
            <Button type="submit" className="rounded">
              Add Action
            </Button>
          </div>
        </form>
      </Form>

      {/*      <div className="flex justify-end ">
        <Button onClick={handleAddActionNode} className="rounded">
          Add Action
        </Button>
      </div>*/}
    </div>
  );
}
