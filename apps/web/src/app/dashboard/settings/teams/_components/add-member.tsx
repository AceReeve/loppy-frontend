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
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  toast,
} from "@repo/ui/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { useInviteTeamMemberMutation } from "@repo/redux-utils/src/endpoints/manage-team";

interface AddMemberProps {
  teamId: string;
  refetch: () => void;
}

const AddMemberSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required",
  }),
  role: z.string().min(1, {
    message: "Role is required",
  }),
  team: z.string().min(1, {
    message: "Team is required",
  }),
});

export default function AddMember(props: AddMemberProps) {
  const form = useForm<z.infer<typeof AddMemberSchema>>({
    resolver: zodResolver(AddMemberSchema),
    defaultValues: {
      email: "",
      role: "Administrator",
      team: props.teamId,
    },
  });

  const [sendRequest, { isLoading }] = useInviteTeamMemberMutation();

  function onSubmit(data: z.infer<typeof AddMemberSchema>) {
    sendRequest({ users: [data] })
      .unwrap()
      .then(() => {
        toast({
          description: "Invited member successfully",
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
        <Button className="px-5">Add Members</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] font-poppins">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between">
              <div className="text-2xl">Invite Member</div>
              <p className="text-[12px]">
                <b>3</b> of <b>3</b> seats used
              </p>
            </div>
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <p className="mb-3 text-[12px]">
              Chose the role and then enter the e-mail address or name of the
              person you wish to invite or search your team members.
            </p>
            <div className="flex justify-between space-x-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="h-10 w-full"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-[250px]">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className="text-md h-[40px] text-slate-500"
                            variant="outline"
                          >
                            <SelectValue placeholder="Filter" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Administrator">
                            Administrator
                          </SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Member">Member</SelectItem>
                          <SelectItem value="Observer">Observer</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="text-md px-5"
                disabled={isLoading}
              >
                Invite
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
