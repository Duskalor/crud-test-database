import React from "react";
import {Boda} from "@prisma/client";
import Link from "next/link";

import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "./ui/table";
import {Button} from "./ui/button";

export function BodaList({bodas}: {bodas: Boda[]}) {
  return (
    <Table className="w-6/12">
      <TableCaption>A list of your recent bodas.</TableCaption>
      <TableHeader>
        <TableRow className="[&>th]:cursor-pointer [&>th]:select-none">
          <TableHead className="text-center">NAMES</TableHead>
          <TableHead className="text-center">CREATE AT</TableHead>
          <TableHead className="w-[200px] text-right">ACCIONES</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bodas.map((boda) => (
          <TableRow key={boda.id}>
            <TableCell className="relative font-medium">
              <Link
                key={boda.id}
                className="absolute inset-0 flex items-center justify-center"
                href={`/Guest/${boda.id}`}
              >
                {boda.name}
              </Link>
            </TableCell>
            <TableCell className="text-center">
              {boda.createAt.toLocaleDateString("es-ES")}
            </TableCell>
            <TableCell className="flex justify-between gap-2 text-right">
              <Button>Edit</Button>
              <Button>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">{bodas.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
