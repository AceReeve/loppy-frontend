import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Separator,
  Textarea,
} from "@repo/ui/components/ui";
import React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IActionNode } from "@repo/redux-utils/src/endpoints/types/nodes";
import { CreateEmailActionSchema } from "@/src/schemas";
import type { CustomTriggerProps } from "@/src/app/dashboard/workflows/_components/_custom-nodes/trigger-node.tsx";

export default function SendEmail(prop: CustomTriggerProps) {
  const formSchema = CreateEmailActionSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: prop.node
      ? {
          title: prop.node.data.title,
          subject: prop.node.data.content.subject,
          message: prop.node.data.content.message,
        }
      : {
          title: "",
          subject: "",
          message: "",
        },
  });
  const {
    formState: { errors },
  } = form;

  const emailNode = {
    id: prop.node ? prop.node.id : "1",
    type: "actionNode",
    data: {
      title: form.getValues("title"),
      node_name: "Send Email",
      node_type_id: "Send Email",
      content: {
        message: form.getValues("message"),
        subject: form.getValues("subject"),
      },
    },
  };
  const onSubmit = () => {
    const isEditMode = Boolean(prop.node);
    prop.onHandleClick(emailNode as IActionNode, isEditMode);
  };

  return (
    <div className="space-y-4 rounded ">
      <div className="flex flex-col justify-start">
        <p>Send Email Action</p>
        <p className="content-center font-nunito text-sm text-gray-500">
          Sets a Workflow that adds the contact upon execution.
        </p>
      </div>
      <Separator className="my-5" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Action Name</FormLabel>
                  <FormControl>
                    <Input
                      className="resize-none bg-slate-100/50 font-light leading-7"
                      placeholder="Enter action name"
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
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      className="resize-none bg-slate-100/50 font-light leading-7"
                      placeholder="Subject"
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
          />{" "}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Email Content</FormLabel>
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
          <Separator />
          <div
            className={`mt-5 flex ${!prop.node ? "justify-end" : "justify-between"} `}
          >
            <Button
              onClick={() => {
                if (prop.node && prop.onHandleDelete) {
                  prop.onHandleDelete(prop.node);
                }
              }}
              variant="destructive"
              className={` rounded px-4 ${prop.node ? "" : "hidden"}`}
            >
              Delete
            </Button>
            <Button type="submit" className="rounded px-4">
              {prop.node ? "Update Trigger" : "Add Trigger"}
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
