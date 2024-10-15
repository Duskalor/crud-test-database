"use server";
import {redirect} from "next/navigation";

import prisma from "./prisma";

export const getBoda = async () => {
  const bodas = await prisma.boda.findMany();

  return bodas ? bodas : [];
};

export const handleformBoda = async (data: FormData) => {
  const newData = Object.fromEntries(data);

  const name = newData.name.toString();
  let id;

  try {
    const newBoda = await prisma.boda.create({
      data: {
        name,
      },
    });

    id = newBoda.id;
  } catch (error) {
    console.error(error);
  }

  redirect(`/Guest/${id}`);
};

export const getBodabyId = async (id: string) => {
  if (!id) {
    return;
  }
  console.log({id});

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
