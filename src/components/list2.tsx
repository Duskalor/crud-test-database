"use client";
import {Invitados} from "@prisma/client";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useState} from "react";
import dayjs from "dayjs";
import {ColumnDef} from "@tanstack/react-table";

import {DeleteGuest} from "./deleteGuest";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Guest {
  id: string;
  name: string;
  TipoHab: string;
  Codigo: number;
  In: Date;
  Out: Date;
  Nights: number;
  Tarifa: number;
  Total: number | null;
  Deposito: boolean;
  ModoDePago: string | null;
  Observaciones: string | null;
  createAt: Date;
  updateAt: Date;
  BodaId: string;
}

const columns: ColumnDef<Guest>[] = [
  {
    accessorKey: "name",
    header: "NAMES",
  },
  {
    accessorKey: "TipoHab",
    header: "TIPO HAB",
  },
  {
    accessorKey: "Codigo",
    header: "CODIGO",
  },
  {
    accessorKey: "In",
    header: "IN",
    cell: (join) => dayjs(join.getValue<string>()).format("DD/MM/YYYY"),
  },
  {
    accessorKey: "Out",
    header: "OUT",
    cell: (join) => dayjs(join.getValue<string>()).format("DD/MM/YYYY"),
  },
  {
    accessorKey: "Nights",
    header: "NIGHTS",
  },
  {
    accessorKey: "Tarifa",
    header: "TARIFA",
  },
  {
    accessorKey: "Total",
    header: "TOTAL",
  },
  {
    accessorKey: "Deposito",
    header: "DEPOSIT",
  },
  {
    accessorKey: "ModoDePago",
    header: "MODO DEPAGO",
  },
  {
    accessorKey: "Observaciones",
    header: "OBSERVATIONS",
  },
  {
    accessorKey: "actions",
    header: "ACTIONS",
    cell: ({row: {original}}) => <DeleteGuest BodaId={original.BodaId} id={original.id} />,
  },
];

export function List2({guests}: {guests: Invitados[]}) {
  // eslint-disable-next-line react/hook-use-state
  const [data] = useState(guests);

  const table = useReactTable({columns, data, getCoreRowModel: getCoreRowModel()});

  return (
    <Table>
      <TableCaption>A list of your recent guest.</TableCaption>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {typeof header.column.columnDef.header === "function"
                  ? header.column.columnDef.header(header.getContext())
                  : header.column.columnDef.header}
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
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
