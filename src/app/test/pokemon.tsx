"use client";
import {ColumnDef} from "@tanstack/react-table";
import {useEffect, useState} from "react";

import Table from "./table";

import {Pokemon} from "@/types/pokemon.type";

function TablePokemon({pokemons: data}: {pokemons: Pokemon[]}) {
  const columns: ColumnDef<Pokemon>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Location",
      accessorKey: "location_area_encounters",
      // cell: ({ row }) => row.original.types.map((t) => t.type.name).join(', '),
    },
    {
      header: "Base Experience",
      accessorKey: "base_experience",
    },
    {
      header: "Height",
      accessorKey: "height",
    },
    {
      header: "Weight",
      accessorKey: "weight",
    },
  ];

  return <Table {...{data, columns}} />;
}

export default TablePokemon;
