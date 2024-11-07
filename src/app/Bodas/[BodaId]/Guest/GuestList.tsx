"use client";
import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {Invitados} from "@prisma/client";
import Link from "next/link";
import dayjs from "dayjs";

import {DeleteGuest} from "../../../../components/deleteGuest";

import {buttonVariants} from "@/components/ui/button";
import {List2} from "@/components/list2";

export const columns: ColumnDef<Invitados>[] = [
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
    cell: ({getValue}) => dayjs(getValue<string>()).format("DD/MM/YYYY"),
  },
  {
    accessorKey: "Out",
    header: "OUT",
    cell: ({getValue}) => dayjs(getValue<string>()).format("DD/MM/YYYY"),
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
    cell: ({row: {original}}) => (
      <div className="flex justify-between gap-2">
        <Link className={buttonVariants({variant: "default"})} href={`Guest/${original.id}/edit`}>
          Edit
        </Link>
        <DeleteGuest BodaId={original.BodaId} id={original.id} />
      </div>
    ),
  },
];

export function GuestList({guests: data}: {guests: Invitados[]}) {
  return <List2 {...{data, columns}} />;
}
