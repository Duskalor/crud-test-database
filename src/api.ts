"use server";

import {redirect} from "next/navigation";

import prisma from "./lib/prisma";

export const handleform = async (data: FormData) => {
  const newData = Object.fromEntries(data);

  const name = newData.name.toString();
  const TipoHab = newData.tipohab.toString();
  const Codigo = parseInt(newData.codigo.toString());
  const In = new Date(newData.in.toString());
  const Out = new Date(newData.out.toString());
  const Nights = parseInt(newData.nights.toString());
  const Tarifa = parseFloat(newData.nights.toString());
  const Total = Nights * Tarifa;
  const ModoDePago = newData.modo.toString();
  const Observaciones = newData.observaciones.toString() ?? "";

  try {
    await prisma.invitados.create({
      data: {
        BodaId: "cm1txvhpd0000zirho5uleoiu",
        name,
        TipoHab,
        Codigo,
        In,
        Out,
        Nights,
        Tarifa,
        Total,
        ModoDePago,
        Observaciones,
      },
    });

    redirect("/Guest");
  } catch (error) {
    console.log(error);
  }
};
