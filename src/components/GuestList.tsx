import React from "react";

import {List} from "./list";

import prisma from "@/lib/prisma";

export async function GuestList({BodaId}: {BodaId: string}) {
  const guests = await prisma.invitados.findMany({where: {BodaId}});

  return <List guests={guests} />;
}
