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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card.tsx";
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
  setFilters: (filter: any) => void;
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
import TagFilter from "@/src/app/dashboard/contacts/filters/tag-filter.tsx";
import CompanyFilter from "@/src/app/dashboard/contacts/filters/company-filter.tsx";
import FirstNameFilter from "@/src/app/dashboard/contacts/filters/first-name-filter.tsx";
import LastNameFilter from "@/src/app/dashboard/contacts/filters/last-name-filter.tsx";
import EmailFilter from "@/src/app/dashboard/contacts/filters/email-filter.tsx";
import WildCardNameFilter from "@/src/app/dashboard/contacts/filters/wild-card-name-filter.tsx";
import { Trash } from "iconsax-react";
import { Pen } from "lucide-react";
import AppliedFilter from "@/src/app/dashboard/contacts/filters/applied-filter.tsx";
import { string } from "zod";

export function DataTable<TData, TValue>({
  columns,
  data,
  noResultsComponent,
  setFilters,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  // Function to filter items based on search term

  const [searchTerm, setSearchTerm] = useState("");

  const accordionItems = [
    {
      label: "Tag",
      content: <TagFilter onAdd={AddFilter} />,
    },
    {
      label: "Company Name",
      content: <CompanyFilter />,
    },
    {
      label: "First Name",
      content: <FirstNameFilter />,
    },
    {
      label: "Last Name",
      content: <LastNameFilter />,
    },

    {
      label: "Email",
      content: <EmailFilter />,
    },
    {
      label: "Wild Card Name",
      content: <WildCardNameFilter />,
    },
  ];

  const [isFilterMode, setIsFilterMode] = useState(false);

  function applyFilter(index: number, newValue: []) {
    const updatedAccordionItems = [...accordionItems];

    updatedAccordionItems[index] = {
      ...updatedAccordionItems[index],
      //value: newValue,
    };
    setIsFilterMode(!isFilterMode);

    //setAccordionItems(updatedAccordionItems);
  }

  interface FilterObject {
    label: string;
    value: string[];
  }

  const [selectedFilters, setSelectedFilters] = useState<FilterObject[]>([]);
  const handleClearFilters = () => {
    setSelectedFilters([]);

    setFilters({
      search_key: "",
      status: "",
      skip: 0,
      limit: 100,
      sort_dir: "desc",
      tag: [],
    });
  };

  function AddFilter(label: string, newValue: string[]) {
    const filterIndex = selectedFilters.findIndex(
      (filter) => filter.label === label,
    );

    if (filterIndex !== -1) {
      const updatedFilters = [...selectedFilters];
      updatedFilters[filterIndex].value = newValue;
      setSelectedFilters(updatedFilters);
    } else {
      const newFilter: FilterObject = { label, value: newValue };
      setSelectedFilters((prevFilters) => [...prevFilters, newFilter]);
    }

    setIsFilterMode((is) => !is);
  }

  function deleteFilter(index: Number) {
    setSelectedFilters(selectedFilters.filter((_, i) => i !== index));
  }

  const filterItems = (itemLabel: string) => {
    return itemLabel.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const handleSubmitFilters = () => {
    setFilters({
      search_key: "",
      status: "",
      skip: 0,
      limit: 100,
      sort_dir: "desc",
      tag: selectedFilters.map((filter) => filter.value),
    });
    setFilterSheetOpen(false);
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
  const totalItems = table.getFilteredRowModel().rows.length;
  const pageSize = 10; // Assuming 10 items per page
  const totalPages = Math.ceil(totalItems / pageSize);

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

            <Sheet onOpenChange={setFilterSheetOpen} open={filterSheetOpen}>
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
                      <div className="flex justify-start gap-3">
                        <img
                          alt=""
                          className="w-[18px]"
                          src="/assets/icons/icon-filter.svg"
                        />
                        <p>Filter</p>
                      </div>

                      <p className="text-gray-500 text-sm font-nunito content-center">
                        Apply filters to contacts
                      </p>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <Separator className="my-6" />
                {isFilterMode ? (
                  <>
                    <div className="justify-between flex">
                      <Button
                        onClick={() => {
                          setIsFilterMode(!isFilterMode);
                        }}
                      >
                        Return
                      </Button>
                      <Button variant="outline" onClick={handleClearFilters}>
                        Clear all filters
                      </Button>
                    </div>

                    <Separator className="my-6" />
                    {selectedFilters.map((selected, index) => (
                      <AppliedFilter
                        key={index}
                        filter={selected}
                        deleteFilter={() => deleteFilter(index)}
                      ></AppliedFilter>
                    ))}
                    {/* Your component JSX here */}
                    {selectedFilters.length > 0 ? (
                      <Button
                        className="mt-2 w-full"
                        onClick={handleSubmitFilters}
                      >
                        Submit
                      </Button>
                    ) : (
                      <div className={"text-center"}>
                        Please select a filter
                      </div>
                    )}
                  </>
                ) : (
                  <>
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block h-10 w-full rounded-lg border-none bg-white p-2.5 px-3.5 py-3 pl-10 text-gray-900 shadow-none placeholder:text-gray-600/50 sm:text-sm"
                        placeholder="Search Filters"
                      />
                    </div>

                    <p className="font-nunito">Most Used</p>

                    <div className=" h-auto">
                      <Accordion
                        type="single"
                        collapsible
                        className="h-auto w-full"
                      >
                        {accordionItems.map((item, index) => {
                          if (filterItems(item.label)) {
                            return (
                              <AccordionItem
                                key={index}
                                value={`item-${index}`}
                              >
                                <AccordionTrigger>
                                  {item.label}
                                </AccordionTrigger>
                                <AccordionContent>
                                  {item.content}
                                  <div className="flex justify-end"></div>
                                </AccordionContent>
                              </AccordionItem>
                            );
                          }
                          return null;
                        })}
                      </Accordion>
                    </div>
                  </>
                )}

                <Separator className="my-6" />
                <SheetFooter></SheetFooter>
              </SheetContent>
            </Sheet>

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
              const previousPageSkip =
                table.page * table.pageSize - table.pageSize;
              handleSubmitFilters(previousPageSkip);
              table.previousPage();
            }}
            size="sm"
            variant="outline"
            disabled={table.page === 0} // Disable button when on the first page
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              const nextPageSkip = table.page * table.pageSize;
              handleSubmitFilters(nextPageSkip);
              table.nextPage();
            }}
            size="sm"
            variant="outline"
            disabled={table.page === totalPages - 1} // Disable button when on the last page
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
