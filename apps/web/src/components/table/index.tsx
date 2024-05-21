"use client";

import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/table-core";
import { flexRender, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";

type Props = {};

//TData
type User = {
  name: string;
  date: string;
  source: string;
  leadType: string;
  callDuration: string;
  ltv: string;
  existingCustomer: string;
};

export default function Table(props: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const item: User = {
    name: "John Doe",
    date: "3/1/24",
    source: "Google",
    leadType: "Phone Call",
    callDuration: "3:27",
    ltv: "$0",
    existingCustomer: "No",
  };

  const [data, setData] = useState(Array.from({ length: 6 }, () => item));
  const columnHelper = createColumnHelper<User>();

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "actions",
        enableSorting: false,
        header: () => (
          <>
            <label htmlFor="SelectAll" className="sr-only">
              Select All
            </label>

            <input type="checkbox" id="SelectAll" className="rounded" />
          </>
        ),
        cell: () => (
          <>
            <label htmlFor="SelectAll" className="sr-only">
              Select All
            </label>

            <input type="checkbox" id="SelectAll" className="rounded" />
          </>
        ),
      }),
      columnHelper.accessor("name", { header: "Name" }),
      columnHelper.accessor("date", { header: "Date" }),
      columnHelper.accessor("source", { header: "Source" }),
      columnHelper.accessor("leadType", { header: "Lead Type" }),
      columnHelper.accessor("callDuration", { header: "Call Duration" }),
      columnHelper.accessor("ltv", { header: "LTV" }),
      columnHelper.accessor("existingCustomer", {
        header: "Existing Customer",
      }),
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-card text-sm">
        <thead className="text-left font-nunito text-xs font-bold uppercase leading-tight tracking-wider text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`bg-primary px-4 py-2.5 font-medium
                    ${index === 0 ? "sticky inset-y-0 start-0 rounded-l-[10px]" : index === headerGroup.headers.length - 1 ? "rounded-r-[10px]" : ""}
                    ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                    `}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "flex justify-between items-center gap-2"
                            : "",
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: <ArrowUp2 variant="Bold" size={14} />,
                          desc: <ArrowDown2 variant="Bold" size={14} />,
                        }[header.column.getIsSorted() as string] ?? ""}
                        {header.column.getCanSort() &&
                        !header.column.getIsSorted() ? (
                          <div className="inline-flex flex-col">
                            <ArrowUp2
                              variant="Bold"
                              size={10}
                              className="-mb-1"
                            />
                            <ArrowDown2 variant="Bold" size={10} />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-black/10 font-semibold text-gray-500">
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <td
                        key={cell.id}
                        className={`bg-card px-4 py-2.5 ${index === 0 ? "sticky inset-y-0 start-0" : ""}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
