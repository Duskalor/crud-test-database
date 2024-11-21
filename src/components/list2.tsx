"use client";
"use no memo";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {useState} from "react";
import {type ColumnDef} from "@tanstack/react-table";
import {redirect} from "next/navigation";
import {type Invitados, Boda} from "@prisma/client";

import {Input} from "./ui/input";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function List2<T extends Boda | Invitados>({
  data,
  columns,
}: {
  data: T[];
  columns: ColumnDef<T>[];
}) {
  const [filtering, setFiltering] = useState("");
  const [setSorting, setSetSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSetSorting,
    state: {
      globalFilter: filtering,
      sorting: setSorting,
    },
  });

  return (
    <section>
      <Input
        className="mx-auto my-5 w-[500px]"
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <Table className={`w-[${table.getTotalSize()}px] mx-auto`}>
        <TableCaption>A list of your recent guest.</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="cursor-pointer select-none px-5 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
                    style={{width: `${header.getSize()}px`}}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    {{asc: "⬆️", desc: "⬇️"}[(header.column.getIsSorted() as string) ?? null]}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow
                key={row.id}
                className=""
                onClick={() => {
                  const route =
                    "TipoHab" in data[0]
                      ? `Guest/${row.original.id}/edit`
                      : `Bodas/${row.original.id}/Guest`;

                  redirect(route);
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className={`w-[${cell.column.getSize()}px] ${cell.getValue() ? "cursor-pointer" : ""} `}
                      onClick={(e) => {
                        if (!cell.getValue()) e.stopPropagation();
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
