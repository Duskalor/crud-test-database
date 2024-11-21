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

const bodaData = [
  {name: "Elisabeth Frick", eventDate: "2/22/2024"},
  {name: "Siegfried Bolliver", eventDate: "4/12/2024"},
  {name: "Allx Flegg", eventDate: "7/19/2024"},
  {name: "Rollin Pinock", eventDate: "10/4/2024"},
  {name: "Liza Cardenas", eventDate: "7/2/2024"},
  {name: "Crin Sugars", eventDate: "7/2/2024"},
  {name: "Joannes Deekes", eventDate: "7/27/2024"},
  {name: "Chloette Jacquet", eventDate: "6/29/2024"},
  {name: "Marcelline Blazejewski", eventDate: "3/13/2024"},
  {name: "Camille Lemmertz", eventDate: "6/13/2024"},
  {name: "Halli Prosser", eventDate: "9/26/2024"},
  {name: "Marcille Shorbrook", eventDate: "3/21/2024"},
  {name: "Kitty Beadham", eventDate: "8/17/2024"},
  {name: "Cori Sawyer", eventDate: "8/1/2024"},
  {name: "Dawn Warlow", eventDate: "7/20/2024"},
  {name: "Barr Cutmare", eventDate: "5/28/2024"},
  {name: "Sydney Beckley", eventDate: "10/19/2024"},
  {name: "Fae Bownd", eventDate: "6/8/2024"},
  {name: "Reinaldo Bernadon", eventDate: "9/17/2024"},
  {name: "Dynah Glasgow", eventDate: "10/21/2024"},
  {name: "Jessamine MacIlory", eventDate: "2/5/2024"},
  {name: "Loralie Guyton", eventDate: "9/21/2024"},
  {name: "Rebe Sollon", eventDate: "12/26/2023"},
  {name: "Valdemar Freire", eventDate: "10/24/2024"},
  {name: "Siouxie Gummoe", eventDate: "9/9/2024"},
  {name: "Pancho Colenutt", eventDate: "10/15/2024"},
  {name: "Kayne Daborne", eventDate: "2/8/2024"},
  {name: "Zacherie Cuffe", eventDate: "11/11/2024"},
  {name: "Irwin Borland", eventDate: "12/28/2023"},
  {name: "Delcina Loosley", eventDate: "2/3/2024"},
  {name: "Leroy Zanini", eventDate: "11/7/2024"},
  {name: "Erda Tod", eventDate: "6/30/2024"},
  {name: "Freda Nary", eventDate: "12/21/2023"},
  {name: "Titus Stealey", eventDate: "9/6/2024"},
  {name: "See Pettegree", eventDate: "11/30/2023"},
  {name: "Berton Jumeau", eventDate: "8/21/2024"},
  {name: "Dianna Kerry", eventDate: "8/14/2024"},
  {name: "Travus Schleicher", eventDate: "4/16/2024"},
  {name: "Josy Guirardin", eventDate: "8/22/2024"},
  {name: "Stevie Bastide", eventDate: "12/6/2023"},
  {name: "Vanda Luparto", eventDate: "7/10/2024"},
  {name: "Eleen Scroggins", eventDate: "11/9/2024"},
  {name: "Denice Muckart", eventDate: "9/11/2024"},
  {name: "Emelina Kenworthey", eventDate: "11/25/2023"},
  {name: "Launce Dmytryk", eventDate: "12/15/2023"},
  {name: "Ingeberg D'Cruze", eventDate: "6/18/2024"},
  {name: "Chiarra Juanes", eventDate: "7/30/2024"},
  {name: "Hobie Filyushkin", eventDate: "10/15/2024"},
  {name: "Tito Reihill", eventDate: "7/1/2024"},
  {name: "Velvet Lovie", eventDate: "6/21/2024"},
];

export const handlerBodaSeed = async () => {
  const values = await prisma.boda.createMany({
    data: [
      ...bodaData.map((boda) => ({
        name: boda.name,
        eventDate: new Date(boda.eventDate),
      })),
    ],
  });

  console.log(values);

  return values;
};
