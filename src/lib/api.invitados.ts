"use server";

import {redirect} from "next/navigation";

import prisma from "./prisma";

export const handleNewGuest = async (data: FormData) => {
  const newData = Object.fromEntries(data);

  const BodaId = newData.BodaId.toString();
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
        BodaId,
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
  } catch (error) {
    console.error(error);
  }

  redirect(`/Bodas/${BodaId}/Guest`);
};

export const handleEditGuest = async (data: FormData) => {
  const newData = Object.fromEntries(data);

  const BodaId = newData.BodaId.toString();
  const GuestId = newData.GuestId.toString();
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
    await prisma.invitados.update({
      where: {
        id: GuestId,
      },
      data: {
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
  } catch (error) {
    console.error(error);
  }
  redirect(`/Bodas/${BodaId}/Guest`);
};

export const getInvitadoById = async (id: string) => {
  return await prisma.invitados.findFirst({where: {id}});
};
