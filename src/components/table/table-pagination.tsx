import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  paginationType: "client" | "server";
}

export function DataTablePagination<TData>({
  table,
  paginationType,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex space-x-6 lg:items-center lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="hidden text-sm font-medium lg:block">Rows per page</p>
          <p className="block text-sm font-medium lg:hidden">Rows</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="flex items-center text-sm font-medium lg:w-[100px] lg:justify-center">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {paginationType === "server" ? 500 : table.getPageCount()}
        </div> */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={
              paginationType === "server"
                ? () =>
                    table.setPageIndex(
                      table.getState().pagination.pageIndex + 1
                    )
                : () => table.nextPage()
            }
            disabled={
              paginationType === "server" ? undefined : !table.getCanNextPage()
            }
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={
              paginationType === "server"
                ? () =>
                    table.setPageIndex(
                      table.getState().pagination.pageIndex + 1
                    )
                : () => table.setPageIndex(table.getPageCount() - 1)
            }
            disabled={
              paginationType === "server" ? undefined : !table.getCanNextPage()
            }
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
