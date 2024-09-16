/* eslint-disable -- will fix eslint errors later */

import React, { useState } from "react";
import {
  EyeSlashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/ui";
import TagFilter from "@/src/app/dashboard/contacts/filters/tag-filter.tsx";
import CompanyFilter from "@/src/app/dashboard/contacts/filters/company-filter.tsx";
import FirstNameFilter from "@/src/app/dashboard/contacts/filters/first-name-filter.tsx";
import LastNameFilter from "@/src/app/dashboard/contacts/filters/last-name-filter.tsx";
import EmailFilter from "@/src/app/dashboard/contacts/filters/email-filter.tsx";
import WildCardNameFilter from "@/src/app/dashboard/contacts/filters/wild-card-name-filter.tsx";
import AppliedFilter from "@/src/app/dashboard/contacts/filters/applied-filter.tsx";

interface ContactFiltersProps {
  setFilters: (filter: any) => void;
}

interface FilterObject {
  label: string;
  value: string[];
}

export default function ContactFilters({ setFilters }: ContactFiltersProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("name");
  const [isFilterMode, setIsFilterMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<FilterObject[]>([]);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const accordionItems = [
    {
      label: "Tag",
      content: <TagFilter onAdd={addFilter} />,
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

  const addFilter = (label: string, newValue: string[]) => {
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
  };

  const deleteFilter = (index: number) => {
    setSelectedFilters(selectedFilters.filter((_, i) => i !== index));
  };

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
    setFilterSheetOpen(!filterSheetOpen);
  };

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

  return (
    <>
      <div className="flex place-content-center items-center py-2">
        <div className="mb-6 flex w-full items-center justify-between">
          <div className="relative flex w-full flex-row justify-start gap-4">
            <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500" />
            <Input
              className="max-w-60 pl-10"
              onChange={(event) =>
                table.getColumn(value)?.setFilterValue(event.target.value)
              }
              placeholder="Search name, phone, etc..."
              type="search"
              value={(table.getColumn(value)?.getFilterValue() as string) ?? ""}
            />

            <div className="flex h-auto flex-row place-items-center space-x-2">
              <p className="font-nunito text-sm font-bold">Filter by:</p>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {value}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {table
                          .getAllColumns()
                          .filter((column) => column.getCanHide())
                          .map((column, index) => (
                            <CommandItem
                              key={index}
                              onSelect={(currentValue) => {
                                setValue(currentValue);
                                setOpen(false);
                              }}
                            >
                              {column.id}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
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

                      <p className="content-center font-nunito text-sm text-gray-500">
                        Apply filters to contacts
                      </p>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <Separator className="my-6" />
                {isFilterMode ? (
                  <>
                    <div className="flex justify-between">
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
                        deleteFilter={() => {
                          deleteFilter(index);
                        }}
                      />
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
                      <div className="text-center">Please select a filter</div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="w-70 relative mb-6 drop-shadow-lg">
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
                          />
                        </svg>
                      </div>
                      <input
                        autoComplete="off"
                        type="text"
                        name="email"
                        id="topbar-search"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                        }}
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
                                  <div className="flex justify-end" />
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
                <SheetFooter />
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
                        onCheckedChange={(value) => {
                          column.toggleVisibility(value);
                        }}
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
    </>
  );
}
