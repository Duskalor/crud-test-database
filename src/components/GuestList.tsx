import React from "react";

import {List} from "./list";

import prisma from "@/lib/prisma";

export async function GuestList() {
  const guests = await prisma.invitados.findMany();

  return <List guests={guests} />;
}
