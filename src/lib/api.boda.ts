"use server";
import {redirect} from "next/navigation";
import {Boda} from "@prisma/client";

import prisma from "./prisma";

export const getBoda = async () => {
  try {
    const bodas = await prisma.boda.findMany({
      orderBy: {
        createAt: "asc",
      },
    });

    return bodas;
  } catch (error) {
    return null;
  }
};

export const handleformBoda = async (eventDate: Date, data: FormData) => {
  const newData = Object.fromEntries(data);

  const name = newData.name.toString();

  try {
    await prisma.boda.create({data: {name, eventDate}});
  } catch (error) {
    console.error(error);
  }

  redirect("/Bodas");
};

export const getBodabyId = async (id: string) => {
  if (!id) {
    return;
  }
  // console.log({id})

  try {
    const boda = await prisma.boda.findUnique({where: {id}});

    if (!boda) {
      throw new Error("Boda not found");
    }

    return boda;
  } catch (error) {
    console.error("Error fetching boda by id:", error);
    throw error;
  }
};

export const handleEditBoda = async (data: Boda) => {
  const id = data.id.toString();
  const name = data.name.toString().trim();
  const eventDate = data.eventDate;

  try {
    await prisma.boda.update({
      data: {
        name,
        eventDate,
      },
      where: {
        id: id.toString(),
      },
    });
  } catch (error) {
    console.error(error);
  }
  redirect(`/Bodas`);
};

export const handleDeleteBoda = async (id: string) => {
  try {
    await prisma.invitados.deleteMany({where: {BodaId: id}});

    await prisma.boda.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
  }

  redirect(`/Bodas`);
};
