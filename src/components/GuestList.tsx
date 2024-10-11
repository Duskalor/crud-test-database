import React from "react";

import {List} from "./list";

import prisma from "@/lib/prisma";

export async function GuestList({id}: {id: string}) {
  const guests = await prisma.invitados.findMany({where: {BodaId: id}});

  return <List guests={guests} />;
}
