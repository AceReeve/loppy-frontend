"use client";

import { useGetAllOpportunitiesPaginatedQuery } from "@repo/redux-utils/src/endpoints/pipelines";
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useDashboardState } from "@/src/providers/dashboard-provider";

export default function SuperAdmin() {
  const { session } = useDashboardState();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data: opportunities } = useGetAllOpportunitiesPaginatedQuery({
    page,
    limit,
    search,
  });

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  if (!session) return null;

  if (session.role !== "SuperAdmin") {
    // redirect to dashboard
    redirect("/dashboard");
  }

  return (
    <div className="m-10 space-y-5 rounded-xl bg-card p-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-end gap-3">
          <div className="font-poppins text-4xl font-medium text-gray-800">
            Super Admin
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Select
          defaultValue="10"
          onValueChange={(value) => {
            setLimit(Number(value));
          }}
        >
          <SelectTrigger className="w-[180px]" variant="outline">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>

        <Input
          className="w-[180px]"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Lead Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* has records */}
          {opportunities
            ? opportunities.records.map((opportunity) => (
                <TableRow key={opportunity._id}>
                  <TableCell className="font-medium">
                    {opportunity.title}
                  </TableCell>
                  <TableCell>{opportunity.lead_value}</TableCell>
                </TableRow>
              ))
            : null}

          {/* no records */}
          {opportunities
            ? opportunities.records.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    No submission of compliance found.
                  </TableCell>
                </TableRow>
              )
            : null}
        </TableBody>
      </Table>

      <div className="flex justify-end">
        <ReactPaginate
          containerClassName="flex flex-row items-center gap-1"
          pageCount={opportunities ? opportunities.info.totalPages : 0}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          previousLabel={<span>&laquo;</span>}
          nextLabel={<span>&raquo;</span>}
          breakLabel="..."
          breakLinkClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
          pageLinkClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
          previousLinkClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
          nextLinkClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
          activeClassName="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9"
        />
      </div>
    </div>
  );
}
