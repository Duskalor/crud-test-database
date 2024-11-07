"use client";
import React from "react";
import {Boda} from "@prisma/client";
import {ColumnDef} from "@tanstack/react-table";
import Link from "next/link";

import {List2} from "@/components/list2";
import {DialogBodaEdit} from "@/components/DialogBodaEdit";
import {DeleteBoda} from "@/components/deleteBoda";

const columns: ColumnDef<Boda>[] = [
  {
    header: "Name",
    accessorKey: "name",
    size: 270,
    cell: ({row: {original}}) => (
      <div className="relative bg-red-800 font-medium">
        <Link
          key={original.id}
          className="absolute inset-0 flex items-center bg-emerald-900 px-5"
          href={`/Bodas/${original.id}/Guest`}
        >
          {original.name}
        </Link>
      </div>
    ),
  },
  {
    header: "Date",
    accessorKey: "date",
    accessorFn: (boda) => boda.createAt.toLocaleDateString("es-ES"),
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({row: {original}}) => (
      <div className="flex justify-between gap-2 text-right">
        <DialogBodaEdit boda={original} />
        <DeleteBoda id={original.id} />
      </div>
    ),
  },
];

export function BodaList({bodas: data}: {bodas: Boda[]}) {
  return <List2 {...{data, columns}} />;
}
