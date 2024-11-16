import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@repo/ui/components/ui";
import { useEffect, useState } from "react";
import { cn } from "@repo/ui/utils";
import { type PageProps } from "@/src/types/types";

interface PaginationProps extends PageProps {
  pages: number;
  maxRows: number;
  length: number;
  sides?: number;
  isShowDots?: boolean;
}
export default function Pagination({
  page: current,
  pages,
  maxRows,
  length,
  setPage,
  sides = 3,
}: PaginationProps) {
  const [isShowDots, setIsShowDots] = useState(false);
  const [leftSide, setLeftSide] = useState<number[]>([]);
  const [rightSide, setRightSide] = useState<number[]>([]);

  useEffect(() => {
    setLeftSide([]);
    setRightSide([]);

    // Determine whether dots are needed (only if total pages are more than sides * 2 + 1)
    setIsShowDots(pages > sides * 2);

    // Determine the range of pages to show on the left side
    let leftStart = Math.max(1, current - Math.floor(sides / 2));
    const leftEnd = Math.min(pages, leftStart + sides - 1);

    // Determine the range of pages to show on the right side
    const rightStart = Math.max(pages - sides + 1, leftEnd + 1);
    const rightEnd = pages;

    // Adjust leftStart to avoid overlapping with the right side when there's no room for dots
    if (leftEnd >= rightStart - 1) {
      leftStart = Math.max(1, rightStart - sides);
      setIsShowDots(false); // No need for dots if there’s no gap
    }

    // Populate the left and right sides with page numbers
    for (let i = leftStart; i <= leftEnd; i++) {
      leftSide.push(i);
      setLeftSide((prev) => [...prev, i]);
    }

    for (let i = rightStart; i <= rightEnd; i++) {
      setRightSide((prev) => [...prev, i]);
    }
  }, [current, pages]);

  if (length === 0) return null;

  return (
    <div className="flex items-center justify-between px-4 py-2">
      {pages > 1 ? (
        <div className="flex flex-1 items-center justify-between sm:hidden">
          <Button
            onClick={() => {
              setPage(current - 1);
            }}
            variant="outline"
            disabled={current === 1}
          >
            Previous
          </Button>
          <p className="text-sm text-slate-500">
            <span className="font-medium">{current}</span>/
            <span className="font-medium">{pages}</span>
          </p>
          <Button
            onClick={() => {
              setPage(current + 1);
            }}
            variant="outline"
            disabled={current === pages}
          >
            Next
          </Button>
        </div>
      ) : null}
      <div className="hidden flex-wrap gap-2 sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="hidden text-sm text-slate-500 md:block">
          Showing
          <span className="font-medium"> {(current - 1) * maxRows + 1} </span>
          to
          <span className="font-medium">
            {" "}
            {current * maxRows > length ? length : current * maxRows}{" "}
          </span>
          of
          <span className="font-medium"> {length} </span>
          results
        </p>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <Button
            onClick={() => {
              setPage(1);
            }}
            variant="outline"
            disabled={current === 1}
            className="rounded-r-none"
          >
            <span className="sr-only">First</span>
            <ChevronDoubleLeftIcon className="h-3.5 w-4" />
          </Button>
          <Button
            onClick={() => {
              setPage(current - 1);
            }}
            variant="outline"
            disabled={current === 1}
            className="rounded-none"
          >
            <span className="sr-only">Last</span>
            <ChevronLeftIcon className="h-3.5 w-4" />
          </Button>

          {leftSide.map((page) => (
            <Button
              variant={current === page ? "default" : "outline"}
              key={page}
              onClick={() => {
                setPage(page);
              }}
              className={cn(
                "rounded-none",
                current === page && "bg-primary text-card",
              )}
            >
              {page}
            </Button>
          ))}
          {pages > sides ? (
            <>
              <div className="flex">
                {isShowDots ? (
                  <Button
                    variant="outline"
                    className="border-x-none pointer-events-none relative inline-flex items-center rounded-none px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    ...
                  </Button>
                ) : null}
              </div>
              {rightSide.map((page) => (
                <Button
                  variant="outline"
                  key={page}
                  onClick={() => {
                    setPage(page);
                  }}
                  className="rounded-none"
                >
                  {page}
                </Button>
              ))}
            </>
          ) : null}

          <Button
            onClick={() => {
              setPage(current + 1);
            }}
            variant="outline"
            disabled={current === pages}
            className="rounded-none"
          >
            <span className="sr-only">Last</span>
            <ChevronRightIcon className="h-3.5 w-4" />
          </Button>
          <Button
            onClick={() => {
              setPage(pages);
            }}
            variant="outline"
            disabled={current === pages}
            className="rounded-l-none"
          >
            <span className="sr-only">Last</span>
            <ChevronDoubleRightIcon className="h-3.5 w-4" />
          </Button>
        </nav>
      </div>
    </div>
  );
}
