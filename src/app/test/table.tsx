"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {useState} from "react";

import {Pokemon} from "@/types/pokemon.type";

function Table({columns, data}: {data: Pokemon[]; columns: ColumnDef<Pokemon>[]}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    data,
    columns,
    state: {
      sorting,
    },
  });

  return (
    <div className="dark w-full p-5">
      <table className="min-w-full border border-gray-300 bg-white">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const firstValue = table
                  .getPreFilteredRowModel()
                  .flatRows[0]?.getValue(header.column.id);
                const columnFilterValue = header.column.getFilterValue();

                return (
                  <th
                    key={header.id}
                    className="cursor-pointer select-none px-5 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{asc: "⬆️", desc: "⬇️"}[header.column.getIsSorted() as string] ?? null}

                    {typeof firstValue !== "number" ? (
                      <div className="m-1">
                        <input
                          className="w-full rounded p-1"
                          type="text"
                          value={(columnFilterValue ?? "") as string}
                          onChange={(e) => header.column.setFilterValue(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    ) : (
                      <div
                        className="flex justify-between space-x-2 p-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          className="w-24 rounded border shadow"
                          min={1}
                          placeholder="Min"
                          type="number"
                          value={(columnFilterValue as [number, number])?.[0] ?? ""}
                          onChange={(e) =>
                            header.column.setFilterValue((old: [number, number]) => [
                              e.target.value,
                              old?.[1],
                            ])
                          }
                        />
                        <input
                          className="w-24 rounded border shadow"
                          min={1}
                          placeholder="Max"
                          type="number"
                          value={(columnFilterValue as [number, number])?.[1] ?? ""}
                          onChange={(e) =>
                            header.column.setFilterValue((old: [number, number]) => [
                              old?.[0],
                              e.target.value,
                            ])
                          }
                        />
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-100">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <section>
        <div className="flex justify-center p-2">
          Page&nbsp;
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </div>
        <div className="flex justify-center space-x-5 p-5">
          <button
            className="rounded border-[1px] border-gray-300 px-5 py-1"
            onClick={() => table.firstPage()}
          >
            {"<<"}
          </button>
          <button
            className="rounded border-[1px] border-gray-300 px-5 py-1"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            {"<"}
          </button>
          <button
            className="rounded border-[1px] border-gray-300 px-5 py-1"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            {">"}
          </button>
          <button
            className="rounded border-[1px] border-gray-300 px-5 py-1"
            onClick={() => table.lastPage()}
          >
            {">>"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default Table;
