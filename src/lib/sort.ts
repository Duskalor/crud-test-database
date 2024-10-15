import {Invitados} from "@prisma/client";

export const sortBy = (guests: Invitados[], sort: string | null): Invitados[] => {
  const sortFunctions: {
    [key: string]: (a: Invitados, b: Invitados) => number;
  } = {
    name: (a, b) => a.name.localeCompare(b.name),
    TipoHab: (a, b) => a.TipoHab.localeCompare(b.TipoHab),
    Codigo: (a, b) => a.Codigo - b.Codigo,
    In: (a, b) => a.In.getTime() - b.In.getTime(),
    Out: (a, b) => a.Out.getTime() - b.Out.getTime(),
    Nights: (a, b) => a.Nights - b.Nights,
    Tarifa: (a, b) => a.Tarifa - b.Tarifa,
    Total: (a, b) => (a.Total || 0) - (b.Total || 0),
    Deposito: (a, b) => Number(a.Deposito) - Number(b.Deposito),
    ModoDePago: (a, b) => a.ModoDePago!.localeCompare(b.ModoDePago!),
  };

  return sort && sortFunctions[sort] ? guests.sort(sortFunctions[sort]) : guests;
};
