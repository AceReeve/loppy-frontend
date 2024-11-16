"use client";

import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  InitialTableState,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui";
import React, { useState } from "react";
import { cn } from "@repo/ui/utils";
import { LoadingOverlay } from "@repo/ui/loading-overlay.tsx";
import Pagination from "@/src/components/data-table/pagination.tsx";
import {
  type Filter,
  type FiltersProps,
  type PageProps,
} from "@/src/types/types";

interface PaginationDataProps extends PageProps {
  meta: {
    limit: number;
    page: number;
    pages: number;
    total: number;
  };
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enablePagination?: boolean;
  noResultsComponent?: React.ReactNode;
  initialState?: InitialTableState;
  paginationProps?: PaginationDataProps;
  className?: string;
  isFetching?: boolean;
  filterProps?: {
    filters: Filter;
    component: React.FC<FiltersProps<TData>>;
    setFilters: (filter: Filter) => void;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  noResultsComponent,
  enablePagination = true,
  initialState,
  paginationProps,
  className,
  isFetching,
  filterProps,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: Boolean(paginationProps),
    manualSorting: Boolean(filterProps),
    manualFiltering: Boolean(filterProps),
    pageCount: paginationProps?.meta.pages,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState,
  });

  const renderFilters = () => {
    if (filterProps) {
      const FilterComponent = filterProps.component;

      return (
        <FilterComponent
          filters={filterProps.filters}
          setFilters={filterProps.setFilters}
          table={table}
        />
      );
    }
    return null;
  };

  return (
    <>
      {renderFilters()}
      <div className="relative w-full">
        {isFetching ? <LoadingOverlay className="bg-white/50" /> : null}
        <Table className={cn("w-full", className)}>
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
        {enablePagination ? (
          <Pagination
            pages={table.getPageCount()}
            maxRows={table.getPaginationRowModel().rows.length}
            length={paginationProps?.meta.total ?? data.length}
            page={
              paginationProps?.page ?? table.getState().pagination.pageIndex + 1
            }
            setPage={(index) => {
              if (paginationProps) {
                paginationProps.setPage(index);
              } else {
                table.setPageIndex(index - 1);
              }
            }}
          />
        ) : null}
        {table.getFilteredSelectedRowModel().rows.length ? (
          <div className="text-muted-foreground flex-1 px-4 text-sm sm:px-6">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {paginationProps?.meta.total ??
              table.getFilteredRowModel().rows.length}{" "}
            row(s) selected.
          </div>
        ) : null}
      </div>
    </>
  );
}
