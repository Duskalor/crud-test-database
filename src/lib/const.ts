export const roomTypes = [
  {value: "single", label: "Single Room"},
  {value: "double", label: "Double Room"},
  {value: "queen", label: "Queen Room"},
  {value: "king", label: "King Room"},
  {value: "triple", label: "Triple Room"},
  {value: "suite", label: "Suite"},
  {value: "junior-suite", label: "Junior Suite"},
];

export enum Action {
  NAMES = "name",
  TIPOHAB = "TipoHab",
  CODIGO = "Codigo",
  IN = "In",
  OUT = "Out",
  NIGHTS = "Nights",
  TARIFA = "Tarifa",
  TOTAL = "Total",
  DEPOSIT = "Deposito",
  MODODEPAGO = "ModoDePago",
}

export const MetodosDePago = [
  {
    nombre: "Tarjeta de Crédito",
    comision: 0.03, // 3% de comisión
    moneda: "USD",
  },
  {
    nombre: "Tarjeta de Débito",
    comision: 0.02, // 2% de comisión
    moneda: "USD",
  },
  {
    nombre: "PayPal",
    comision: 0.05, // 5% de comisión
    moneda: "USD",
  },
  {
    nombre: "Transferencia Bancaria",
    comision: 0.01, // 1% de comisión
    moneda: "USD",
  },
  {
    nombre: "Efectivo",
    comision: 0.0, // Sin comisión
    moneda: "USD",
  },
  {
    nombre: "Criptomonedas",
    comision: 0.04, // 4% de comisión
    moneda: "USDT",
  },
];
