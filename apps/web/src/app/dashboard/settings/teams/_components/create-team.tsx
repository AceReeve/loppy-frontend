"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
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
  Separator,
  Textarea,
  toast,
} from "@repo/ui/components/ui";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateTeamMutation } from "@repo/redux-utils/src/endpoints/manage-team";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { type CreateTeamResponse } from "@repo/redux-utils/src/endpoints/types/manage-team";

interface Team {
  _id: string;
  team: string;
  description: string;
  // eslint-disable-next-line -- team members type is still unknown
  team_members: any[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

const CreateTeamSchema = z.object({
  team: z.string().min(1, {
    message: "Team Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export default function CreateTeam({
  onAddTeam,
}: {
  onAddTeam: (team: Team) => void;
}) {
  const form = useForm<z.infer<typeof CreateTeamSchema>>({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: {
      team: "",
      description: "",
    },
  });

  const [sendRequest, { isLoading }] = useCreateTeamMutation();

  function onSubmit(data: z.infer<typeof CreateTeamSchema>) {
    const newData = {
      ...data,
      team_member: [],
    };

    sendRequest(newData)
      .unwrap()
      .then((res: CreateTeamResponse) => {
        toast({
          description: "Team created successfully",
        });

        onAddTeam(res);
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Team</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] font-poppins">
        <DialogHeader>
          <DialogTitle>Create Team</DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Separator />
            <div className="flex gap-6 px-8 py-4">
              <div className="flex w-[200px] flex-col justify-between space-y-6">
                <div className=" flex h-[200px] w-[200px] flex-col content-center rounded-full bg-slate-200 shadow-lg">
                  <Image
                    src="/assets/images/logo.png"
                    alt=""
                    width={138}
                    height={141}
                    className="m-auto size-[150px] w-[150px] object-contain transition-all duration-500"
                  />
                </div>
                <div>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full rounded-none"
                  >
                    Upload Image
                  </Button>
                  <p className=" text-center text-[12px] italic text-slate-300">
                    We recommend an image of at least 512x512 resolution.
                  </p>
                </div>
              </div>

              <div className="m-auto w-full space-y-4 font-poppins">
                <FormField
                  control={form.control}
                  name="team"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TEAM NAME</FormLabel>
                      <FormControl>
                        <Input
                          className="w-[300px] bg-slate-100 text-sm"
                          placeholder="MARKETING"
                          {...field}
                        />
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
                      <FormLabel>DESCRIPTION</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac
      consequat arcu. Maecenas sagittis odio at diam varius commodo.
      Vestibulum viverra ante eu diam imperdiet dignissim."
                          className="h-[140px] resize-none bg-slate-100 font-light leading-7"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Separator />
            <div className="mt-4 flex items-end justify-end">
              <Button className="text-md px-10" disabled={isLoading}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
