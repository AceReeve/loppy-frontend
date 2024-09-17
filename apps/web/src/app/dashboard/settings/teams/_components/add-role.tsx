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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useAddRoleByTeamIdMutation } from "@repo/redux-utils/src/endpoints/manage-team";
import { AddRoleSchema } from "../schemas/teams-schemas";

interface AddRoleProps {
  teamId: string;
  refetch: () => void;
}

export default function AddRole(props: AddRoleProps) {
  const form = useForm<z.infer<typeof AddRoleSchema>>({
    resolver: zodResolver(AddRoleSchema),
    defaultValues: {
      role: "",
      description: "",
    },
  });

  const [sendRequest, { isLoading }] = useAddRoleByTeamIdMutation();

  function onSubmit(data: z.infer<typeof AddRoleSchema>) {
    const newData = {
      ...data,
      team: props.teamId,
    };

    sendRequest(newData)
      .unwrap()
      .then(() => {
        toast({
          description: "Role created successfully",
        });

        props.refetch();
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
        <Button className="px-5">Add Role</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] font-poppins">
        <DialogHeader>
          <DialogTitle>Create Role</DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ROLE NAME</FormLabel>
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
                      placeholder="Role Description"
                      className="h-[140px] resize-none bg-slate-100 font-light leading-7"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-4" />
            {/* <div className="">
              <p className="text-sm font-light">Role Name</p>
              <input
                className="h-10 w-[250px] text-sm"
                placeholder="Enter a Role"
              />
            </div>
            <div className="p-1">
              <p className="text-sm font-light">Description</p>
              <Textarea
                placeholder="Role Description"
                className="resize-none font-light"
              />
            </div> */}
            <div className="flex justify-end">
              <Button className="text-md" disabled={isLoading}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
