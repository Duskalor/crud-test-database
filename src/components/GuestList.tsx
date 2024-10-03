import React from "react";

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
import prisma from "@/lib/prisma";

export async function GuestList() {
  const guests = await prisma.invitados.findMany();
  const totalGains = guests.reduce((acc, n) => acc + (n?.Total ?? 0), 0);

  return (
    <Table>
      <TableCaption>A list of your recent guest.</TableCaption>
      <TableHeader>
        <TableRow className="[&>th]:select-none">
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
          <TableHead className="text-right">OBSERVACIONES</TableHead>
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
            <TableCell>{guest.Deposito}</TableCell>
            <TableCell>{guest.ModoDePago}</TableCell>
            <TableCell className="text-right">{guest.Observaciones}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={10}>Total</TableCell>
          <TableCell className="text-right">S/{totalGains}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
