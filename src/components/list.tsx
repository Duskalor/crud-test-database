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

enum Action {
  NAMES,
  TIPOHAB,
  CODIGO,
  IN,
  OUT,
  NIGHTS,
  TARIFA,
  TOTAL,
  DEPOSIT,
  MODODEPAGO,
}

export function List({guests}: {guests: Invitados[]}) {
  const [sorted, setsorted] = useState(false);
  const totalGains = guests.reduce((acc, n) => acc + (n?.Total ?? 0), 0);

  return (
    <Table>
      <TableCaption>A list of your recent guest.</TableCaption>
      <TableHeader>
        <TableRow className="[&>th]:cursor-pointer [&>th]:select-none">
          <TableHead className="w-[100px]">NAMES</TableHead>
          <TableHead>TIPO HAB</TableHead>
          <TableHead>CODIGO</TableHead>
          <TableHead>IN</TableHead>
          <TableHead>OUT</TableHead>
          <TableHead>NIGHTS</TableHead>
          <TableHead>TARIFA</TableHead>
          <TableHead>TOTAL</TableHead>
          <TableHead>DEPOSIT</TableHead>
          <TableHead>MODO DEPAGO</TableHead>
          <TableHead>OBSERVACIONES</TableHead>
          <TableHead className="text-right">ACCIONES</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {guests.map((guest) => (
          <TableRow key={guest.id}>
            <TableCell className="font-medium">{guest.name}</TableCell>
            <TableCell>{guest.TipoHab}</TableCell>
            <TableCell>{guest.Codigo}</TableCell>
            <TableCell>{guest.In.toLocaleDateString()}</TableCell>
            <TableCell>{guest.Out.toLocaleDateString()}</TableCell>
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
