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
import type { CustomNode } from "@repo/redux-utils/src/endpoints/types/workflow";
import { CreateEmailActionSchema } from "@/src/schemas";

interface SendEmailProps {
  onHandleClick: (node: CustomNode) => void;
  onAddNodes: () => void;
  icon?: React.ReactNode;
}

export default function SendEmail(prop: SendEmailProps) {
  const formSchema = CreateEmailActionSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  const {
    formState: { errors },
  } = form;

  const emailNode = {
    id: "1",
    type: "actionNode",
    data: {
      title: "Send Email",
      content: form.getValues("message"),
      icon: prop.icon,
    },
    position: { x: 0, y: 0 },
  };

  const onSubmit = () => {
    prop.onHandleClick(emailNode as CustomNode);
    prop.onAddNodes();
  };

  return (
    <div className="space-y-2 rounded border p-4">
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
                  {errors.message ? (
                    <p className="mt-2 text-[0.8rem] font-medium text-error">
                      {errors.message.message}
                    </p>
                  ) : null}
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
