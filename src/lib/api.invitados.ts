"use server";

import {redirect} from "next/navigation";
import {toast} from "sonner";

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
    toast.success("Guest created successfully");
  } catch (error) {
    console.error(error);
    toast.error("Guest failed to create");
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
    toast.success("Guest updated successfully");
  } catch (error) {
    console.error(error);
    toast.error("Guest failed to update");
  }
  redirect(`/Bodas/${BodaId}/Guest`);
};

export const getInvitadoById = async (id: string) => {
  return await prisma.invitados.findFirst({where: {id}});
};
