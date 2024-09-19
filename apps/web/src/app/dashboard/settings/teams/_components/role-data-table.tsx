"use client";

import { useState } from "react";
import {
  type ColumnDef,
  flexRender,
  type SortingState,
  type VisibilityState,
  type ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from "@repo/ui/components/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MoreVertical } from "lucide-react";
import { useDeleteRoleByIdMutation } from "@repo/redux-utils/src/endpoints/manage-team";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import AddRole from "./add-role";

interface RoleDataTableProps<TData, TValue> {
  teamId: string;
  refetch: () => void;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  noResultsComponent?: React.ReactNode;
}

interface Role {
  _id: string;
  email: string;
  role_name: string;
  status: string;
}

export function RoleDataTable<TData extends Role, TValue>({
  teamId,
  refetch,
  columns,
  data,
  noResultsComponent,
}: RoleDataTableProps<TData, TValue>) {
  const [sendRequest] = useDeleteRoleByIdMutation();
  const handleRemove = (roleId: string) => {
    sendRequest(roleId)
      .unwrap()
      .then(() => {
        toast({
          description: "Member removed successfully",
        });
        refetch();
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return data.length > 0 ? (
    <>
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4">
          <div className="relative flex w-full flex-row justify-between ">
            <MagnifyingGlassIcon className="absolute left-2 top-2 h-5 w-5 text-gray-500 " />
            <Input
              placeholder="Search role"
              value={
                (table.getColumn("role")?.getFilterValue() as string) || ""
              }
              onChange={(event) =>
                table.getColumn("role")?.setFilterValue(event.target.value)
              }
              className="pl-10"
            />
          </div>
        </div>
        <AddRole teamId={teamId} refetch={refetch} />
      </div>

      {/* Table */}
      <div className="rounded-md">
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
                <TableHead />
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              handleRemove(row.original._id);
                            }}
                          >
                            Remove Role
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  ) : (
    <>
      <div className="mt-[18px] flex justify-end">
        <AddRole teamId={teamId} refetch={refetch} />
      </div>
      {noResultsComponent}
    </>
  );
}
