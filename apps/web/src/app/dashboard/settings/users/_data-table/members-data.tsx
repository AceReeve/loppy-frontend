/* eslint-disable -- will use tanstack table for this one */

"use client";

// TODO: Use table from @repo/ui and uninstall tanstack table
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
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
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from "@repo/ui/components/ui";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SendInviteUsersSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useSendInviteUserMutation } from "@repo/redux-utils/src/endpoints/settings-user.ts";
import { InviteUserPayload } from "@repo/redux-utils/src/endpoints/types/user";
import { GetSendInviteUserPayload } from "@repo/redux-utils/src/endpoints/types/settings-user";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { CheckCircle } from "lucide-react";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  noResultsComponent?: React.ReactNode;
  enablePagination?: boolean;
}

export function MemberDataTable<TData, TValue>({
  columns,
  data,
  noResultsComponent,
  enablePagination,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  // Function to filter items based on search term

  const [searchTerm, setSearchTerm] = useState("");

  const [isFilterMode, setIsFilterMode] = useState(false);

  /*  interface FilterObject {
    label: string;
    value: string[];
  }*/

  /*  const filterItems = (itemLabel: string) => {
    return itemLabel.toLowerCase().includes(searchTerm.toLowerCase());
  };*/

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [value, setValue] = useState("name");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [inviteUser, { isLoading, isError }] = useSendInviteUserMutation();
  const formSchema = SendInviteUsersSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      users: [
        {
          email: "",
          role: "",
        },
      ],
    },
  });

  const {
    reset,
    formState: { errors },
  } = form;

  /*
  const [users, setUsers] = useState([{ email: "", role: "" }]);
  const addField = () => {
    const newUsers = [...users, { email: "", role: "" }];
    setUsers(newUsers);
    // form.setValue("users", newUsers);
  };
*/

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "users",
  });

  const onSubmit = async () => {
    try {
      const userInvite: GetSendInviteUserPayload = form.getValues();
      const response = await inviteUser(userInvite)
        .unwrap()
        .then(() => {
          setIsSuccess(true);
        })
        .catch((e: unknown) => {
          setError(getErrorMessage(e));
        });
    } catch (error) {
      return <div>isError + {getErrorMessage(error)}</div>;
    }
  };
  /*
  useEffect(() => {
    form.setValue("users", users);
  }, [users]);
*/

  const [open, setOpen] = useState(false);
  const [rolesOpen, setRolesOpen] = useState(false);
  const handleDialogOpenChange = (open: boolean) => {
    if (open) {
      reset(); // Reset the form when the dialog opens
      setIsSuccess(false);
      setError("");
    }
  };

  const formComponent = (
    <FormProvider {...form}>
      <p className="text-[12px]">
        Chose the role and then enter the e-mail address or name of the person
        you wish to invite or search your team members.
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/*        {isError && <p className="px-3">Error</p>}*/}
        {error && (
          <div
            className="mb-5 rounded border-s-4 border-red-500 bg-red-50 p-4"
            role="alert"
          >
            <p className="text-sm text-red-700">Invitation Failed: {error}</p>
          </div>
        )}
        {fields.map((field, index) => (
          <div key={field.id} className="mb-4 flex flex-col space-y-2">
            <div className="flex items-start space-x-2">
              <Controller
                name={`users.${index}.email`}
                control={form.control}
                render={({ field }) => (
                  <div className=" w-full">
                    <Input autoComplete="off" placeholder="Email" {...field} />
                    {errors.users &&
                    errors.users[index] &&
                    errors.users[index].email ? (
                      <p className="mt-2 text-[0.8rem] font-medium text-error">
                        {errors.users[index].email.message}
                      </p>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name={`users.${index}.role`}
                control={form.control}
                render={({ field }) => (
                  <div className="w-[250px]">
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="text-md h-[40px] text-slate-500"
                        variant="outline"
                      >
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      {errors.users &&
                      errors.users[index] &&
                      errors.users[index].role ? (
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
                        <SelectItem value="Agency">Agency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              {fields.length > 1 && (
                <Button
                  type="button"
                  onClick={() => remove(index)}
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
          onClick={() => append({ email: "", role: "" })}
          className="text-md mb-4 w-full px-5"
          variant="outline"
        >
          + Add More
        </Button>
        <Separator />
        <div className="flex justify-between">
          <p className="text-slate-500">
            Total Members to Invite: {fields.length}
          </p>
          <Button type="submit" className="text-md px-5">
            Invite
          </Button>
        </div>
      </form>
    </FormProvider>
  );
  const loadingView = (
    <div className="flex h-[176px] flex-col items-center justify-center space-y-6">
      <LoadingSpinner />
      <p>Loading, please wait...</p>
    </div>
  );

  const successView = (
    <div>
      <div className="flex h-[176px] flex-col items-center justify-center space-y-6">
        <CheckCircle className="text-green-600" width={70} height={70} />
        <p className="text-2xl">Team members were invited Successfully!</p>
      </div>
      {/*      <Button className="w-full text-xl" onClick={}>
        Done
      </Button>*/}
    </div>
  );
  return (
    <div className="w-full">
      <div className="flex place-content-center items-center py-2">
        <div className="mb-6 flex w-full items-center justify-between">
          {/*  <div className="relative flex w-full flex-row justify-start gap-4">
            <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500" />
            <Input
              className="max-w-60 pl-10"
              onChange={(event) =>
                table.getColumn(value)?.setFilterValue(evenzt.target.value)
              }
              placeholder="Search Role"
              type="search"
              value={(table.getColumn(value)?.getFilterValue() as string) ?? ""}
            />
          </div>*/}
          <div className="flex w-full flex-row items-center justify-between">
            <div className="relative flex w-full flex-row justify-between ">
              <MagnifyingGlassIcon className="absolute left-2 top-1.5 h-5 w-5 text-gray-500 " />
              <Input
                className="max-w-60 pl-10"
                onChange={(event) =>
                  table.getColumn(value)?.setFilterValue(event.target.value)
                }
                placeholder="Search Member"
                type="search"
                value={
                  (table.getColumn(value)?.getFilterValue() as string) ?? ""
                }
              />
            </div>
            <Dialog onOpenChange={handleDialogOpenChange}>
              <DialogTrigger asChild>
                <Button className="px-5">Invite User</Button>
              </DialogTrigger>
              <DialogContent className="max-w-[800px]  font-poppins">
                <DialogTitle className=" flex justify-between ">
                  <div className="text-2xl">Invite Member</div>
                  <p className="text-[12px]">
                    <b>3</b> of <b>3</b> seats used
                  </p>
                </DialogTitle>
                <Separator />

                {isLoading
                  ? loadingView
                  : isSuccess
                    ? successView
                    : formComponent}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                {!noResultsComponent ? (
                  <TableCell
                    className="h-24 text-center"
                    colSpan={columns.length}
                  >
                    No results.
                  </TableCell>
                ) : (
                  <TableCell className="text-center" colSpan={columns.length}>
                    {noResultsComponent}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {enablePagination !== false && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>

          <div className="flex items-center justify-end space-x-2 ">
            {/*          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size="sm"
            variant="outline"
          >
            Previous
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            size="sm"
            variant="outline"
          >
            Next
          </Button>*/}

            <Button
              onClick={() => {
                //const previousPageSkip =
                //table.page * table.pageSize - table.pageSize;
                //handleSubmitFilters(previousPageSkip);
                table.previousPage();
              }}
              size="sm"
              variant="outline"
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                // const nextPageSkip = table.page * table.pageSize;
                // handleSubmitFilters(nextPageSkip);
                table.nextPage();
              }}
              size="sm"
              variant="outline"
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
