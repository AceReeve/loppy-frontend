import React from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  type UseFormReturn,
} from "react-hook-form";
import { type z } from "zod";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui";
import { type SendInviteUsersSchema } from "@/src/schemas";

interface InviteMembersFormProps {
  form: UseFormReturn<z.infer<typeof SendInviteUsersSchema>>;
  onSubmit: (e: React.SyntheticEvent) => void;
}

function InviteMembersForm(props: InviteMembersFormProps) {
  const form = props.form;

  const {
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "users",
  });

  return (
    <div className="w-full">
      <FormProvider {...form}>
        <form className="w-full space-y-2" onSubmit={props.onSubmit}>
          {fields.map((fieldItem, index) => (
            <div key={fieldItem.id} className="flex flex-col space-y-2">
              <div className="flex items-start space-x-2">
                <Controller
                  /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- will check later */
                  name={`users.${index}.email`}
                  control={form.control}
                  render={({ field }) => (
                    <div className=" w-full">
                      <Input
                        autoComplete="off"
                        placeholder="Email"
                        {...field}
                      />
                      {errors.users?.[index]?.email ? (
                        <p className="mt-2 text-[0.8rem] font-medium text-error">
                          {errors.users[index].email.message}
                        </p>
                      ) : null}
                    </div>
                  )}
                />
                <Controller
                  /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- will check later */
                  name={`users.${index}.role`}
                  control={form.control}
                  render={({ field }) => (
                    <div className="w-[250px]">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className="h-[40px] text-slate-500"
                          variant="outline"
                        >
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        {errors.users?.[index]?.role ? (
                          <p className="mt-2 text-[0.8rem] font-medium text-error">
                            {errors.users[index].role.message}
                          </p>
                        ) : null}
                        <SelectContent>
                          <SelectItem value="Administrator">
                            Administrator
                          </SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Member">Member</SelectItem>
                          <SelectItem value="Observer">Observer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
                {fields.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => {
                      remove(index);
                    }}
                    className=""
                    variant="outline"
                  >
                    -
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => {
              append({ email: "", role: "" });
            }}
            className="w-full"
            variant="outline"
          >
            + Add More Members
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default InviteMembersForm;
