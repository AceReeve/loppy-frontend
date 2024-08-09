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
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Separator,
  SheetFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@repo/ui/components/ui";
import React, { useState } from "react";
import {
  XMarkIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import TagFilter from "@/src/app/dashboard/contacts/filters/tag-filter.tsx";
import CompanyFilter from "@/src/app/dashboard/contacts/filters/company-filter.tsx";
import FirstNameFilter from "@/src/app/dashboard/contacts/filters/first-name-filter.tsx";
import LastNameFilter from "@/src/app/dashboard/contacts/filters/last-name-filter.tsx";
import EmailFilter from "@/src/app/dashboard/contacts/filters/email-filter.tsx";
import WildCardNameFilter from "@/src/app/dashboard/contacts/filters/wild-card-name-filter.tsx";
import AppliedFilter from "@/src/app/dashboard/contacts/filters/applied-filter.tsx";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  noResultsComponent?: React.ReactNode;
  enablePagination?: boolean;
}

export function RoleDataTable<TData, TValue>({
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
          {/* {table.getFilteredRowModel().rows.length} roles.{" "}*/}
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
            {/*       {table.getFilteredSelectedRowModel().rows.length} of{" "}*/}
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
