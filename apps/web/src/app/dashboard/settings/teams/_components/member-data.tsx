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
  DialogTrigger,
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
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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

  interface FilterObject {
    label: string;
    value: string[];
  }

  const filterItems = (itemLabel: string) => {
    return itemLabel.toLowerCase().includes(searchTerm.toLowerCase());
  };

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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("name");

  return (
    <div className="w-full">
      <div className="flex place-content-center items-center py-2">
        <div className="mb-6 flex w-full items-center justify-between">
          {/*  <div className="relative flex w-full flex-row justify-start gap-4">
            <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500" />
            <Input
              className="max-w-60 pl-10"
              onChange={(event) =>
                table.getColumn(value)?.setFilterValue(event.target.value)
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
            <Dialog>
              <DialogTrigger>
                <Button className="px-5">Add Member</Button>
              </DialogTrigger>
              <DialogContent className="max-w-[800px] font-poppins">
                <div className="flex justify-between">
                  <div className="text-2xl">Invite Member</div>
                  <p className="text-[12px]">
                    <b>3</b> of <b>3</b> seats used
                  </p>
                </div>

                <Separator />
                <p className="text-[12px]">
                  Chose the role and then enter the e-mail address or name of
                  the person you wish to invite or search your team members.
                </p>
                <div className="flex justify-between space-x-2 p-1">
                  <input className="h-10 w-full" placeholder="Email" />
                  <div className="w-[250px]">
                    <Select defaultValue="Administrator">
                      <SelectTrigger
                        className="text-md h-[40px] text-slate-500"
                        variant="outline"
                      >
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
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
                  <Button className="text-md  px-5">Invite</Button>
                </div>
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
