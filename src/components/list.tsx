"use client";
import {Invitados} from "@prisma/client";
import {useState} from "react";
import Link from "next/link";

import {Button, buttonVariants} from "./ui/button";
import {DeleteGuest} from "./deleteGuest";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import {sortBy} from "@/lib/sort";
import {Action} from "@/lib/const";
import {formatDateToInput} from "@/lib/date";

export function List({guests, BodaId}: {guests: Invitados[]; BodaId: string}) {
  const [sorted, setSorted] = useState<Action | null>(null);

  console.log(guests);
  const sortedGuests = sortBy([...guests], sorted);

  const totalGains = guests.reduce((acc, n) => acc + (n?.Total ?? 0), 0);

  return (
    <Table>
      <TableCaption>A list of your recent guest.</TableCaption>
      <TableHeader>
        <TableRow className="[&>th]:cursor-pointer [&>th]:select-none">
          <TableHead className="w-[100px]" onClick={() => setSorted(sorted ? null : Action.NAMES)}>
            NAMES
          </TableHead>
          <TableHead onClick={() => setSorted(sorted ? null : Action.TIPOHAB)}>TIPO HAB</TableHead>
          <TableHead onClick={() => setSorted(sorted ? null : Action.CODIGO)}>CODIGO</TableHead>
          <TableHead onClick={() => setSorted(sorted ? null : Action.IN)}>IN</TableHead>
          <TableHead onClick={() => setSorted(sorted ? null : Action.OUT)}>OUT</TableHead>
          <TableHead onClick={() => setSorted(sorted ? null : Action.NIGHTS)}>NIGHTS</TableHead>
          <TableHead onClick={() => setSorted(sorted ? null : Action.TARIFA)}>TARIFA</TableHead>
          <TableHead onClick={() => setSorted(sorted ? null : Action.TOTAL)}>TOTAL</TableHead>
          <TableHead onClick={() => setSorted(sorted ? null : Action.DEPOSIT)}>DEPOSIT</TableHead>
          <TableHead onClick={() => setSorted(sorted ? null : Action.MODODEPAGO)}>
            MODO DEPAGO
          </TableHead>
          <TableHead>OBSERVATIONS</TableHead>
          <TableHead className="text-right">ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedGuests.map((guest) => (
          <TableRow key={guest.id}>
            <TableCell className="font-medium">{guest.name}</TableCell>
            <TableCell>{guest.TipoHab}</TableCell>
            <TableCell>{guest.Codigo}</TableCell>
            <TableCell>{formatDateToInput(guest.In)}</TableCell>
            <TableCell>{formatDateToInput(guest.Out)}</TableCell>
            <TableCell>{guest.Nights}</TableCell>
            <TableCell>{guest.Tarifa}</TableCell>
            <TableCell>{guest.Total}</TableCell>
            <TableCell
              className={cn(
                "cursor-pointer text-center",
                {"text-red-500": !guest.Deposito},
                {"text-green-500": guest.Deposito},
              )}
            >
              {guest.Deposito ? "YES" : "NO"}
            </TableCell>
            <TableCell>{guest.ModoDePago}</TableCell>
            <TableCell>{guest.Observaciones}</TableCell>
            <TableCell className="flex justify-between gap-2">
              <Link
                className={buttonVariants({variant: "default"})}
                href={`Guest/${guest.id}/edit`}
              >
                Edit
              </Link>
              <DeleteGuest BodaId={BodaId} id={guest.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={11}>Total</TableCell>
          <TableCell className="text-right">S/{totalGains}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
