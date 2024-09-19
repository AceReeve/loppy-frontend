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

interface ApiPaginationDataProps {
  limit: number;
  page: number;
  pages: number;
  total: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  disablePagination?: boolean;
  noResultsComponent?: React.ReactNode;
  initialState?: InitialTableState;
  apiPagination?: ApiPaginationDataProps;
  onPageChange?: (page: number) => void;
  className?: string;
  isFetching?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  noResultsComponent,
  disablePagination,
  initialState,
  apiPagination,
  onPageChange,
  className,
  isFetching,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: !disablePagination
      ? getPaginationRowModel()
      : undefined,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: Boolean(apiPagination),
    pageCount: apiPagination?.pages,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState,
  });

  return (
    <>
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
          {isFetching ? <LoadingOverlay className="bg-white/50" /> : null}
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                data-state={row.getIsSelected() && "selected"}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

      {!disablePagination && (
        <Pagination
          pages={table.getPageCount()}
          maxRows={table.getPaginationRowModel().rows.length}
          length={apiPagination?.total ?? data.length}
          onPageChange={onPageChange ?? table.setPageIndex}
        />
      )}
      {table.getFilteredSelectedRowModel().rows.length ? (
        <div className="text-muted-foreground flex-1 px-4 text-sm sm:px-6">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {apiPagination?.total ?? table.getFilteredRowModel().rows.length}{" "}
          row(s) selected.
        </div>
      ) : null}
    </>
  );
}
