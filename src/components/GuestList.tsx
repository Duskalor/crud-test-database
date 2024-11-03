import React from "react";

import {List} from "./list";
import {List2} from "./list2";

import prisma from "@/lib/prisma";

export async function GuestList({BodaId}: {BodaId: string}) {
  const guests = await prisma.invitados.findMany({where: {BodaId}});

  return <List2 guests={guests} />;
}
