"use server";

import {redirect} from "next/navigation";

import prisma from "./prisma";
import {formatDateToInput} from "./date";

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

  // console.log({data, In});
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

  console.log({In, new: formatDateToInput(In), old: newData.in.toString()});
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

export const handleDeleteInvitado = async (id: string, BodaId: string) => {
  try {
    await prisma.invitados.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
  }

  redirect(`/Bodas/${BodaId}/Guest`);
};
