"use client";
import {Boda, Invitados} from "@prisma/client";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {useState} from "react";
import {type ColumnDef} from "@tanstack/react-table";

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

export function List2<T>({data, columns}: {data: T[]; columns: ColumnDef<T>[]}) {
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });
  const sorterd = {asc: "⬆️", desc: "⬇️"};

  return (
    <section>
      <Input
        className="mx-auto my-5 w-[500px]"
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <Table className={`w-[${table.getTotalSize()}x] mx-auto`}>
        <TableCaption>A list of your recent guest.</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={`w-[${header.getSize()}px]`}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted()
                    ? sorterd[header.column.getIsSorted() as "asc" | "desc"]
                    : null}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id} className={`w-[${cell.column.getSize()}px]`}>
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
