"use client";
import {Invitados} from "@prisma/client";
import {useState} from "react";

import {Button} from "./ui/button";

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

export function List({guests}: {guests: Invitados[]}) {
  const [sorted, setSorted] = useState<Action | null>(null);

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
          <TableHead>OBSERVACIONES</TableHead>
          <TableHead className="text-right">ACCIONES</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedGuests.map((guest) => (
          <TableRow key={guest.id}>
            <TableCell className="font-medium">{guest.name}</TableCell>
            <TableCell>{guest.TipoHab}</TableCell>
            <TableCell>{guest.Codigo}</TableCell>
            <TableCell>{guest.In.toLocaleDateString("es-ES")}</TableCell>
            <TableCell>{guest.Out.toLocaleDateString("es-ES")}</TableCell>
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
              <Button>Edit</Button>
              <Button>Delete</Button>
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
