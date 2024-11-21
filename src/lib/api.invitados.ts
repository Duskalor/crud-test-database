"use server";

import {redirect} from "next/navigation";
import {DateRange} from "react-day-picker";

import prisma from "./prisma";
import {formatDateToInput} from "./date";

export const handleNewGuest = async (date: DateRange, data: FormData) => {
  const newData = Object.fromEntries(data);

  console.log({newData});
  const BodaId = newData.BodaId.toString();
  const name = newData.name.toString();
  const TipoHab = newData.tipohab.toString();
  const Codigo = parseInt(newData.codigo.toString());
  const In = new Date(date!.from!.toString());
  const Out = new Date(date!.to!.toString());
  const Nights = parseInt(newData.nights.toString());
  const Tarifa = parseFloat(newData.tarifa.toString());
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

export const handleEditGuest = async (date: DateRange, data: FormData) => {
  const newData = Object.fromEntries(data);

  console.log(newData);
  const BodaId = newData.BodaId.toString();
  const GuestId = newData.GuestId.toString();
  const name = newData.name.toString();
  const TipoHab = newData.tipohab.toString();
  const Codigo = parseInt(newData.codigo.toString());
  const In = new Date(date!.from!.toString());
  const Out = new Date(date!.to!.toString());
  const Nights = parseInt(newData.nights.toString());
  const Tarifa = parseFloat(newData.tarifa.toString());
  const Total = Nights * Tarifa;
  const ModoDePago = newData.modo.toString();
  const Observaciones = newData.observaciones.toString() ?? "";

  // console.log({In, new: formatDateToInput(In), old: newData.in.toString()});
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

export const handlerSeederInvitados = async () => {
  return await prisma.invitados.createMany({
    data: [
      {
        name: "Carlos Pérez",
        TipoHab: "Individual",
        Codigo: 201,
        In: "2024-12-15T14:00:00.000Z",
        Out: "2024-12-16T11:00:00.000Z",
        Nights: 1,
        Tarifa: 150.0,
        Total: 150.0,
        Deposito: true,
        ModoDePago: "Tarjeta de Crédito",
        Observaciones: "Sin observaciones",
        BodaId: "cm3qpglod0000c9n0gcnk1txy",
      },
      {
        name: "Laura Gómez",
        TipoHab: "Doble",
        Codigo: 202,
        In: "2024-12-15T15:00:00.000Z",
        Out: "2024-12-16T12:00:00.000Z",
        Nights: 1,
        Tarifa: 180.0,
        Total: 360.0,
        Deposito: false,
        ModoDePago: "Efectivo",
        Observaciones: "A la espera de confirmación",
        BodaId: "cm3qpn8sh0000yb2nqm5yd38b",
      },
      {
        name: "Ricardo Fernández",
        TipoHab: "Suite",
        Codigo: 203,
        In: "2024-12-15T13:00:00.000Z",
        Out: "2024-12-16T11:00:00.000Z",
        Nights: 1,
        Tarifa: 250.0,
        Total: 250.0,
        Deposito: true,
        ModoDePago: "Transferencia Bancaria",
        Observaciones: "Habitación con jacuzzi",
        BodaId: "cm3qtvibu0002146dktv7fe87",
      },
      {
        name: "Susana Pérez",
        TipoHab: "Individual",
        Codigo: 204,
        In: "2024-12-15T14:00:00.000Z",
        Out: "2024-12-16T12:00:00.000Z",
        Nights: 1,
        Tarifa: 150.0,
        Total: 150.0,
        Deposito: false,
        ModoDePago: "Efectivo",
        Observaciones: "Sin observaciones",
        BodaId: "cm3qtvibu0003146d4l4j3loo",
      },
      {
        name: "Fernando López",
        TipoHab: "Doble",
        Codigo: 205,
        In: "2024-12-15T16:00:00.000Z",
        Out: "2024-12-16T12:00:00.000Z",
        Nights: 1,
        Tarifa: 200.0,
        Total: 400.0,
        Deposito: true,
        ModoDePago: "Tarjeta de Crédito",
        Observaciones: "Ninguna",
        BodaId: "cm3qtvibu0004146d7mb89rsl",
      },
      {
        name: "Elena Torres",
        TipoHab: "Individual",
        Codigo: 206,
        In: "2024-12-15T14:30:00.000Z",
        Out: "2024-12-16T12:00:00.000Z",
        Nights: 1,
        Tarifa: 160.0,
        Total: 160.0,
        Deposito: false,
        ModoDePago: "Efectivo",
        Observaciones: "Preferiría una habitación en planta baja",
        BodaId: "cm3qtvibu0005146dvatf8fil",
      },
      {
        name: "Marta Sánchez",
        TipoHab: "Doble",
        Codigo: 207,
        In: "2024-12-15T14:00:00.000Z",
        Out: "2024-12-16T11:00:00.000Z",
        Nights: 1,
        Tarifa: 180.0,
        Total: 360.0,
        Deposito: false,
        ModoDePago: "Efectivo",
        Observaciones: "Sin observaciones",
        BodaId: "cm3qtvibu0006146dl7ni0em6",
      },
      {
        name: "Javier Romero",
        TipoHab: "Suite",
        Codigo: 208,
        In: "2024-12-15T13:00:00.000Z",
        Out: "2024-12-16T11:00:00.000Z",
        Nights: 1,
        Tarifa: 250.0,
        Total: 250.0,
        Deposito: true,
        ModoDePago: "Transferencia Bancaria",
        Observaciones: "Habitación con jacuzzi",
        BodaId: "cm3qtvibu0007146dryvgdulx",
      },
      {
        name: "Ana María Rodríguez",
        TipoHab: "Doble",
        Codigo: 209,
        In: "2024-12-15T14:00:00.000Z",
        Out: "2024-12-16T12:00:00.000Z",
        Nights: 1,
        Tarifa: 180.0,
        Total: 360.0,
        Deposito: false,
        ModoDePago: "Efectivo",
        Observaciones: "Sin observaciones",
        BodaId: "cm3qtvibu0008146dxladvyae",
      },
      {
        name: "Ricardo Gómez",
        TipoHab: "Individual",
        Codigo: 210,
        In: "2024-12-15T14:00:00.000Z",
        Out: "2024-12-16T12:00:00.000Z",
        Nights: 1,
        Tarifa: 150.0,
        Total: 150.0,
        Deposito: true,
        ModoDePago: "Tarjeta de Crédito",
        Observaciones: "Sin observaciones",
        BodaId: "cm3qtvibu0009146dxc4co2iv",
      },
      {
        name: "Cristina Pérez",
        TipoHab: "Doble",
        Codigo: 211,
        In: "2024-12-15T14:30:00.000Z",
        Out: "2024-12-16T12:00:00.000Z",
        Nights: 1,
        Tarifa: 200.0,
        Total: 400.0,
        Deposito: false,
        ModoDePago: "Efectivo",
        Observaciones: "A la espera de confirmación",
        BodaId: "cm3qtvibu000a146d5m1vjd62",
      },
      {
        name: "Carlos Ruiz",
        TipoHab: "Individual",
        Codigo: 212,
        In: "2024-12-15T15:00:00.000Z",
        Out: "2024-12-16T11:00:00.000Z",
        Nights: 1,
        Tarifa: 150.0,
        Total: 150.0,
        Deposito: true,
        ModoDePago: "Tarjeta de Crédito",
        Observaciones: "Sin observaciones",
        BodaId: "cm3qtvibu000b146dbjge60dh",
      },
      {
        name: "José Gómez",
        TipoHab: "Suite",
        Codigo: 213,
        In: "2024-12-15T14:00:00.000Z",
        Out: "2024-12-16T11:00:00.000Z",
        Nights: 1,
        Tarifa: 250.0,
        Total: 250.0,
        Deposito: true,
        ModoDePago: "Transferencia Bancaria",
        Observaciones: "Habitación con jacuzzi",
        BodaId: "cm3qtvibu000c146dm414s7hs",
      },
      {
        name: "Luis Martínez",
        TipoHab: "Individual",
        Codigo: 214,
        In: "2024-12-15T15:00:00.000Z",
        Out: "2024-12-16T11:00:00.000Z",
        Nights: 1,
        Tarifa: 150.0,
        Total: 150.0,
        Deposito: false,
        ModoDePago: "Efectivo",
        Observaciones: "Sin observaciones",
        BodaId: "cm3qtvibu000d146da5xbkvra",
      },
    ],
  });
};
