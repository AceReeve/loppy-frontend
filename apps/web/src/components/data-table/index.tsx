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
} from "@repo/ui/components/ui";
import React, { useState } from "react";
import {
  XMarkIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  noResultsComponent?: React.ReactNode;
}
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion.tsx";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/src/components/ui/multiselect.tsx";
import {
  useCreateContactMutation,
  useGetContactsQuery,
} from "@/src/endpoints/contacts.ts";
import { useCreatePaymentIntentMutation } from "@/src/endpoints/payment.ts";
import events from "node:events";

export function DataTable<TData, TValue>({
  columns,
  data,
  noResultsComponent,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: events) => {
    setSearchTerm(e.target.value);
  };

  // Function to filter items based on search term
  const filterItems = (item: string) => {
    return item.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const [value, setValue] = useState<string[]>([]);
  const options = [
    { label: "ChatGPT", value: "ChatGPT" },
    { label: "Facebook", value: "Facebook" },
    { label: "Twitter", value: "Twitter" },
  ];

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

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="mb-6 flex w-full items-center justify-between">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500" />
            <Input
              className="max-w-60 pl-10"
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              placeholder="Search name, phone, etc..."
              type="search"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
            />
          </div>
          <div className="flex items-end gap-4">
            <Button className="gap-2 rounded-full" variant="secondary">
              Create date before 1/12/20
              <XMarkIcon className="relative h-4 w-4 text-gray-500" />
            </Button>
            <Button className="gap-2 rounded-full" variant="secondary">
              Contact frequency (2+)
              <XMarkIcon className="relative h-4 w-4 text-gray-500" />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="gap-2 rounded-xl" variant="outline">
                  <img
                    alt=""
                    className="w-[18px]"
                    src="/assets/icons/icon-filter.svg"
                  />
                  Add Filter
                </Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <div className="block ">
                      <p>Filter</p>
                      <p className="text-gray-500 text-sm font-nunito">
                        Apply filters to contacts
                      </p>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <Separator className="my-6" />
                <div className="relative w-70 drop-shadow-lg mb-6">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
                    <svg
                      className="h-5 w-5 text-gray-500 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    autoComplete={"off"}
                    type="text"
                    name="email"
                    id="topbar-search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="block h-10 w-full rounded-lg border-none bg-white p-2.5 px-3.5 py-3 pl-10 text-gray-900 shadow-none placeholder:text-gray-600/50 sm:text-sm"
                    placeholder="Search Filters"
                  />
                </div>
                <p className="font-nunito">Most Used</p>
                <div className=" h-[1000px]">
                  <Accordion
                    type="single"
                    collapsible
                    className=" h-auto w-full"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Company Name</AccordionTrigger>
                      <AccordionContent className="min-h-[50px] h-auto ">
                        <div className="relative w-70 drop-shadow-lg">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
                            <svg
                              className="h-5 w-5 text-gray-500 "
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <input
                            autoComplete={"off"}
                            type="text"
                            name="email"
                            id="topbar-search"
                            className="block h-10 w-full rounded-lg border-none bg-white p-2.5 px-3.5 py-3 pl-10 text-gray-900 shadow-none placeholder:text-gray-600/50 sm:text-sm"
                            placeholder="ex: ServiHero, Google, Jollibee"
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>Email</AccordionTrigger>
                      <AccordionContent className="min-h-[50px] h-auto ">
                        <div className="relative w-70 drop-shadow-lg">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
                            <svg
                              className="h-5 w-5 text-gray-500 "
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <input
                            autoComplete={"off"}
                            type="text"
                            name="email"
                            id="topbar-search"
                            className="block h-10 w-full rounded-lg border-none bg-white p-2.5 px-3.5 py-3 pl-10 text-gray-900 shadow-none placeholder:text-gray-600/50 sm:text-sm"
                            placeholder="ex:Juan@gmail.com"
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>First Name</AccordionTrigger>
                      <AccordionContent className="min-h-[50px] h-auto ">
                        <div className="relative w-70 drop-shadow-lg">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
                            <svg
                              className="h-5 w-5 text-gray-500 "
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <input
                            autoComplete={"off"}
                            type="text"
                            name="email"
                            id="topbar-search"
                            className="block h-10 w-full rounded-lg border-none bg-white p-2.5 px-3.5 py-3 pl-10 text-gray-900 shadow-none placeholder:text-gray-600/50 sm:text-sm"
                            placeholder="ex: Juan, Jose, Marie"
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger>Last Name</AccordionTrigger>
                      <AccordionContent className="min-h-[50px] h-auto ">
                        <div className="relative w-70 drop-shadow-lg">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
                            <svg
                              className="h-5 w-5 text-gray-500 "
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <input
                            autoComplete={"off"}
                            type="text"
                            name="email"
                            id="topbar-search"
                            className="block h-10 w-full rounded-lg border-none bg-white p-2.5 px-3.5 py-3 pl-10 text-gray-900 shadow-none placeholder:text-gray-600/50 sm:text-sm"
                            placeholder="ex: Montemayor, Estrada"
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger>Tag</AccordionTrigger>
                      <AccordionContent className="min-h-[100px] h-auto ">
                        <MultiSelector
                          values={value}
                          onValuesChange={setValue}
                          loop={false}
                        >
                          <MultiSelectorTrigger>
                            <MultiSelectorInput placeholder="Select your framework" />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                            <MultiSelectorList className="relative">
                              {options.map((option, i) => (
                                <MultiSelectorItem key={i} value={option.value}>
                                  {option.label}
                                </MultiSelectorItem>
                              ))}
                            </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                      <AccordionTrigger>Wildcard Name</AccordionTrigger>
                      <AccordionContent className="min-h-[100px] h-auto ">
                        <MultiSelector
                          values={value}
                          onValuesChange={setValue}
                          loop={false}
                        >
                          <MultiSelectorTrigger>
                            <MultiSelectorInput placeholder="Select your framework" />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                            <MultiSelectorList className="relative">
                              {options.map((option, i) => (
                                <MultiSelectorItem key={i} value={option.value}>
                                  {option.label}
                                </MultiSelectorItem>
                              ))}
                            </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <SheetFooter></SheetFooter>
                <Button>Apply</Button>
              </SheetContent>
            </Sheet>

            {/* Hide/Show Columns */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-auto" variant="outline">
                  <EyeSlashIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        checked={column.getIsVisible()}
                        className="capitalize"
                        key={column.id}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div>
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
            {table.getRowModel().rows?.length ? (
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
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="flex items-center justify-end space-x-2 ">
          <Button
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
          </Button>
        </div>
      </div>
    </div>
  );
}
